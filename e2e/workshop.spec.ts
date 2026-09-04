import { test, expect } from '@playwright/test';

test.describe('Workshop', () => {
  test('sells the $97 filter workshop without alumni or build prices', async ({ page }) => {
    await page.goto('/workshop');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('Decide Before You Build');
    await expect(page.getByText('$97').first()).toBeVisible();
    await expect(page.getByText(/90 minutes/i).first()).toBeVisible();
    await expect(page.getByText(/Virtual/i).first()).toBeVisible();
    await expect(page.getByText(/Bring one broken case/i)).toBeVisible();
    await expect(page.getByText(/Leave with Six Paths scored/i)).toBeVisible();
    await expect(page.getByText(/not an AI tools tour/i)).toBeVisible();
    await expect(page.getByText(/A build, Sprint, or implementation/i)).toBeVisible();
    await expect(page.getByText(/A monthly retainer/i)).toBeVisible();
    await expect(page.getByText(/A tool list or AI tools tour/i)).toBeVisible();
    await expect(page.getByRole('button', { name: 'Join the $97 workshop' })).toBeVisible();
    await expect(page.getByText('$1,200')).toHaveCount(0);
    await expect(page.getByText(/\$3,000/)).toHaveCount(0);
    await expect(page.getByText(/\$4,500/)).toHaveCount(0);
    await expect(page.getByText(/early-bird/i)).toHaveCount(0);
  });

  test('workshop checkout explains missing Stripe instead of crashing', async ({ page }) => {
    await page.goto('/workshop');
    await page.getByRole('button', { name: 'Join the $97 workshop' }).click();
    await expect(page.getByRole('alert')).toContainText(/not configured/i);
  });

  test('confirmation without a session hides the alumni price', async ({ page }) => {
    await page.goto('/workshop/confirmed');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('See you at the workshop');
    await expect(page.getByRole('button', { name: /Add Assessment/i })).toHaveCount(0);
    await expect(page.getByText('$1,200')).toHaveCount(0);
  });
});
