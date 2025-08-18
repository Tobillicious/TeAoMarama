// netlify/functions/get-resources.js
import { createClient } from '@supabase/supabase-js';

// It's recommended to use a shared client, but for this self-contained function, we'll initialize it here.
const supabase = createClient(
  process.env.SUPABASE_URL || 'https://nlgldaqtubrlcqddppbq.supabase.co',
  process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4Nzg3MzcsImV4cCI6MjAzNzQ1NDczN30.j2p9UeHpHuGWnJ6rDv5XGq-AZI11-UXwFsKR3IHQT48'
  // Note: We use the ANON_KEY for public, read-only access, 
  // relying on Row Level Security (RLS) in the database.
);

export const handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': process.env.SITE_URL || '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
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

  try {
    // Query the resources table
    // We can add filters here later based on query parameters (e.g., ?type=game)
    const { data, error } = await supabase
      .from('resources')
      .select('title, description, type, path, subject, year_levels, tags, nz_curriculum_links')
      .order('title', { ascending: true });

    if (error) {
      console.error('Error fetching resources:', error);
      throw error;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, resources: data })
    };

  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'Internal server error while fetching resources.' })
    };
  }
};
