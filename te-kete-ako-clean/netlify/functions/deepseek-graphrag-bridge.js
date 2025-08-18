/**
 * ================================================================
 * DEEPSEEK + GRAPHRAG BRIDGE - Multi-AI Terminal Integration
 * ================================================================
 * 
 * Connects DeepSeek reasoning with Te Kete GraphRAG institutional memory
 * Maintains Supabase authentication while enabling AI-to-AI coordination
 * 
 * ================================================================
 */

import { createClient } from '@supabase/supabase-js';

// Environment variables
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;

// Initialize Supabase with service role (bypasses RLS for AI agents)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * Enhanced DeepSeek function with GraphRAG institutional memory access
 */
export async function handler(event, context) {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Content-Type': 'application/json'
    };
    
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        // Parse request
        const { query, context: userContext, use_graphrag = true, user_id } = JSON.parse(event.body || '{}');
        
        if (!query) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Query is required' })
            };
        }

        console.log(`🧠 DeepSeek + GraphRAG query: "${query}"`);

        let graphragContext = null;
        
        // Phase 1: Query GraphRAG Brain for institutional memory
        if (use_graphrag) {
            try {
                graphragContext = await queryGraphRAGBrain(query);
                console.log(`📚 GraphRAG found ${graphragContext.results?.length || 0} relevant resources`);
            } catch (error) {
                console.warn('⚠️ GraphRAG unavailable, proceeding with DeepSeek only:', error.message);
            }
        }

        // Phase 2: DeepSeek reasoning with GraphRAG context
        const deepseekResponse = await queryDeepSeek(query, graphragContext, userContext);
        
        // Phase 3: Log for multi-AI coordination
        await logMultiAIInteraction(user_id, query, graphragContext, deepseekResponse);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                response: deepseekResponse,
                graphrag_context: graphragContext ? {
                    resources_found: graphragContext.results?.length || 0,
                    cultural_resources: graphragContext.cultural_count || 0,
                    connections: graphragContext.relationships?.length || 0
                } : null,
                ai_coordination: {
                    deepseek: "reasoning_and_generation",
                    graphrag: "institutional_memory",
                    firebase: "user_authentication",
                    supabase: "knowledge_storage"
                }
            })
        };

    } catch (error) {
        console.error('🚨 DeepSeek-GraphRAG Bridge Error:', error);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Multi-AI coordination error',
                message: error.message,
                timestamp: new Date().toISOString()
            })
        };
    }
}

/**
 * Query the GraphRAG brain for institutional memory
 */
async function queryGraphRAGBrain(query) {
    // Search knowledge nodes
    const { data: nodes, error: nodeError } = await supabase
        .from('knowledge_nodes')
        .select(`
            id,
            title,
            content,
            category,
            metadata,
            cultural_level,
            relationships:knowledge_relationships(
                target_node:target_node_id(title, category),
                relationship_type
            )
        `)
        .textSearch('content', query)
        .limit(10)
        .order('created_at', { ascending: false });

    if (nodeError) {
        throw new Error(`GraphRAG query failed: ${nodeError.message}`);
    }

    // Count cultural resources
    const cultural_count = nodes?.filter(node => 
        node.cultural_level === 'essential' || node.cultural_level === 'high'
    ).length || 0;

    // Extract relationships
    const relationships = nodes?.flatMap(node => node.relationships || []) || [];

    return {
        results: nodes || [],
        cultural_count,
        relationships,
        query_timestamp: new Date().toISOString()
    };
}

/**
 * Enhanced DeepSeek query with GraphRAG context
 */
async function queryDeepSeek(query, graphragContext, userContext) {
    // Build enhanced prompt with institutional memory
    let systemPrompt = `You are DeepSeek, integrated with Te Kete Ako's GraphRAG institutional memory system.

You have access to:
- 179+ educational resources with cultural integrity
- 553+ knowledge relationships
- Authentic Te Ao Māori integration
- Revolutionary educational platforms (Virtual Marae, Living Whakapapa, etc.)

CRITICAL: You are part of a multi-AI coordination system. Your role is reasoning and generation, while GraphRAG provides institutional memory.`;

    if (graphragContext && graphragContext.results.length > 0) {
        systemPrompt += `\n\nINSTITUTIONAL MEMORY CONTEXT:\n`;
        
        graphragContext.results.forEach((resource, index) => {
            systemPrompt += `${index + 1}. ${resource.title} (${resource.category})\n`;
            systemPrompt += `   Content: ${resource.content?.substring(0, 200)}...\n`;
            if (resource.cultural_level === 'essential') {
                systemPrompt += `   🌿 ESSENTIAL CULTURAL RESOURCE\n`;
            }
        });

        if (graphragContext.cultural_count > 0) {
            systemPrompt += `\n⚠️ CULTURAL SAFETY: ${graphragContext.cultural_count} cultural resources found. Ensure authentic representation.`;
        }
    }

    if (userContext) {
        systemPrompt += `\n\nUSER CONTEXT: ${userContext}`;
    }

    // Call DeepSeek API
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'deepseek-chat',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: query }
            ],
            max_tokens: 2000,
            temperature: 0.7
        })
    });

    if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

/**
 * Log multi-AI interaction for coordination analytics
 */
async function logMultiAIInteraction(userId, query, graphragContext, deepseekResponse) {
    try {
        await supabase
            .from('multi_ai_coordination_log')
            .insert({
                user_id: userId,
                query,
                ai_agents_used: ['deepseek', 'graphrag'],
                graphrag_resources_found: graphragContext?.results?.length || 0,
                cultural_resources_accessed: graphragContext?.cultural_count || 0,
                response_length: deepseekResponse?.length || 0,
                coordination_success: true,
                timestamp: new Date().toISOString()
            });
    } catch (error) {
        console.warn('Failed to log multi-AI coordination:', error);
    }
}

console.log('🤖 DeepSeek-GraphRAG Bridge loaded - Multi-AI coordination ready!');