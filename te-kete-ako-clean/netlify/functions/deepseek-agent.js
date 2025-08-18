const axios = require('axios');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

exports.handler = async (event, context) => {
    // Set CORS headers
    const headers = {
        'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        const { 
            message, 
            conversation_history = [],
            use_graphrag = true,
            analysis_mode = 'educational'
        } = JSON.parse(event.body);
        
        if (!message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Message parameter is required' })
            };
        }

        // Check for DeepSeek API key
        const deepseekApiKey = process.env.DEEPSEEK_API_KEY;
        if (!deepseekApiKey) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'DeepSeek API key not configured',
                    message: 'Please add DEEPSEEK_API_KEY to your environment variables'
                })
            };
        }

        let finalResponse = '';
        let graphragResults = null;
        let enhancedQuery = '';

        if (use_graphrag) {
            // Phase 1: Use DeepSeek to enhance the query for better GraphRAG search
            try {
                const queryEnhancementPrompt = `You are a query enhancement specialist for Te Kete Ako educational platform.

Transform this user question into optimal search terms for finding educational resources:

User Question: "${message}"

Instructions:
1. Extract key educational concepts and topics
2. Include relevant Māori terms if culturally appropriate
3. Add subject area keywords (mathematics, science, history, etc.)
4. Consider learning level indicators (Year 7-13)
5. Include assessment or activity type if relevant

Provide 3-5 enhanced search terms separated by commas. Focus on educational relevance and cultural sensitivity.

Enhanced search terms:`;

                const enhancementResponse = await callDeepSeekAPI(deepseekApiKey, [
                    { role: "user", content: queryEnhancementPrompt }
                ]);

                enhancedQuery = enhancementResponse.choices[0].message.content.trim();
                console.log('Enhanced query:', enhancedQuery);

                // Phase 2: Search GraphRAG with enhanced query
                try {
                    const { stdout, stderr } = await execPromise(
                        `python3 scripts/graphrag_query.py "${enhancedQuery}" 0.3 8 2>/dev/null`,
                        { timeout: 30000 }
                    );

                    const lines = stdout.trim().split('\n');
                    const jsonLine = lines.find(line => line.startsWith('{"success"'));
                    
                    if (jsonLine) {
                        graphragResults = JSON.parse(jsonLine);
                        console.log('GraphRAG results found:', graphragResults.count || 0);
                    }
                } catch (graphError) {
                    console.log('GraphRAG search failed, continuing with DeepSeek only:', graphError.message);
                }
            } catch (enhanceError) {
                console.log('Query enhancement failed, using original query:', enhanceError.message);
                enhancedQuery = message;
            }
        }

        // Phase 3: Generate comprehensive response using DeepSeek
        const systemPrompt = generateSystemPrompt(analysis_mode, graphragResults);
        const userPrompt = generateUserPrompt(message, enhancedQuery, graphragResults);

        const messages = [
            { role: "system", content: systemPrompt },
            ...conversation_history,
            { role: "user", content: userPrompt }
        ];

        const finalDeepSeekResponse = await callDeepSeekAPI(deepseekApiKey, messages);
        finalResponse = finalDeepSeekResponse.choices[0].message.content;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                response: finalResponse,
                enhanced_query: enhancedQuery,
                graphrag_results: graphragResults ? {
                    count: graphragResults.count || 0,
                    source: graphragResults.source,
                    resources_found: graphragResults.results ? graphragResults.results.length : 0
                } : null,
                usage: finalDeepSeekResponse.usage,
                timestamp: new Date().toISOString(),
                source: 'deepseek-graphrag-enhanced'
            })
        };

    } catch (error) {
        console.error('DeepSeek GraphRAG integration error:', error.response?.data || error.message);
        
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Integration processing error',
                message: error.response?.data?.error?.message || error.message
            })
        };
    }
};

async function callDeepSeekAPI(apiKey, messages, options = {}) {
    return await axios.post(
        'https://api.deepseek.com/v1/chat/completions',
        {
            model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
            messages: messages,
            max_tokens: options.max_tokens || 2000,
            temperature: options.temperature || 0.7,
            stream: false
        },
        {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            timeout: 30000
        }
    );
}

function generateSystemPrompt(analysisMode, graphragResults) {
    const basePrompt = `You are an advanced AI educational assistant for Te Kete Ako, New Zealand's most sophisticated cultural-educational platform.

Platform Context:
- Te Kete Ako integrates authentic Te Ao Māori with modern education
- Serves Years 7-13 students across all curriculum areas
- Features 179+ educational resources with deep cultural integration
- Uses GraphRAG system for intelligent resource discovery
- Emphasizes cultural responsiveness and authentic Māori knowledge systems

Your Capabilities:
- Educational analysis and pedagogical guidance
- Cultural sensitivity with Te Ao Māori protocols
- Cross-curricular connection identification  
- Learning pathway recommendations
- Assessment and resource suggestions`;

    if (analysisMode === 'cultural') {
        return basePrompt + `

Special Focus - Cultural Analysis:
- Prioritize authentic Te Ao Māori perspectives
- Identify cultural connections and protocols
- Suggest culturally responsive teaching approaches
- Respect whakapapa (genealogical) knowledge systems
- Integrate mātauranga Māori appropriately`;
    }

    if (analysisMode === 'pedagogical') {
        return basePrompt + `

Special Focus - Pedagogical Analysis:
- Analyze learning objectives and outcomes
- Suggest differentiated instruction strategies
- Recommend assessment approaches
- Identify prerequisite knowledge and skills
- Propose extension activities`;
    }

    return basePrompt + `

Standard Educational Analysis:
- Provide balanced educational guidance
- Consider both cultural and academic perspectives
- Suggest practical classroom applications
- Focus on student learning outcomes`;
}

function generateUserPrompt(originalMessage, enhancedQuery, graphragResults) {
    let prompt = `Student/Teacher Question: "${originalMessage}"`;
    
    if (enhancedQuery && enhancedQuery !== originalMessage) {
        prompt += `\n\nEnhanced Search Terms Used: "${enhancedQuery}"`;
    }

    if (graphragResults && graphragResults.results && graphragResults.results.length > 0) {
        prompt += `\n\nRelevant Educational Resources Found (${graphragResults.results.length} resources):`;
        
        graphragResults.results.slice(0, 5).forEach((resource, index) => {
            prompt += `\n\n${index + 1}. ${resource.title || resource.filename}`;
            if (resource.subject_areas) {
                prompt += `\n   Subject Areas: ${Array.isArray(resource.subject_areas) ? resource.subject_areas.join(', ') : resource.subject_areas}`;
            }
            if (resource.cultural_level) {
                prompt += `\n   Cultural Level: ${resource.cultural_level}`;
            }
            if (resource.content_preview) {
                prompt += `\n   Content: ${resource.content_preview.substring(0, 200)}...`;
            }
            if (resource.similarity) {
                prompt += `\n   Relevance: ${Math.round(resource.similarity * 100)}%`;
            }
        });
    } else if (graphragResults) {
        prompt += `\n\nNote: GraphRAG search completed but no specific resources found for these terms.`;
    }

    prompt += `\n\nPlease provide:
1. A comprehensive educational response to the question
2. Analysis of how the found resources (if any) relate to the question
3. Practical suggestions for teachers or students
4. Cultural considerations if relevant to Te Ao Māori
5. Recommendations for further learning or related topics

Focus on educational value, cultural sensitivity, and practical application for New Zealand classrooms.`;

    return prompt;
}