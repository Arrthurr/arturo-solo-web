import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders builder positioning language', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Working AI');
    await expect(page.getByText('In your business')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'AI Jumpstart' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Custom AI Build' })).toBeVisible();
    await expect(page.getByText('Why Arturo')).toBeVisible();

    const founderPhoto = page.getByAltText('Arthur Turnbull');
    await expect(founderPhoto).toBeVisible();
    await expect(founderPhoto).toHaveAttribute(
      'srcset',
      /arthur-turnbull@2x\.jpg 2x/,
    );
    await expect(
      page.locator('#team').getByText('Arthur Turnbull', { exact: true }),
    ).toBeVisible();
    await expect(page.getByText('AT', { exact: true })).toHaveCount(0);
  });
});
