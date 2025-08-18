const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    console.log('Starting manual schema fix...');

    // Step 1: Check if we can select from profiles table
    const { data: profilesTest, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);

    if (profilesError) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Cannot access profiles table', details: profilesError.message })
      };
    }

    // Step 2: Try to test if the columns exist by attempting an update
    const testProfile = profilesTest[0];
    if (!testProfile) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'No profiles found to test with' })
      };
    }

    // Test 1: Try to update learning_style
    const { error: learningStyleError } = await supabase
      .from('profiles')
      .update({ learning_style: { modality: 'test', pace: 'moderate' } })
      .eq('id', testProfile.id);

    // Test 2: Try to update last_handoff_agent  
    const { error: handoffError } = await supabase
      .from('profiles')
      .update({ last_handoff_agent: { agent: 'test', timestamp: new Date().toISOString() } })
      .eq('id', testProfile.id);

    // Test 3: Try to update knowledge_vectors (this will likely fail)
    const { error: vectorError } = await supabase
      .from('profiles')
      .update({ knowledge_vectors: '[0.1, 0.2, 0.3]' })
      .eq('id', testProfile.id);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        tests: {
          profiles_accessible: !profilesError,
          learning_style_exists: !learningStyleError,
          last_handoff_agent_exists: !handoffError,
          knowledge_vectors_exists: !vectorError,
          test_profile_id: testProfile.id,
          errors: {
            learning_style: learningStyleError?.message || null,
            handoff_agent: handoffError?.message || null,
            knowledge_vectors: vectorError?.message || null
          }
        },
        timestamp: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Manual schema test error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message
      })
    };
  }
};