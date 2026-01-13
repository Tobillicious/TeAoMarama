
import fetch from 'node-fetch';

async function testResourceLoader() {
  console.log('🧪 Starting resource loader test...');

  try {
    // The path must be a full URL for node-fetch to work,
    // simulating how a browser would request it from the dev server.
    const url = 'http://localhost:5173/enhanced-resources-output/batch-1-enhanced.json';
    
    console.log(`Fetching from URL: ${url}`);

    const response = await fetch(url);

    console.log(`Response Status: ${response.status}`);
    console.log(`Response Status Text: ${response.statusText}`);

    if (!response.ok) {
      console.error('❌ Fetch failed!');
      const text = await response.text();
      console.error('Response Body:', text);
      return;
    }

    const data = await response.json();
    console.log('✅ Fetch successful!');
    console.log('Data:', data);
    console.log(`Number of resources in batch: ${data.resources?.length || 0}`);

  } catch (error) {
    console.error('❌ An error occurred during the fetch operation:', error);
  }
}

testResourceLoader();
