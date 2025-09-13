// Supabase Client Configuration
import { createClient } from '@supabase/supabase-js';

// Use Vite environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Database connection details for superintelligence
export // // // const databaseConfig = {
  host: 'aws-0-ap-southeast-2.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  user: 'postgres.cpvherfewjpnhxfhrvlt',
  // Password should be set via environment variable
  password: import.meta.env.VITE_SUPABASE_DB_PASSWORD || '',
  ssl: true,
  connectionString: import.meta.env.VITE_SUPABASE_DATABASE_URL || '',
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Enhanced client with additional configuration
export // // // const supabaseEnhanced = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'X-Client-Info': 'teaomarama-superintelligence',
    },
  },
});
