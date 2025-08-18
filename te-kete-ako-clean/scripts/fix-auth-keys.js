#!/usr/bin/env node

/**
 * AUTHENTICATION FIX UTILITY
 * This script shows what the correct API key structure should be
 * The actual key must be obtained from Supabase dashboard
 */

console.log('🔧 Te Kete Ako Authentication Fix Utility\n');

const currentWrongKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtwYXdrZnhkcXpocmh1bWx1dGp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE3ODE0MzUsImV4cCI6MjAzNzM1NzQzNX0.te0kutquDw1nIft0mcrvxOn_TEEtybBzM9IYf_IQa88';

// Decode current wrong key
function decodeJWT(token) {
    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return payload;
    } catch (e) {
        return null;
    }
}

console.log('❌ CURRENT (BROKEN) KEY ANALYSIS:');
const currentPayload = decodeJWT(currentWrongKey);
console.log(JSON.stringify(currentPayload, null, 2));
console.log(`Project Reference: ${currentPayload.ref} (WRONG - should be nlgldaqtubrlcqddppbq)\n`);

console.log('✅ EXPECTED CORRECT KEY STRUCTURE:');
const expectedPayload = {
    "iss": "supabase",
    "ref": "nlgldaqtubrlcqddppbq",  // This is the key difference!
    "role": "anon",
    "iat": Math.floor(Date.now() / 1000),
    "exp": Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year from now
};
console.log(JSON.stringify(expectedPayload, null, 2));

console.log('\n🔑 TO FIX AUTHENTICATION:');
console.log('1. Go to https://supabase.com/dashboard');
console.log('2. Select the "nlgldaqtubrlcqddppbq" project');
console.log('3. Go to Settings → API');
console.log('4. Copy the anon/public key');
console.log('5. Replace line 19 in js/env-config.js');
console.log('\n⚠️  The key MUST come from the correct Supabase project dashboard!');
console.log('   This script cannot generate the actual working key.');

console.log('\n📝 FILES TO UPDATE:');
console.log('- js/env-config.js (line 19)');
console.log('- Test with auth-diagnostics.html');

console.log('\n🚨 CRITICAL: Users cannot login until this is fixed!');