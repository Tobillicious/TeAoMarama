/**
 * AI Companion API - Connects Te Kete Ako platform with ADK agents
 * 
 * This function routes requests to appropriate AI agents based on user role and context,
 * ensuring culturally-responsive AI assistance for both students and teachers.
 */

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Import or configure ADK agents (in production, these would be proper imports)
// For now, we'll simulate agent responses with culturally-appropriate logic

const CULTURAL_RESPONSES = {
    whakatauki: {
        "learning_encouragement": {
            mi: "Whāia te mātauranga hei oranga mō koutou.",
            en: "Seek after learning for the sake of your wellbeing.",
            application: "Remember that every step in your learning journey contributes to your personal growth and your ability to support your whānau and community."
        },
        "collaboration": {
            mi: "He waka eke noa.",
            en: "We are all in this together.",
            application: "Your success and your classmates' success are connected. Support each other and grow together."
        },
        "perseverance": {
            mi: "Kia kaha, kia māia, kia manawanui.",
            en: "Be strong, be brave, be patient.",
            application: "Learning requires patience and persistence. Trust in your ability to grow and overcome challenges."
        },
        "people_focus": {
            mi: "He aha te mea nui o te ao? He tangata, he tangata, he tangata.",
            en: "What is the most important thing in the world? It is people, it is people, it is people.",
            application: "Your learning serves not just yourself, but your relationships and community connections."
        }
    },
    
    cultural_connections: {
        mathematics: "Mathematics exists in the patterns of kōwhaiwhai, the calculations needed for traditional navigation, and the symmetry found in nature that our tīpuna observed and honored.",
        science: "Science includes the traditional knowledge of rongoā (medicinal plants), astronomical navigation by our ancestors, and the understanding of natural cycles that guided sustainable living.",
        english: "English language learning connects to the oral traditions of pūrākau (stories), the power of words in whaikōrero (formal speaking), and the art of storytelling that preserves wisdom.",
        social_studies: "Social studies explores the governance systems of our tīpuna, the impacts of colonization, and the ongoing journey toward tino rangatiratanga (self-determination).",
        arts: "The arts celebrate the visual language of traditional patterns, the rhythms and melodies that carry cultural knowledge, and the creative expression that keeps culture alive."
    }
};

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
            query,
            userRole,
            userId,
            context = {},
            agentType = 'general'
        } = requestBody;

        // Get user profile for context
        let userProfile = null;
        if (userId) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('user_id', userId)
                .single();
            userProfile = profile;
        }

        // Route to appropriate AI agent based on role and request type
        let aiResponse;
        
        if (userRole === 'student') {
            aiResponse = await processStudentRequest(query, context, userProfile);
        } else if (userRole === 'teacher') {
            aiResponse = await processTeacherRequest(query, context, userProfile);
        } else {
            aiResponse = await processGeneralRequest(query, context);
        }

        // Log interaction for analytics (respecting privacy)
        if (userId) {
            await supabase
                .from('learning_sessions')
                .insert({
                    user_id: userId,
                    session_start: new Date().toISOString(),
                    session_end: new Date().toISOString(),
                    interactions: [{
                        type: 'ai_companion_interaction',
                        timestamp: new Date().toISOString(),
                        query_type: agentType,
                        cultural_engagement: aiResponse.cultural_engagement_score || 0
                    }],
                    cultural_engagement_score: aiResponse.cultural_engagement_score || 0,
                    total_time_minutes: 1,
                    device_type: event.headers['user-agent']?.includes('Mobile') ? 'mobile' : 'desktop'
                });
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                response: aiResponse,
                culturalContext: {
                    whakatauki: aiResponse.whakatauki,
                    culturalConnection: aiResponse.cultural_connection
                },
                timestamp: new Date().toISOString()
            })
        };

    } catch (error) {
        console.error('AI Companion error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                message: 'AI companion service temporarily unavailable. Please try again.'
            })
        };
    }
};

