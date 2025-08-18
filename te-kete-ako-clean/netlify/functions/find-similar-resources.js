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
        const { query, match_threshold = 0.3, match_count = 10 } = JSON.parse(event.body);
        
        if (!query) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Query parameter is required' })
            };
        }

        // Execute the GraphRAG query using the dedicated Python script
        const { stdout, stderr } = await execPromise(
            `cd /Users/admin/Documents/te-kete-ako-clean && python3 graphrag_query.py "${query}" ${match_threshold} ${match_count} 2>/dev/null`,
            { timeout: 30000 }
        );

        // Extract JSON from stdout (first line should be the JSON result)
        const lines = stdout.trim().split('\n');
        const jsonLine = lines.find(line => line.startsWith('{"success"'));
        
        if (!jsonLine) {
            throw new Error('No valid JSON output found from GraphRAG script');
        }

        // Parse the result
        const result = JSON.parse(jsonLine);
        
        if (result.error || !result.success) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ 
                    error: 'GraphRAG processing failed',
                    message: result.error || 'Unknown error'
                })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result)
        };

    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal server error',
                message: error.message 
            })
        };
    }
};