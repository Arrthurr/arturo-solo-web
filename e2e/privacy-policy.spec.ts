import { test, expect } from '@playwright/test';

test.describe('Privacy Policy', () => {
  test('returns 200 with Apple-facing disclosures', async ({ page }) => {
    const response = await page.goto('/privacy-policy');
    expect(response?.status()).toBe(200);

    await expect(page.getByRole('heading', { name: 'Privacy Policy', level: 1 })).toBeVisible();
    await expect(page.getByText('Arturo Solo LLC').first()).toBeVisible();
    await expect(page.getByText('apps and products we publish').first()).toBeVisible();
    await expect(page.getByText('same or equal protection')).toBeVisible();
    await expect(page.getByText('revoke consent').first()).toBeVisible();
    await expect(page.getByText('Supabase').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'start@arturosolo.com' }).first()).toBeVisible();
  });
});