async function processStudentRequest(query, context, userProfile) {
    // Simulate Ākonga Companion Agent response
    const lowerQuery = query.toLowerCase();
    
    let responseType = 'general';
    if (lowerQuery.includes('help') || lowerQuery.includes('stuck') || lowerQuery.includes('difficult')) {
        responseType = 'encouragement';
    } else if (lowerQuery.includes('group') || lowerQuery.includes('team') || lowerQuery.includes('together')) {
        responseType = 'collaboration';
    } else if (lowerQuery.includes('connect') || lowerQuery.includes('relate') || lowerQuery.includes('understand')) {
        responseType = 'connection';
    }
    
    // Select appropriate cultural guidance
    let whakatauki, cultural_connection;
    let cultural_engagement_score = 20; // Base score for cultural interaction
    
    switch (responseType) {
        case 'encouragement':
            whakatauki = CULTURAL_RESPONSES.whakatauki.learning_encouragement;
            cultural_engagement_score = 40;
            break;
        case 'collaboration':
            whakatauki = CULTURAL_RESPONSES.whakatauki.collaboration;
            cultural_engagement_score = 35;
            break;
        case 'connection':
            whakatauki = CULTURAL_RESPONSES.whakatauki.people_focus;
            cultural_engagement_score = 30;
            break;
        default:
            whakatauki = CULTURAL_RESPONSES.whakatauki.learning_encouragement;
    }
    
    // Identify subject context for cultural connections
    const subjects = ['mathematics', 'science', 'english', 'social_studies', 'arts'];
    let subjectContext = null;
    
    for (const subject of subjects) {
        if (lowerQuery.includes(subject) || lowerQuery.includes(subject.replace('_', ' '))) {
            subjectContext = subject;
            cultural_connection = CULTURAL_RESPONSES.cultural_connections[subject];
            cultural_engagement_score += 20;
            break;
        }
    }
    
    // Generate culturally-responsive guidance
    let guidance = "";
    let encouragement = "";
    
    if (responseType === 'encouragement') {
        encouragement = `Kia kaha, e hoa! Every challenge you face is an opportunity to grow stronger. Your tīpuna (ancestors) faced many challenges too, and their perseverance flows through you.`;
        guidance = `Remember that asking for help shows wisdom, not weakness. Your classmates and kaiako are here to support your learning journey. Consider connecting with your group members or seeking guidance from someone who has mastered this topic.`;
    } else if (responseType === 'collaboration') {
        encouragement = `Working together reflects the Māori value of kotahitanga - unity and collective responsibility. Your individual success contributes to your group's success.`;
        guidance = `Approach group work with manaakitanga (hospitality and care). Share your knowledge freely, listen to others' perspectives, and remember that everyone brings unique strengths to the team.`;
    } else if (responseType === 'connection') {
        encouragement = `Learning is about building connections - between ideas, between people, and between your cultural knowledge and new concepts.`;
        guidance = `Think about how this topic connects to your own experiences, your whānau, and your community. What you already know is valuable and can help you understand new ideas.`;
    } else {
        encouragement = `Your learning journey is unique and valuable. Take time to reflect on how new knowledge connects to what you already know and value.`;
        guidance = `Consider how this learning might serve not just your personal goals, but also your whānau and community. Education is a gift that keeps giving when shared.`;
    }
    
    return {
        message: guidance,
        encouragement: encouragement,
        whakatauki: whakatauki,
        cultural_connection: cultural_connection,
        cultural_engagement_score: cultural_engagement_score,
        next_steps: [
            "Reflect on how this connects to your cultural knowledge and experiences",
            "Discuss your ideas with classmates or whānau",
            "Consider how this learning serves your community goals"
        ],
        agent_type: 'akonga_companion'
    };
}

