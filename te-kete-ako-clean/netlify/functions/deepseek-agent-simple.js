const axios = require('axios');

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
        const { message, conversation_history = [] } = JSON.parse(event.body);
        
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

        // Prepare conversation for DeepSeek
        const messages = [
            {
                role: "system",
                content: `You are an AI assistant for Te Kete Ako, an innovative New Zealand educational platform that integrates authentic Te Ao Māori (Māori worldview) with modern education.

Key Context:
- Te Kete Ako serves Years 7-13 students in Aotearoa New Zealand
- Platform focuses on culturally responsive education with authentic Māori integration
- You have access to 179+ educational resources covering all curriculum areas
- Emphasis on depth over breadth, systems thinking, and cultural safety

Guidelines for Responses:
1. Cultural Sensitivity: Always respect Te Ao Māori concepts and protocols
2. Educational Focus: Provide pedagogically sound guidance
3. New Zealand Context: Reference NZ curriculum and cultural context where relevant
4. Authentic Integration: Avoid tokenistic cultural references
5. Student-Centered: Focus on learning outcomes and student wellbeing

When discussing Māori concepts, be respectful and acknowledge the depth of mātauranga Māori (Māori knowledge systems).`
            },
            ...conversation_history,
            {
                role: "user",
                content: message
            }
        ];

        // Call DeepSeek API
        const deepseekResponse = await axios.post(
            'https://api.deepseek.com/v1/chat/completions',
            {
                model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
                messages: messages,
                max_tokens: 1500,
                temperature: 0.7,
                stream: false
            },
            {
                headers: {
                    'Authorization': `Bearer ${deepseekApiKey}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000
            }
        );

        const aiResponse = deepseekResponse.data.choices[0].message.content;

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                response: aiResponse,
                usage: deepseekResponse.data.usage,
                timestamp: new Date().toISOString(),
                source: 'deepseek-simple'
            })
        };

    } catch (error) {
        console.error('DeepSeek API error:', error.response?.data || error.message);
        
        // Handle specific error cases
        if (error.response?.status === 401) {
            return {
                statusCode: 401,
                headers,
                body: JSON.stringify({ 
                    error: 'Invalid DeepSeek API key',
                    message: 'Please check your DEEPSEEK_API_KEY environment variable'
                })
            };
        }
        
        if (error.response?.status === 429) {
            return {
                statusCode: 429,
                headers,
                body: JSON.stringify({ 
                    error: 'Rate limit exceeded',
                    message: 'Please wait before making another request'
                })
            };
        }

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'DeepSeek API error',
                message: error.response?.data?.error?.message || error.message
            })
        };
    }
};