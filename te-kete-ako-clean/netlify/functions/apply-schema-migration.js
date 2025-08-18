const { createClient } = require('@supabase/supabase-js');

// One-time schema migration to add missing vector columns
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://tekete.netlify.app',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers };
  }

  try {
    // Verify admin access (simple check for now)
    const { admin_key } = JSON.parse(event.body || '{}');
    if (admin_key !== 'schema-migration-2025') {
      return { 
        statusCode: 401, 
        headers, 
        body: JSON.stringify({ error: 'Admin access required' }) 
      };
    }

    console.log('Starting schema migration...');

    // Step 1: Add vector column (requires pgvector extension)
    const vectorQuery = `
      -- Enable vector extension if not exists
      CREATE EXTENSION IF NOT EXISTS vector;
      
      -- Add vector column for knowledge similarity matching
      ALTER TABLE profiles 
      ADD COLUMN IF NOT EXISTS knowledge_vectors vector(1536);
    `;

    const { error: vectorError } = await supabase.rpc('exec_sql', { 
      sql: vectorQuery 
    });

    if (vectorError) {
      console.log('Vector column might already exist or pgvector not available:', vectorError.message);
    }

    // Step 2: Add JSONB columns
    const jsonbQuery = `
      -- Add learning style preferences as JSONB
      ALTER TABLE profiles 
      ADD COLUMN IF NOT EXISTS learning_style JSONB DEFAULT '{"modality": "mixed", "pace": "moderate", "preferences": []}';

      -- Add agent handoff tracking for multi-agent coordination
      ALTER TABLE profiles 
      ADD COLUMN IF NOT EXISTS last_handoff_agent JSONB DEFAULT '{"agent": null, "timestamp": null, "context": null}';
    `;

    const { error: jsonbError } = await supabase.rpc('exec_sql', { 
      sql: jsonbQuery 
    });

    if (jsonbError) {
      console.error('JSONB columns error:', jsonbError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to add JSONB columns', 
          details: jsonbError.message 
        })
      };
    }

    // Step 3: Create indexes
    const indexQuery = `
      -- Create index on learning_style for filtering
      CREATE INDEX IF NOT EXISTS idx_learning_style 
      ON profiles USING gin (learning_style);

      -- Vector index (only if vector column exists)
      CREATE INDEX IF NOT EXISTS idx_knowledge_vectors 
      ON profiles USING ivfflat (knowledge_vectors vector_cosine_ops) 
      WITH (lists = 100);
    `;

    const { error: indexError } = await supabase.rpc('exec_sql', { 
      sql: indexQuery 
    });

    if (indexError) {
      console.log('Index creation partial failure (expected for vector):', indexError.message);
    }

    // Step 4: Update existing profiles with defaults
    const updateQuery = `
      -- Update existing profiles to have default learning styles if null
      UPDATE profiles 
      SET learning_style = '{"modality": "mixed", "pace": "moderate", "preferences": []}'
      WHERE learning_style IS NULL;

      -- Update existing profiles to have default handoff agent if null  
      UPDATE profiles 
      SET last_handoff_agent = '{"agent": null, "timestamp": null, "context": null}'
      WHERE last_handoff_agent IS NULL;
    `;

    const { error: updateError } = await supabase.rpc('exec_sql', { 
      sql: updateQuery 
    });

    if (updateError) {
      console.error('Update existing profiles error:', updateError);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ 
          error: 'Failed to update existing profiles', 
          details: updateError.message 
        })
      };
    }

    // Step 5: Verify schema
    const { data: columns } = await supabase
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'profiles')
      .eq('table_schema', 'public');

    console.log('Migration completed successfully');
    console.log('Current profiles table schema:', columns);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Schema migration completed',
        schema: columns,
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
};