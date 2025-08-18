const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

exports.handler = async (event, context) => {
    // Handle CORS
    const headers = {
        'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers };
    }

    if (event.httpMethod !== 'POST') {
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
        const requestBody = JSON.parse(event.body);
        
        const {
            studentId,
            title,
            projectType,
            description,
            groupMembers,
            culturalReflection,
            communityImpact,
            additionalResources,
            presentationNotes,
            culturalElements,
            dueDate,
            files,
            status = 'submitted'
        } = requestBody;

        // Validate required fields
        if (!studentId || !title || !projectType || !description) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Missing required fields: studentId, title, projectType, and description are required'
                })
            };
        }

        // Get the student's profile to find their teacher
        const { data: studentProfile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', studentId)
            .single();

        if (profileError || !studentProfile) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Student profile not found'
                })
            };
        }

        // For now, we'll assign to the first available teacher
        // In a real system, this would be based on class assignments
        const { data: teachers, error: teacherError } = await supabase
            .from('profiles')
            .select('user_id')
            .eq('role', 'teacher')
            .limit(1);

        const teacherId = teachers && teachers.length > 0 ? teachers[0].user_id : null;

        // Prepare content structure for flexible project data
        const content = {
            description,
            groupMembers: groupMembers ? groupMembers.split('\n').filter(m => m.trim()) : [],
            culturalReflection,
            communityImpact,
            additionalResources,
            presentationNotes,
            culturalElements: culturalElements || [],
            submissionMethod: 'web_form',
            submissionIP: event.headers['x-forwarded-for'] || event.headers['client-ip']
        };

        // Parse group members for collaboration tracking
        let groupMemberIds = [];
        if (groupMembers && groupMembers.trim()) {
            // This would need enhancement to properly map names to user IDs
            // For now, we'll store as text and enhance later
            groupMemberIds = []; // Would be populated with actual user IDs
        }

        // Insert project submission
        const { data: project, error: insertError } = await supabase
            .from('student_projects')
            .insert({
                student_id: studentId,
                teacher_id: teacherId,
                project_type: projectType,
                title,
                description,
                content,
                group_members: groupMemberIds,
                due_date: dueDate,
                status,
                cultural_elements: culturalElements || [],
                file_attachments: files || [],
                submission_date: new Date().toISOString()
            })
            .select()
            .single();

        if (insertError) {
            console.error('Project insertion error:', insertError);
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    success: false,
                    message: 'Failed to submit project. Please try again.'
                })
            };
        }

        // Create collaboration records for group projects
        if (projectType === 'society-design' && groupMembers && groupMembers.trim()) {
            const collaborationData = {
                project_id: project.id,
                student_id: studentId,
                role: 'primary-submitter', // Would be enhanced with actual role assignment
                contribution_log: [{
                    action: 'project_submission',
                    timestamp: new Date().toISOString(),
                    details: 'Submitted initial project'
                }],
                collaboration_score: 100, // Initial score, would be updated through peer evaluations
                created_at: new Date().toISOString()
            };

            await supabase
                .from('collaboration_records')
                .insert(collaborationData);
        }

        // Update teacher analytics
        if (teacherId) {
            const today = new Date().toISOString().split('T')[0];
            
            // Get or create today's analytics record
            const { data: existingAnalytics } = await supabase
                .from('teacher_analytics')
                .select('*')
                .eq('teacher_id', teacherId)
                .eq('date', today)
                .single();

            if (existingAnalytics) {
                // Update existing record
                await supabase
                    .from('teacher_analytics')
                    .update({
                        submissions_pending: existingAnalytics.submissions_pending + 1,
                        engagement_metrics: {
                            ...existingAnalytics.engagement_metrics,
                            total_submissions: (existingAnalytics.engagement_metrics.total_submissions || 0) + 1,
                            cultural_integration_submissions: culturalElements && culturalElements.length > 0 ? 
                                (existingAnalytics.engagement_metrics.cultural_integration_submissions || 0) + 1 : 
                                (existingAnalytics.engagement_metrics.cultural_integration_submissions || 0)
                        }
                    })
                    .eq('teacher_id', teacherId)
                    .eq('date', today);
            } else {
                // Create new record
                await supabase
                    .from('teacher_analytics')
                    .insert({
                        teacher_id: teacherId,
                        date: today,
                        submissions_pending: 1,
                        engagement_metrics: {
                            total_submissions: 1,
                            cultural_integration_submissions: culturalElements && culturalElements.length > 0 ? 1 : 0
                        }
                    });
            }
        }

        // Log successful submission for student analytics
        await supabase
            .from('learning_sessions')
            .insert({
                user_id: studentId,
                session_start: new Date().toISOString(),
                session_end: new Date().toISOString(),
                interactions: [{
                    type: 'project_submission',
                    timestamp: new Date().toISOString(),
                    project_id: project.id,
                    project_type: projectType
                }],
                cultural_engagement_score: culturalElements ? culturalElements.length * 20 : 0, // 20 points per cultural element
                total_time_minutes: 0, // Would be tracked from client-side timing
                device_type: event.headers['user-agent']?.includes('Mobile') ? 'mobile' : 'desktop'
            });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Project submitted successfully!',
                data: {
                    projectId: project.id,
                    submissionDate: project.submission_date,
                    status: project.status,
                    teacherAssigned: !!teacherId
                }
            })
        };

    } catch (error) {
        console.error('Project submission error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'An unexpected error occurred. Please try again.'
            })
        };
    }
};