async function processTeacherRequest(query, context, userProfile) {
    // Simulate Kaiako Assistant Agent response
    const lowerQuery = query.toLowerCase();
    
    let responseType = 'general';
    if (lowerQuery.includes('assessment') || lowerQuery.includes('feedback') || lowerQuery.includes('grade')) {
        responseType = 'assessment';
    } else if (lowerQuery.includes('engagement') || lowerQuery.includes('participation') || lowerQuery.includes('motivation')) {
        responseType = 'engagement';
    } else if (lowerQuery.includes('cultural') || lowerQuery.includes('māori') || lowerQuery.includes('responsive')) {
        responseType = 'cultural_integration';
    } else if (lowerQuery.includes('activity') || lowerQuery.includes('lesson') || lowerQuery.includes('teaching')) {
        responseType = 'pedagogy';
    }
    
    let guidance, strategies, cultural_framework;
    let cultural_engagement_score = 25; // Base score for teacher cultural awareness
    
    switch (responseType) {
        case 'assessment':
            guidance = "Consider holistic assessment approaches that value cultural competency alongside academic achievement. Look for evidence of students connecting cultural knowledge with academic content.";
            strategies = [
                "Use portfolio assessments that include cultural reflection components",
                "Provide opportunities for peer assessment and collaborative evaluation",
                "Include self-reflection questions about cultural connections and learning",
                "Design rubrics that explicitly value cultural perspectives and knowledge"
            ];
            cultural_framework = "Assessment should affirm student identity while promoting growth. Consider the principle of ako - reciprocal learning where assessment benefits both student and teacher understanding.";
            cultural_engagement_score = 45;
            break;
            
        case 'engagement':
            guidance = "Student engagement often increases when cultural connections are made explicit. Create opportunities for students to share their cultural knowledge and perspectives as valid academic content.";
            strategies = [
                "Start lessons by asking students about their cultural connections to the topic",
                "Use collaborative learning structures that mirror Māori values of collective responsibility",
                "Include contemporary Māori perspectives alongside traditional knowledge",
                "Create opportunities for students to teach each other based on their cultural expertise"
            ];
            cultural_framework = "Engagement thrives when students see their cultural identity as an asset, not a barrier to learning. The principle of manaakitanga (hospitality) creates welcoming learning environments.";
            cultural_engagement_score = 40;
            break;
            
        case 'cultural_integration':
            guidance = "Authentic cultural integration goes beyond surface-level additions. It requires weaving cultural values and perspectives into the fabric of teaching and learning.";
            strategies = [
                "Connect academic concepts to traditional Māori knowledge systems",
                "Use whakatōhia (collective decision-making) principles in classroom management",
                "Incorporate whakapapa (connection) thinking to show relationships between ideas",
                "Apply kaitiakitanga (guardianship) concepts to student responsibility for learning"
            ];
            cultural_framework = "Cultural integration should honor the principle of tino rangatiratanga - supporting student self-determination and cultural pride while achieving academic goals.";
            cultural_engagement_score = 50;
            break;
            
        default:
            guidance = "Effective teaching at Mangakōtukutuku College honors both academic excellence and cultural authenticity. Consider how your pedagogical choices reflect Te Ao Māori values.";
            strategies = [
                "Build relationships (whakapapa) with students before focusing on content",
                "Use culturally-responsive teaching methods that affirm student identity",
                "Create collaborative learning opportunities that mirror cultural values",
                "Regularly reflect on how your teaching supports both individual and collective success"
            ];
            cultural_framework = "Teaching is a form of manaakitanga - caring for and nurturing the growth of your students in all dimensions of their development.";
            cultural_engagement_score = 35;
    }
    
    return {
        message: guidance,
        teaching_strategies: strategies,
        cultural_framework: cultural_framework,
        whakatauki: CULTURAL_RESPONSES.whakatauki.learning_encouragement,
        cultural_engagement_score: cultural_engagement_score,
        recommended_resources: [
            "Review the collaborative frameworks in y8-systems/resources/",
            "Consider the assessment rubrics that integrate cultural competency",
            "Connect with cultural advisors for deeper cultural integration guidance"
        ],
        agent_type: 'kaiako_assistant'
    };
}

async function processGeneralRequest(query, context) {
    // General culturally-aware response
    return {
        message: "Kia ora! I'm here to support learning at Mangakōtukutuku College in ways that honor Te Ao Māori values. How can I help you today?",
        whakatauki: CULTURAL_RESPONSES.whakatauki.people_focus,
        cultural_connection: "All learning is strengthened when it connects to our cultural values and community goals.",
        cultural_engagement_score: 20,
        guidance: "Feel free to ask about academic topics, collaboration strategies, or how cultural knowledge connects to your learning goals.",
        agent_type: 'general_assistant'
    };
}