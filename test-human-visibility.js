#!/usr/bin/env node

import http from 'http';

const baseUrl = 'http://localhost:3001';

async function testHumanVisibility() {
  console.log('🔍 TESTING HUMAN-VISIBLE CONTENT');
  console.log('================================');
  
  const tests = [
    { path: '/', name: 'Homepage', expectedContent: ['Te Ao', 'Mārama', 'Join Now'] },
    { path: '/join', name: 'Join Page', expectedContent: ['Personal Information', 'Create Account'] },
    { path: '/resources', name: 'Resources', expectedContent: ['Resources', 'Browse'] }
  ];
  
  let passed = 0;
  
  for (const test of tests) {
    console.log(`\n📄 Testing ${test.name}...`);
    
    try {
      const content = await fetchPage(test.path);
      
      if (content.includes('<!DOCTYPE html>')) {
        console.log(`   ✅ ${test.name}: HTML loaded (${content.length} bytes)`);
        
        // Check for expected content
        const foundContent = test.expectedContent.filter(expected => 
          content.toLowerCase().includes(expected.toLowerCase())
        );
        
        if (foundContent.length > 0) {
          console.log(`   🎯 Found content: ${foundContent.join(', ')}`);
          passed++;
        } else {
          console.log(`   ⚠️  Expected content not found: ${test.expectedContent.join(', ')}`);
        }
      } else {
        console.log(`   ❌ ${test.name}: No HTML content`);
      }
    } catch (error) {
      console.log(`   ❌ ${test.name}: Error - ${error.message}`);
    }
  }
  
  console.log('\n📊 HUMAN VISIBILITY RESULTS');
  console.log('============================');
  console.log(`✅ Working pages: ${passed}/${tests.length}`);
  
  if (passed === tests.length) {
    console.log('\n🎉 ALL PAGES WORKING FOR HUMANS!');
    console.log('🌐 Visit http://localhost:3001 to see the site');
    console.log('🚀 Visit http://localhost:3001/join to test onboarding');
  } else {
    console.log('\n⚠️  Some pages need attention');
  }
}

function fetchPage(path) {
  return new Promise((resolve, reject) => {
    const url = `${baseUrl}${path}`;
    const request = http.get(url, (response) => {
      let data = '';
      
      response.on('data', (chunk) => {
        data += chunk;
      });
      
      response.on('end', () => {
        if (response.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${response.statusCode}`));
        }
      });
    });
    
    request.on('error', (error) => {
      reject(error);
    });
    
    request.setTimeout(5000, () => {
      request.destroy();
      reject(new Error('Timeout'));
    });
  });
}

testHumanVisibility();
