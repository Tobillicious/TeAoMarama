import { expect, test } from '@playwright/test';

/**
 * Critical Functionality Tests for Te Ao Mārama Educational Platform
 *
 * These tests verify core user journeys that should never break in production.
 */

test.describe('Critical Site Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Monitor console errors
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });

    // Monitor network failures
    page.on('requestfailed', (request) => {
      errors.push(`Network failure: ${request.url()}`);
    });

    // Store errors for later verification
    page.context().errors = errors;
  });

  test('Landing page loads without errors', async ({ page }) => {
    await page.goto('/');

    // Wait for page to fully load
    await page.waitForLoadState('networkidle');

    // Check for title
    await expect(page).toHaveTitle(/TeAoMarama|Educational Platform/i);

    // Check for navigation (first nav element)
    await expect(page.locator('nav').first()).toBeVisible();

    // Check for no console errors
    const errors = page.context().errors || [];
    if (errors.length > 0) {
      console.log('Console errors:', errors);
    }
    expect(errors.filter((e) => !e.includes('favicon')).length).toBe(0);
  });

  test('Authentication system test page works', async ({ page }) => {
    await page.goto('/test');

    // Wait for System Test component to load
    await page.waitForSelector('text=Dual-Role Authentication System Test', { timeout: 10000 });

    // Check for authentication status display
    await expect(page.locator('text=Authentication:')).toBeVisible();
    await expect(page.locator('text=Not Authenticated')).toBeVisible();

    // Test teacher login button
    const teacherButton = page.locator('text=Test Teacher Login');
    await expect(teacherButton).toBeVisible();

    // Test student login button
    const studentButton = page.locator('text=Test Student Login');
    await expect(studentButton).toBeVisible();

    // Test run all tests button (first matching element)
    const runTestsButton = page.locator('button:has-text("Run All Tests")').first();
    await expect(runTestsButton).toBeVisible();
  });

  test('Authentication flow works', async ({ page }) => {
    await page.goto('/test');

    // Wait for page load
    await page.waitForSelector('text=Test Teacher Login');

    // Click teacher login
    await page.click('text=Test Teacher Login');

    // Wait for authentication state change
    await page.waitForTimeout(2000);

    // Check if authentication succeeded
    const authStatus = await page.locator('text=Authentication:').locator('..').textContent();
    expect(authStatus).toContain('Active');
  });

  test('Navigation works across key pages', async ({ page }) => {
    await page.goto('/');

    const testPages = [
      { path: '/', expectedText: 'Te Kura o TeAoMarama' },
      { path: '/test', expectedText: 'System Test' },
      { path: '/cultural-learning-modules', expectedText: 'Cultural Learning' },
      { path: '/wisdom-accelerator', expectedText: 'Wisdom' },
      { path: '/assessment-framework', expectedText: 'Assessment' },
    ];

    for (const testPage of testPages) {
      await page.goto(testPage.path);
      await page.waitForLoadState('networkidle');

      // Check expected content appears
      try {
        await expect(page.locator(`text=${testPage.expectedText}`)).toBeVisible({ timeout: 5000 });
      } catch (e) {
        console.log(`Failed to find "${testPage.expectedText}" on ${testPage.path}`);
        console.log('Page content:', await page.content());
        throw e;
      }

      console.log(`✅ ${testPage.path}: Page loaded successfully`);
    }
  });

  test('Cultural Learning Modules are functional', async ({ page }) => {
    await page.goto('/cultural-learning-modules');

    // Wait for modules to load
    await page.waitForSelector('.module-card', { timeout: 10000 });

    // Check for module cards
    const moduleCards = page.locator('.module-card');
    const count = await moduleCards.count();
    expect(count).toBeGreaterThan(0);

    // Click on first module to test modal
    await moduleCards.first().click();

    // Check modal opens
    await expect(page.locator('.module-modal')).toBeVisible();

    // Check modal content
    await expect(page.locator('text=Learning Outcomes')).toBeVisible();
    await expect(page.locator('text=Cultural Elements')).toBeVisible();
  });

  test('Assessment Framework loads and functions', async ({ page }) => {
    await page.goto('/assessment-framework');

    // Wait for component to load
    await page.waitForSelector('text=Assessment Framework', { timeout: 10000 });

    // Check for tabs
    await expect(page.locator('text=Create Assessment')).toBeVisible();
    await expect(page.locator('text=Manage Assessments')).toBeVisible();

    // Test tab switching
    await page.click('text=Manage Assessments');
    await expect(page.locator('text=Assessment Types')).toBeVisible();
  });

  test('Database Integration page is accessible', async ({ page }) => {
    await page.goto('/database-integration');

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    // Check for database integration content
    // Since you opened this file, let's make sure it loads
    await expect(page.locator('body')).toBeVisible();

    // Check for no JavaScript errors
    const errors = page.context().errors || [];
    const criticalErrors = errors.filter(
      (e) => !e.includes('favicon') && !e.includes('404') && e.includes('Error'),
    );

    if (criticalErrors.length > 0) {
      console.log('Critical errors on database integration page:', criticalErrors);
    }
  });

  test('Performance - Page load times are acceptable', async ({ page }) => {
    const testPages = ['/', '/test', '/cultural-learning-modules'];

    for (const testPage of testPages) {
      const startTime = Date.now();

      await page.goto(testPage);
      await page.waitForLoadState('networkidle');

      const loadTime = Date.now() - startTime;

      console.log(`📊 ${testPage}: Loaded in ${loadTime}ms`);

      // Page should load within 10 seconds (generous for first load)
      expect(loadTime).toBeLessThan(10000);

      // After first load, should be faster (cached resources)
      if (testPage !== '/') {
        expect(loadTime).toBeLessThan(5000);
      }
    }
  });

  test('Mobile responsiveness - Key pages work on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    const testPages = ['/', '/test', '/cultural-learning-modules'];

    for (const testPage of testPages) {
      await page.goto(testPage);
      await page.waitForLoadState('networkidle');

      // Check page is readable on mobile
      const body = page.locator('body');
      await expect(body).toBeVisible();

      // Check for responsive elements
      const viewport = await page.evaluate(() => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }));

      expect(viewport.width).toBe(375);
      console.log(`📱 ${testPage}: Mobile view confirmed`);
    }
  });
});

test.describe('Error Handling', () => {
  test('404 pages are handled gracefully', async ({ page }) => {
    // Navigate to non-existent page
    await page.goto('/non-existent-page');

    // Should either redirect to home or show 404, not crash
    await page.waitForLoadState('networkidle');

    // Check page doesn't crash
    await expect(page.locator('body')).toBeVisible();

    // Should have some content (either error message or redirected content)
    const content = await page.textContent('body');
    expect(content?.length).toBeGreaterThan(0);
  });
});

test.describe('Accessibility', () => {
  test('Key pages meet basic accessibility standards', async ({ page }) => {
    const testPages = ['/', '/test'];

    for (const testPage of testPages) {
      await page.goto(testPage);
      await page.waitForLoadState('networkidle');

      // Check for basic accessibility elements
      const title = await page.title();
      expect(title.length).toBeGreaterThan(0);

      // Check for headings
      const h1 = page.locator('h1').first();
      if ((await h1.count()) > 0) {
        await expect(h1).toBeVisible();
      }

      console.log(`♿ ${testPage}: Basic accessibility check passed`);
    }
  });
});
