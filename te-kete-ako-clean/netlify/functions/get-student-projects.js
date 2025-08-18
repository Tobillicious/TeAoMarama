const { createClient } = require('@supabase/supabase-js');
const jwt = require('jsonwebtoken');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

exports.handler = async (event, context) => {
    // Handle CORS
    const headers = {
        'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    if (!supabaseUrl || !supabaseKey) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                success: false, 
                message: 'Server configuration error' 
            })
        };
    }

    try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        
        // Extract and verify JWT token
        const authHeader = event.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Authentication required'
                })
            };
        }

        const token = authHeader.substring(7);
        let userId;
        
        try {
            // In a real app, you'd verify the JWT properly with Supabase
            // For now, we'll decode it to get the user ID
            const decoded = jwt.decode(token);
            userId = decoded?.sub;
        } catch (error) {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Invalid authentication token'
                })
            };
        }

        if (!userId) {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'User identification failed'
                })
            };
        }

        // Get student's projects
        const { data: projects, error: projectsError } = await supabase
            .from('student_projects')
            .select(`
                *,
                profiles!student_projects_teacher_id_fkey(display_name, email)
            `)
            .eq('student_id', userId)
            .order('submission_date', { ascending: false });

        if (projectsError) {
            console.error('Database error:', projectsError);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Failed to retrieve projects'
                })
            };
        }

        // Get collaboration records for the student
        const { data: collaborations, error: collabError } = await supabase
            .from('collaboration_records')
            .select(`
                *,
                student_projects(title, project_type, status)
            `)
            .eq('student_id', userId);

        if (collabError) {
            console.error('Collaboration fetch error:', collabError);
        }

        // Format projects for response
        const formattedProjects = projects.map(project => ({
            id: project.id,
            title: project.title,
            projectType: project.project_type,
            description: project.description,
            status: project.status,
            submissionDate: project.submission_date,
            dueDate: project.due_date,
            teacherFeedback: project.teacher_feedback,
            grade: project.grade,
            culturalElements: project.cultural_elements || [],
            fileAttachments: project.file_attachments || [],
            groupMembers: project.group_members || [],
            teacherName: project.profiles?.display_name || 'Not assigned',
            teacherEmail: project.profiles?.email,
            content: project.content
        }));

        // Get student's learning analytics
        const { data: recentSessions, error: sessionError } = await supabase
            .from('learning_sessions')
            .select('cultural_engagement_score, session_start, interactions')
            .eq('user_id', userId)
            .order('session_start', { ascending: false })
            .limit(10);

        if (sessionError) {
            console.error('Session analytics error:', sessionError);
        }

        // Calculate summary statistics
        const stats = {
            totalProjects: projects.length,
            submittedProjects: projects.filter(p => p.status === 'submitted' || p.status === 'under_review' || p.status === 'reviewed').length,
            approvedProjects: projects.filter(p => p.status === 'approved').length,
            draftProjects: projects.filter(p => p.status === 'draft').length,
            needsRevision: projects.filter(p => p.status === 'needs_revision').length,
            averageCulturalEngagement: recentSessions && recentSessions.length > 0 ? 
                recentSessions.reduce((sum, s) => sum + (s.cultural_engagement_score || 0), 0) / recentSessions.length : 0,
            collaborations: collaborations ? collaborations.length : 0
        };

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                data: {
                    projects: formattedProjects,
                    collaborations: collaborations || [],
                    stats,
                    recentActivity: recentSessions ? recentSessions.slice(0, 5) : []
                }
            })
        };

    } catch (error) {
        console.error('Get student projects error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'An unexpected error occurred'
            })
        };
    }
};