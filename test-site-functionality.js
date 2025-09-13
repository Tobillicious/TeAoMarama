// Test script to verify site functionality
const puppeteer = require('puppeteer');

async function testSiteFunctionality() {
  console.log('🧪 Testing site functionality...');

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    // Test main page load
    console.log('📄 Testing main page load...');
    await page.goto('http://localhost:3001/', { waitUntil: 'networkidle0' });

    // Check if page loads
    const title = await page.title();
    console.log(`✅ Page loaded: ${title}`);

    // Test resource browser
    console.log('📚 Testing resource browser...');
    await page.goto('http://localhost:3001/resources', { waitUntil: 'networkidle0' });

    // Check for resources
    const resourceCount = await page.evaluate(() => {
      const resources = document.querySelectorAll('[data-testid="resource-item"]');
      return resources.length;
    });

    console.log(`✅ Found ${resourceCount} resources`);

    // Test search functionality
    console.log('🔍 Testing search functionality...');
    await page.goto('http://localhost:3001/search', { waitUntil: 'networkidle0' });

    const searchInput = await page.$('input[type="search"], input[placeholder*="search" i]');
    if (searchInput) {
      await searchInput.type('Māori');
      console.log('✅ Search input working');
    } else {
      console.log('⚠️ Search input not found');
    }

    console.log('🎉 Site functionality test complete!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    await browser.close();
  }
}

// Run test if called directly
if (require.main === module) {
  testSiteFunctionality();
}

module.exports = { testSiteFunctionality };
