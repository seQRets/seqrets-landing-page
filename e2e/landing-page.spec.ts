import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('loads and displays hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/seQRets/i);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('waitlist modal opens and accepts input', async ({ page }) => {
    await page.goto('/');
    // Click the first waitlist/CTA button to open the modal
    const waitlistButton = page.locator('button', { hasText: /waitlist|join|notify/i }).first();
    await expect(waitlistButton).toBeVisible();
    await waitlistButton.click();
    // Now the email input should appear in the modal
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible({ timeout: 5000 });
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
      if (msg.type() === 'error') {
        const text = msg.text();
        // Ignore known benign errors (third-party badges, favicon, SVG parse warnings)
        if (text.includes('shields.io') || text.includes('favicon') || text.includes('ERR_BLOCKED_BY_CLIENT') || text.includes('Problem parsing d=') || text.includes('attribute d:')) return;
        errors.push(text);
      }
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
