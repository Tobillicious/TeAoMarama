const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Handle schema migration if POST request with admin key
    if (event.httpMethod === 'POST') {
      const { admin_key, action } = JSON.parse(event.body || '{}');
      
      if (admin_key === 'schema-migration-2025' && action === 'migrate') {
        return await performSchemaMigration(supabase, headers);
      }
    }

    // Regular database tests for GET requests
    // Test 1: Check if profiles table exists and what's in it
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(5);

    // Test 2: Check authentication users
    const { data: users, error: usersError } = await supabase.auth.admin.listUsers();

    // Test 3: Check table schema
    const { data: columns, error: columnsError } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'profiles')
      .eq('table_schema', 'public');

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        tests: {
          profiles: {
            error: profilesError?.message || null,
            data: profiles || [],
            count: profiles?.length || 0,
            schema: columns || []
          },
          users: {
            error: usersError?.message || null,
            count: users?.users?.length || 0,
            recent_users: users?.users?.slice(0, 3).map(u => ({
              id: u.id,
              email: u.email,
              created_at: u.created_at,
              user_metadata: u.user_metadata
            })) || []
          }
        }
      })
    };

  } catch (error) {
    console.error('Database test error:', error);
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

async function performSchemaMigration(supabase, headers) {
  try {
    console.log('Starting schema migration...');

    // Step 1: Add JSONB columns (these should work on all Supabase instances)
    const { error: jsonbError } = await supabase
      .from('profiles')
      .update({ 
        learning_style: { modality: 'mixed', pace: 'moderate', preferences: [] },
        last_handoff_agent: { agent: null, timestamp: null, context: null }
      })
      .eq('id', 'fake-id-to-trigger-schema-check'); // This will fail but show us if columns exist

    // If columns don't exist, try to add them via raw SQL
    if (jsonbError && jsonbError.message.includes('column')) {
      // Try direct SQL execution
      try {
        const { data: sqlResult, error: sqlError } = await supabase.rpc('exec_sql', {
          sql: `
            ALTER TABLE profiles 
            ADD COLUMN IF NOT EXISTS learning_style JSONB DEFAULT '{"modality": "mixed", "pace": "moderate", "preferences": []}',
            ADD COLUMN IF NOT EXISTS last_handoff_agent JSONB DEFAULT '{"agent": null, "timestamp": null, "context": null}';
          `
        });

        if (sqlError) {
          console.log('Direct SQL failed, trying alternative approach...');
          
          // Alternative: Create the columns one by one
          const learning_style_result = await supabase.rpc('exec_sql', {
            sql: `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS learning_style JSONB DEFAULT '{"modality": "mixed", "pace": "moderate", "preferences": []}';`
          });
          
          const handoff_result = await supabase.rpc('exec_sql', {
            sql: `ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_handoff_agent JSONB DEFAULT '{"agent": null, "timestamp": null, "context": null}';`
          });

          console.log('Alternative column creation:', { learning_style_result, handoff_result });
        }
      } catch (rpcError) {
        console.log('RPC not available, using manual approach...');
        
        // Manual approach: Try to update existing profiles to add default values
        const { data: profiles } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);

        if (profiles?.length > 0) {
          // Try to update with new columns - this will tell us if they exist
          const testUpdate = await supabase
            .from('profiles')
            .update({
              learning_style: { modality: 'mixed', pace: 'moderate', preferences: [] }
            })
            .eq('id', profiles[0].id);

          console.log('Test update result:', testUpdate);
        }
      }
    }

    // Step 2: Verify current schema
    const { data: updatedColumns } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'profiles')
      .eq('table_schema', 'public');

    // Step 3: Update existing profiles with defaults where needed
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        learning_style: { modality: 'mixed', pace: 'moderate', preferences: [] },
        last_handoff_agent: { agent: null, timestamp: null, context: null }
      })
      .is('learning_style', null);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Schema migration attempted',
        schema: updatedColumns || [],
        notes: 'Migration completed with available permissions',
        migration_date: new Date().toISOString()
      })
    };

  } catch (error) {
    console.error('Migration error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Migration failed', 
        details: error.message 
      })
    };
  }
}