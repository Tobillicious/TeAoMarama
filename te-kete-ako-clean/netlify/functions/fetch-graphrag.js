/**
 * ================================================================
 * GRAPHRAG BRIDGE - NETLIFY FUNCTION
 * ================================================================
 * 
 * Supabase-native GRAPHRAG queries with unified authentication
 * Verifies Supabase JWT tokens and provides secure graph access
 * 
 * ================================================================
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables (set in Netlify dashboard)
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://nlgldaqtubrlcqddppbq.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Initialize Supabase with service role (bypasses RLS for admin operations)
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Initialize regular Supabase client for token verification
const supabase = createClient(SUPABASE_URL, process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM');

/**
 * Verify Supabase JWT token and get user data
 * Uses Supabase's built-in token verification
 */
async function verifySupabaseToken(accessToken) {
    try {
        if (!accessToken || typeof accessToken !== 'string') {
            throw new Error('Invalid token format');
        }
        
        // Use Supabase client to verify token and get user
        const { data: { user }, error } = await supabase.auth.getUser(accessToken);
        
        if (error) {
            throw new Error(`Token verification failed: ${error.message}`);
        }
        
        if (!user) {
            throw new Error('Invalid or expired token');
        }
        
        // Fetch user profile from profiles table
        const { data: profile, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('role, display_name, school_name, year_level')
            .eq('user_id', user.id)
            .single();
        
        if (profileError) {
            console.warn('Could not fetch user profile:', profileError);
        }
        
        return {
            id: user.id,
            email: user.email,
            emailVerified: user.email_confirmed_at !== null,
            name: profile?.display_name || user.user_metadata?.display_name,
            role: profile?.role || 'student',
            schoolName: profile?.school_name,
            yearLevel: profile?.year_level
        };
        
    } catch (error) {
        console.error('Token verification failed:', error);
        throw new Error(`Authentication failed: ${error.message}`);
    }
}

/**
 * Main Netlify function handler
 */
export async function handler(event, context) {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };
    
    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }
    
    try {
        // Extract authorization header
        const authHeader = event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({
                    error: 'Missing or invalid authorization header',
                    details: 'Include Authorization: Bearer <firebase-id-token>'
                })
            };
        }
        
        const accessToken = authHeader.substring(7); // Remove 'Bearer '
        
        // Verify Supabase token
        const user = await verifySupabaseToken(accessToken);
        console.log('Authenticated user:', user.id, user.email);
        
        // Ensure email is verified for sensitive operations
        if (!user.emailVerified) {
            return {
                statusCode: 403,
                headers,
                body: JSON.stringify({
                    error: 'Email verification required',
                    details: 'Please verify your email before accessing GRAPHRAG'
                })
            };
        }
        
        // Parse query parameters
        const queryParams = event.queryStringParameters || {};
        const action = queryParams.action || 'search';
        
        // Route to appropriate GRAPHRAG operation
        let result;
        
        switch (action) {
            case 'search':
                result = await handleGraphRAGSearch(user, queryParams);
                break;
                
            case 'explore':
                result = await handleGraphRAGExplore(user, queryParams);
                break;
                
            case 'connections':
                result = await handleGraphRAGConnections(user, queryParams);
                break;
                
            case 'analytics':
                result = await handleGraphRAGAnalytics(user, queryParams);
                break;
                
            default:
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({
                        error: 'Invalid action',
                        supportedActions: ['search', 'explore', 'connections', 'analytics']
                    })
                };
        }
        
        // Log access for auditing
        await logAccess(user, action, queryParams);
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role
                },
                action,
                data: result
            })
        };
        
    } catch (error) {
        console.error('GRAPHRAG function error:', error);
        
        return {
            statusCode: error.message.includes('Authentication') ? 401 : 500,
            headers,
            body: JSON.stringify({
                error: 'Internal server error',
                message: error.message,
                timestamp: new Date().toISOString()
            })
        };
    }
}

/**
 * Handle GRAPHRAG search queries
 */
