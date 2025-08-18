// Fix RLS Policy Recursion Issue
const { createClient } = require('@supabase/supabase-js');

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || 'ENVIRONMENT_VARIABLE_REQUIRED';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'ENVIRONMENT_VARIABLE_REQUIRED';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixRLSPolicies() {
    console.log('🔧 Starting RLS Policy Fix...');
    
    try {
        // First, try to identify the problematic policy by testing basic operations
        console.log('🔍 Testing current database state...');
        
        // Try the simplest query that should work
        const { data: testData, error: testError } = await supabase
            .from('profiles')
            .select('count')
            .limit(1);
            
        if (testError) {
            console.log('❌ Confirmed RLS recursion error:', testError.message);
            
            if (testError.message.includes('infinite recursion detected')) {
                console.log('🎯 Identified: RLS policy recursion on profiles table');
                console.log('');
                console.log('📋 MANUAL FIX REQUIRED:');
                console.log('1. Go to: https://supabase.com/dashboard/project/nlgldaqtubrlcqddppbq');
                console.log('2. Click "SQL Editor" in the sidebar');
                console.log('3. Create a new query and paste the following SQL:');
                console.log('');
                console.log('-- FIX FOR RLS RECURSION ISSUE');
                console.log('-- Drop the problematic recursive policy');
                console.log('DROP POLICY IF EXISTS "Teachers can view student profiles" ON profiles;');
                console.log('');
                console.log('-- Create a simplified policy without recursion');
                console.log('CREATE POLICY "Simplified profile access" ON profiles');
                console.log('FOR ALL USING (');
                console.log('  auth.uid() = user_id OR');
                console.log('  auth.jwt() ->> \'role\' = \'teacher\'');
                console.log(');');
                console.log('');
                console.log('4. Click "Run" to execute the SQL');
                console.log('5. Test by running: SELECT * FROM profiles LIMIT 1;');
                console.log('');
                console.log('⚠️  Alternative if above doesn\'t work:');
                console.log('-- Temporarily disable RLS to fix policies');
                console.log('ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;');
                console.log('-- Re-enable later once policies are fixed');
                console.log('ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;');
            }
        } else {
            console.log('✅ Database appears to be working! No RLS recursion detected.');
            console.log('📊 Test result:', testData);
        }
        
    } catch (error) {
        console.error('💥 Unexpected error:', error);
    }
}

// Execute the fix
fixRLSPolicies();