import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const SITE_URL = 'http://localhost:3001';

async function auditWebsite() {
  console.log('🔍 Starting comprehensive website audit...');
  
  const browser = await puppeteer.launch({ headless: false, devtools: true });
  const page = await browser.newPage();
  
  const audit = {
    timestamp: new Date().toISOString(),
    baseUrl: SITE_URL,
    issues: {
      critical: [],
      high: [],
      medium: [],
      low: []
    },
    pageTests: {},
    performance: {},
    console: []
  };

  // Collect console messages
  page.on('console', message => {
    const type = message.type();
    const text = message.text();
    audit.console.push({ type, text, timestamp: new Date().toISOString() });
    console.log(`📊 Console [${type}]: ${text}`);
  });

  // Collect network failures
  page.on('response', response => {
    if (!response.ok()) {
      audit.issues.high.push({
        type: 'Failed Network Request',
        url: response.url(),
        status: response.status(),
        statusText: response.statusText()
      });
      console.log(`❌ Failed request: ${response.url()} - ${response.status()}`);
    }
  });

  const routes = [
    '/',
    '/about', 
    '/contact',
    '/login',
    '/resources',
    '/working-resources', // This should fail
    '/teacher',
    '/student', 
    '/human-content',
    '/year8-social-studies',
    '/platform', // This should also fail
    '/cultural-learning-modules', // This should fail
    '/advanced-analytics' // This should fail
  ];

  console.log('🧪 Testing routes...');
  
  for (const route of routes) {
    console.log(`\n📍 Testing route: ${route}`);
    try {
      const response = await page.goto(`${SITE_URL}${route}`, { 
        waitUntil: 'networkidle0',
        timeout: 10000
      });
      
      const pageTest = {
        route,
        status: response?.status() || 'unknown',
        timestamp: new Date().toISOString(),
        issues: []
      };

      // Wait for page to fully load
      await page.waitForTimeout(2000);

      // Check for blank content
      const mainContent = await page.$('main');
      const bodyText = await page.$eval('body', el => el.innerText.trim());
      
      if (bodyText.length < 50 || !bodyText.includes('Te Kura o TeAoMarama')) {
        pageTest.issues.push({
          type: 'blank_content',
          severity: 'critical',
          description: 'Page appears to have no content or minimal content'
        });
        audit.issues.critical.push({
          type: 'Blank Page Content',
          route: route,
          description: 'Page has no meaningful content'
        });
      }

      // Check for React errors
      const reactErrors = await page.evaluate(() => {
        return window.__REACT_ERROR__ || null;
      });
      
      if (reactErrors) {
        pageTest.issues.push({
          type: 'react_error',
          severity: 'critical', 
          error: reactErrors
        });
      }

      // Performance metrics
      const performanceMetrics = await page.evaluate(() => {
        const navigation = performance.getEntriesByType('navigation')[0];
        return {
          domContentLoaded: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart || 0,
          loadComplete: navigation?.loadEventEnd - navigation?.loadEventStart || 0
        };
      });
      
      pageTest.performance = performanceMetrics;

      // Check for images that fail to load
      const brokenImages = await page.evaluate(() => {
        const images = document.querySelectorAll('img');
        const broken = [];
        images.forEach(img => {
          if (!img.complete || img.naturalWidth === 0) {
            broken.push(img.src);
          }
        });
        return broken;
      });

      if (brokenImages.length > 0) {
        pageTest.issues.push({
          type: 'broken_images',
          severity: 'medium',
          images: brokenImages
        });
        audit.issues.medium.push({
          type: 'Broken Images',
          route: route,
          images: brokenImages
        });
      }

      audit.pageTests[route] = pageTest;
      console.log(`✅ Route ${route}: Status ${pageTest.status}, Issues: ${pageTest.issues.length}`);
      
    } catch (error) {
      console.log(`❌ Route ${route} failed: ${error.message}`);
      audit.issues.critical.push({
        type: 'Route Navigation Error',
        route: route,
        error: error.message
      });
      
      audit.pageTests[route] = {
        route,
        error: error.message,
        status: 'failed'
      };
    }
  }

  // Test responsive design
  console.log('\n📱 Testing responsive design...');
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 }
  ];

  for (const viewport of viewports) {
    await page.setViewport(viewport);
    await page.goto(SITE_URL, { waitUntil: 'networkidle0' });
    
    const isResponsive = await page.evaluate(() => {
      const nav = document.querySelector('nav');
      const main = document.querySelector('main');
      return {
        navVisible: nav ? window.getComputedStyle(nav).display !== 'none' : false,
        mainVisible: main ? window.getComputedStyle(main).display !== 'none' : false,
        bodyOverflow: document.body.scrollWidth > window.innerWidth
      };
    });

    if (isResponsive.bodyOverflow) {
      audit.issues.medium.push({
        type: 'Responsive Design Issue',
        viewport: viewport.name,
        issue: 'Horizontal scroll detected'
      });
    }
  }

  // Final summary
  const totalIssues = Object.values(audit.issues).reduce((sum, issues) => sum + issues.length, 0);
  console.log(`\n📋 Audit Complete! Found ${totalIssues} total issues:`);
  console.log(`   💥 Critical: ${audit.issues.critical.length}`);
  console.log(`   🔥 High: ${audit.issues.high.length}`);
  console.log(`   ⚠️  Medium: ${audit.issues.medium.length}`);
  console.log(`   ℹ️  Low: ${audit.issues.low.length}`);

  // Save audit report
  const reportPath = './audit-report.json';
  fs.writeFileSync(reportPath, JSON.stringify(audit, null, 2));
  console.log(`\n📄 Full audit report saved to: ${reportPath}`);

  await browser.close();
  return audit;
}

// Run the audit
auditWebsite().catch(console.error);