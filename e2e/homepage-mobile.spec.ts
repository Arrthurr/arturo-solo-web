import { test, expect } from '@playwright/test';

test.describe('Mobile homepage', () => {
  test('renders builder positioning on a small viewport', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Working AI');
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI Jumpstart' })).toBeVisible();
  });
});