async function handleGraphRAGSearch(user, params) {
    const { query, limit = 10, category } = params;
    
    if (!query) {
        throw new Error('Search query is required');
    }
    
    console.log(`GRAPHRAG search: "${query}" for user ${user.id}`);
    
    // Use admin client for broader access to knowledge graph
    const { data, error } = await supabaseAdmin
        .from('knowledge_nodes')
        .select(`
            id,
            title,
            content,
            category,
            metadata,
            created_at,
            relationships:knowledge_relationships(
                target_node:target_node_id(title, category),
                relationship_type
            )
        `)
        .textSearch('content', query)
        .limit(parseInt(limit))
        .order('created_at', { ascending: false });
    
    if (error) {
        console.error('Supabase query error:', error);
        throw new Error(`Database query failed: ${error.message}`);
    }
    
    return {
        query,
        results: data || [],
        count: data?.length || 0
    };
}

/**
 * Handle GRAPHRAG exploration
 */
async function handleGraphRAGExplore(user, params) {
    const { nodeId, depth = 2 } = params;
    
    if (!nodeId) {
        throw new Error('Node ID is required for exploration');
    }
    
    console.log(`GRAPHRAG explore: node ${nodeId} depth ${depth} for user ${user.id}`);
    
    // Recursive relationship exploration using admin client
    const { data, error } = await supabaseAdmin
        .rpc('explore_knowledge_graph', {
            start_node: nodeId,
            max_depth: parseInt(depth)
        });
    
    if (error) {
        throw new Error(`Graph exploration failed: ${error.message}`);
    }
    
    return {
        startNode: nodeId,
        depth: parseInt(depth),
        nodes: data?.nodes || [],
        relationships: data?.relationships || []
    };
}

/**
 * Handle GRAPHRAG connections discovery
 */
async function handleGraphRAGConnections(user, params) {
    const { topic1, topic2, maxHops = 3 } = params;
    
    if (!topic1 || !topic2) {
        throw new Error('Two topics are required to find connections');
    }
    
    console.log(`GRAPHRAG connections: "${topic1}" to "${topic2}" for user ${user.id}`);
    
    // Find shortest path between concepts using admin client
    const { data, error } = await supabaseAdmin
        .rpc('find_knowledge_path', {
            start_topic: topic1,
            end_topic: topic2,
            max_hops: parseInt(maxHops)
        });
    
    if (error) {
        throw new Error(`Connection discovery failed: ${error.message}`);
    }
    
    return {
        from: topic1,
        to: topic2,
        paths: data || [],
        shortestPath: data?.[0] || null
    };
}

/**
 * Handle GRAPHRAG analytics for teachers
 */
async function handleGraphRAGAnalytics(user, params) {
    // Only allow teachers to access analytics
    if (!params.role || params.role !== 'teacher') {
        throw new Error('Analytics access restricted to teachers');
    }
    
    console.log(`GRAPHRAG analytics requested by teacher ${user.id}`);
    
    // Aggregate analytics queries using admin client
    const [nodeStats, relationshipStats, recentActivity] = await Promise.all([
        supabaseAdmin
            .from('knowledge_nodes')
            .select('category, created_at')
            .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
            
        supabaseAdmin
            .from('knowledge_relationships')
            .select('relationship_type, created_at')
            .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
            
        supabaseAdmin
            .from('graphrag_access_log')
            .select('action, created_at, metadata')
            .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
            .limit(50)
    ]);
    
    return {
        nodeStats: nodeStats.data || [],
        relationshipStats: relationshipStats.data || [],
        recentActivity: recentActivity.data || [],
        generatedAt: new Date().toISOString()
    };
}

/**
 * Log access for auditing and analytics
 */
async function logAccess(user, action, params) {
    try {
        await supabaseAdmin
            .from('graphrag_access_log')
            .insert({
                user_id: user.id,
                user_email: user.email,
                action,
                metadata: {
                    params: params,
                    timestamp: new Date().toISOString(),
                    userAgent: 'netlify-function'
                }
            });
    } catch (error) {
        // Don't fail the main request if logging fails
        console.warn('Failed to log access:', error);
    }
}

console.log('🌉 GRAPHRAG Bridge function loaded and ready!');