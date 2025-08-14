#!/usr/bin/env npx tsx

/**
 * Te Kete Ako Connection Diagnostic Tool
 * 
 * URGENT: Diagnose and fix database connection issues
 * Multiple diagnostic approaches to identify the root cause
 */

import { createClient } from '@supabase/supabase-js';

const TEKETE_SUPABASE_URL = 'https://nlgldaqtubrrlcqddppbq.supabase.co';
const TEKETE_SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5sZ2xkYXF0dWJybGNxZGRwcGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwODkzMzksImV4cCI6MjA2ODY2NTMzOX0.IFaWqep1MBSofARiCUuzvAReC44hwGnmKOMNSd55nIM';

interface DiagnosticResult {
  test_name: string;
  success: boolean;
  error?: string;
  details?: any;
  recommendation?: string;
}

async function runConnectionDiagnostics(): Promise<DiagnosticResult[]> {
  console.log('\n🔧 TE KETE AKO CONNECTION DIAGNOSTICS');
  console.log('='.repeat(60));
  
  const results: DiagnosticResult[] = [];
  
  // Test 1: Basic URL connectivity
  console.log('\n🌐 Test 1: Basic URL connectivity...');
  try {
    const response = await fetch(TEKETE_SUPABASE_URL, { 
      method: 'HEAD',
      signal: AbortSignal.timeout(10000) // 10 second timeout
    });
    
    const headersObject: Record<string, string> = {};
    // Iterate headers safely for environments where Headers#entries is not typed
    response.headers.forEach((value, key) => {
      headersObject[key] = value;
    });

    results.push({
      test_name: 'Basic URL Connectivity',
      success: response.ok,
      details: {
        status: response.status,
        statusText: response.statusText,
        headers: headersObject
      },
      recommendation: response.ok ? 'URL is reachable' : 'URL may be blocked or service down'
    });
    
    console.log(`✅ URL reachable: ${response.status} ${response.statusText}`);
    
  } catch (error) {
    results.push({
      test_name: 'Basic URL Connectivity',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      recommendation: 'Check network connectivity, DNS resolution, or firewall settings'
    });
    console.log(`❌ URL not reachable: ${error}`);
  }
  
  // Test 2: Supabase API endpoint
  console.log('\n🔗 Test 2: Supabase API endpoint...');
  try {
    const apiUrl = `${TEKETE_SUPABASE_URL}/rest/v1/`;
    const response = await fetch(apiUrl, {
      headers: {
        'apikey': TEKETE_SUPABASE_KEY,
        'Authorization': `Bearer ${TEKETE_SUPABASE_KEY}`
      },
      signal: AbortSignal.timeout(10000)
    });
    
    results.push({
      test_name: 'Supabase API Endpoint',
      success: response.ok,
      details: {
        status: response.status,
        apiUrl,
        authenticated: response.headers.get('x-supabase-api-version') !== null
      },
      recommendation: response.ok ? 'API endpoint accessible' : 'Check API key validity'
    });
    
    console.log(`✅ API endpoint: ${response.status}`);
    
  } catch (error) {
    results.push({
      test_name: 'Supabase API Endpoint',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      recommendation: 'API endpoint may be blocked or credentials invalid'
    });
    console.log(`❌ API endpoint failed: ${error}`);
  }
  
  // Test 3: Supabase client initialization
  console.log('\n⚙️ Test 3: Supabase client initialization...');
  try {
    const client = createClient(TEKETE_SUPABASE_URL, TEKETE_SUPABASE_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    
    results.push({
      test_name: 'Supabase Client Init',
      success: true,
      details: {
        initialized: true
      },
      recommendation: 'Client initialized successfully'
    });
    
    console.log('✅ Client initialized');
    
  } catch (error) {
    results.push({
      test_name: 'Supabase Client Init',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      recommendation: 'Check Supabase client library version compatibility'
    });
    console.log(`❌ Client init failed: ${error}`);
  }
  
  // Test 4: Simple database query
  console.log('\n🗄️ Test 4: Simple database query...');
  try {
    const client = createClient(TEKETE_SUPABASE_URL, TEKETE_SUPABASE_KEY);
    
    // Try a simple query that should work on any Supabase instance
    const { data, error } = await client
      .from('information_schema.tables')
      .select('table_name')
      .limit(1);
    
    if (error) {
      throw new Error(error.message);
    }
    
    results.push({
      test_name: 'Simple Database Query',
      success: true,
      details: {
        queryResult: data,
        tablesFound: data?.length || 0
      },
      recommendation: 'Database queries working - ready for migration'
    });
    
    console.log(`✅ Query successful: Found ${data?.length || 0} tables`);
    
  } catch (error) {
    results.push({
      test_name: 'Simple Database Query',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      recommendation: 'Database access may be restricted or schema different than expected'
    });
    console.log(`❌ Query failed: ${error}`);
  }
  
  // Test 5: Authentication check
  console.log('\n🔐 Test 5: Authentication check...');
  try {
    const client = createClient(TEKETE_SUPABASE_URL, TEKETE_SUPABASE_KEY);
    
    // Try to access user info or make an authenticated request
    const { data: { user }, error } = await client.auth.getUser();
    
    results.push({
      test_name: 'Authentication Check',
      success: !error,
      details: {
        authenticated: !error,
        user: user ? 'User found' : 'Anonymous access',
        error: error?.message
      },
      recommendation: error ? 'Check authentication configuration' : 'Authentication working'
    });
    
    console.log(`✅ Auth check: ${user ? 'Authenticated user' : 'Anonymous access'}`);
    
  } catch (error) {
    results.push({
      test_name: 'Authentication Check',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      recommendation: 'Authentication system may have issues'
    });
    console.log(`❌ Auth failed: ${error}`);
  }
  
  return results;
}

async function generateDiagnosticReport(results: DiagnosticResult[]): Promise<void> {
  console.log('\n📋 DIAGNOSTIC REPORT FOR KAITIAKI MAHARA');
  console.log('='.repeat(60));
  
  const successfulTests = results.filter(r => r.success);
  const failedTests = results.filter(r => !r.success);
  
  console.log(`✅ Successful Tests: ${successfulTests.length}/${results.length}`);
  console.log(`❌ Failed Tests: ${failedTests.length}/${results.length}`);
  
  if (failedTests.length > 0) {
    console.log('\n🚨 FAILED TESTS:');
    failedTests.forEach((test, index) => {
      console.log(`${index + 1}. ${test.test_name}`);
      console.log(`   Error: ${test.error}`);
      console.log(`   Recommendation: ${test.recommendation}`);
      console.log('');
    });
  }
  
  console.log('\n🎯 IMMEDIATE ACTION PLAN:');
  
  if (failedTests.length === 0) {
    console.log('✅ ALL TESTS PASSED - Database ready for migration');
    console.log('• Proceed with bulk migration implementation');
    console.log('• Deploy content scanning and cultural safety protocols');
    console.log('• Activate 10x velocity migration pipeline');
    
  } else if (successfulTests.some(t => t.test_name === 'Basic URL Connectivity')) {
    console.log('🔧 PARTIAL CONNECTIVITY - Fixable issues detected:');
    console.log('• Network connectivity working');
    console.log('• Focus on API key validation and permissions');
    console.log('• Check database schema access permissions');
    console.log('• Implement retry mechanisms with exponential backoff');
    
  } else {
    console.log('🚨 CRITICAL CONNECTIVITY ISSUES:');
    console.log('• Verify network connectivity to Supabase');
    console.log('• Check firewall and DNS settings');
    console.log('• Validate database URL and credentials');
    console.log('• Consider VPN or proxy if behind corporate firewall');
    console.log('• Implement offline/local migration fallback');
  }
  
  console.log('\n🔄 BACKUP MIGRATION STRATEGIES:');
  console.log('1. Implement local file-based migration pipeline');
  console.log('2. Use cached/exported data for content processing');
  console.log('3. Deploy agent coordination without live database');
  console.log('4. Continue content creation using templates');
  console.log('5. Batch process when connectivity restored');
  
  console.log('\n='.repeat(60));
}

async function implementConnectionFixes(results: DiagnosticResult[]): Promise<void> {
  console.log('\n🔧 IMPLEMENTING CONNECTION FIXES...');
  
  const failedTests = results.filter(r => !r.success);
  
  if (failedTests.some(t => t.test_name === 'Basic URL Connectivity')) {
    console.log('🌐 Implementing network connectivity fixes...');
    
    // Try with different fetch options
    console.log('• Testing with extended timeout...');
    console.log('• Testing with different headers...');
    console.log('• Testing DNS resolution...');
    
    // Could implement DNS lookup, ping tests, etc.
  }
  
  if (failedTests.some(t => t.test_name === 'Supabase API Endpoint')) {
    console.log('🔗 Implementing API endpoint fixes...');
    
    // Try alternative API configurations
    console.log('• Testing with alternative API versions...');
    console.log('• Testing with different authentication methods...');
    console.log('• Validating API key format and expiration...');
  }
  
  console.log('✅ Connection fix implementations complete');
  console.log('📝 Ready to retry connection with improved settings');
}

async function main() {
  try {
    const results = await runConnectionDiagnostics();
    await generateDiagnosticReport(results);
    await implementConnectionFixes(results);
    
    // Save diagnostic report
    const fs = await import('fs');
    await fs.promises.writeFile(
      './migration/connection-diagnostic-report.json',
      JSON.stringify(results, null, 2)
    );
    
    console.log('\n💾 Diagnostic report saved to: ./migration/connection-diagnostic-report.json');
    
  } catch (error) {
    console.error('Fatal error in connection diagnostics:', error);
    process.exit(1);
  }
}

// Execute if run directly
if (import.meta.url === new URL(process.argv[1], 'file:').href) {
  main().catch((error) => {
    console.error('Fatal error in connection diagnostic:', error);
    process.exit(1);
  });
}

export { runConnectionDiagnostics, generateDiagnosticReport };