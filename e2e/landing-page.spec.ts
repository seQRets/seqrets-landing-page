import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('loads and displays hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/seQRets/i);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('waitlist form is visible and accepts input', async ({ page }) => {
    await page.goto('/');
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
    await emailInput.fill('test@example.com');
    await expect(emailInput).toHaveValue('test@example.com');
  });

  test('navigation links are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
  });

  test('page has no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});

test.describe('Security Headers (production)', () => {
  test('returns expected security headers', async ({ request }) => {
    const response = await request.get('https://seqrets.app');
    const headers = response.headers();

    // These should be set by Cloudflare
    expect(headers['x-content-type-options']).toBe('nosniff');
    expect(headers['x-frame-options']).toBeDefined();
  });
});
