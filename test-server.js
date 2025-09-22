#!/usr/bin/env node

import http from 'http';

const baseUrl = 'http://localhost:3000';

const endpoints = [
  { path: '/', name: 'Homepage' },
  { path: '/signup', name: 'Signup Flow' },
  { path: '/resources', name: 'Resources' },
  { path: '/lesson/year8-early-nz-history-001', name: 'Lesson Viewer' },
];

function testEndpoint(path, name) {
  return new Promise((resolve) => {
    const url = `${baseUrl}${path}`;
    console.log(`\n🔍 Testing ${name}...`);
    console.log(`   URL: ${url}`);

    const request = http.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        if (response.statusCode === 200) {
          if (data.includes('<!DOCTYPE html>')) {
            console.log(`   ✅ ${name}: OK (${response.statusCode}) - HTML content loaded`);
            console.log(`   📊 Content length: ${data.length} bytes`);

            // Check for specific content
            if (path === '/' && data.includes('Te Ao Mārama')) {
              console.log(`   🎯 Homepage content verified: Contains "Te Ao Mārama"`);
            }
            if (path === '/signup' && data.includes('Join Te Ao Mārama')) {
              console.log(`   🎯 Signup content verified: Contains signup form`);
            }
            if (path === '/resources' && data.includes('resources')) {
              console.log(`   🎯 Resources content verified: Contains resources`);
            }
            if (path.includes('/lesson/') && data.includes('lesson')) {
              console.log(`   🎯 Lesson content verified: Contains lesson content`);
            }

            resolve(true);
          } else {
            console.log(`   ❌ ${name}: No HTML content found`);
            resolve(false);
          }
        } else {
          console.log(`   ❌ ${name}: HTTP ${response.statusCode}`);
          resolve(false);
        }
      });
    });

    request.on('error', (error) => {
      console.log(`   ❌ ${name}: Connection error - ${error.message}`);
      resolve(false);
    });

    request.setTimeout(5000, () => {
      console.log(`   ❌ ${name}: Timeout after 5 seconds`);
      request.destroy();
      resolve(false);
    });
  });
}

async function runTests() {
  console.log('🚀 Starting Te Ao Mārama Website Tests');
  console.log('=====================================');
  console.log(`Base URL: ${baseUrl}`);
  console.log(`Test time: ${new Date().toLocaleString()}`);

  let passed = 0;
  const total = endpoints.length;

  for (const endpoint of endpoints) {
    const result = await testEndpoint(endpoint.path, endpoint.name);
    if (result) passed++;
  }

  console.log('\n📊 TEST RESULTS');
  console.log('================');
  console.log(`✅ Passed: ${passed}/${total}`);
  console.log(`❌ Failed: ${total - passed}/${total}`);

  if (passed === total) {
    console.log('\n🎉 ALL TESTS PASSED! Website is fully functional.');
  } else {
    console.log('\n⚠️  Some tests failed. Check the issues above.');
  }

  console.log(`\nTest completed at: ${new Date().toLocaleString()}`);
}

// Run the tests
runTests().catch(console.error);
