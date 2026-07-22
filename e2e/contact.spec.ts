import { test, expect } from '@playwright/test';

test.describe('Contact page', () => {
  test('renders warm contact copy and form fields', async ({ page }) => {
    await page.goto('/contact');

    await expect(page.getByRole('heading', { level: 1 })).toContainText('stuck');
    await expect(page.getByLabel('Full Name*')).toBeVisible();
    await expect(page.getByLabel('Email Address*')).toBeVisible();
    await expect(page.getByLabel('Company Name*')).toBeVisible();
    const service = page.getByLabel(/What are you interested in/);
    await expect(service).toBeVisible();
    await expect(
      service.locator('option[value="ai-jumpstart"]'),
    ).toHaveText('Workflow Assessment — $1,500 fixed fee');
    await expect(
      service.locator('option[value="custom-ai-build"]'),
    ).toHaveText('Custom AI Build — scoped implementation');
    await expect(
      service.locator('option[value="not-sure"]'),
    ).toHaveText('Not sure — help me choose the next step');
    await expect(page.getByLabel('Where does the workflow break down?')).toBeVisible();
    await expect(page.getByText(/within one business day/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Send the workflow/i })).toBeVisible();
  });

  test('shows validation errors for empty required fields', async ({ page }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: /Send the workflow/i }).click();
    await expect(page.getByRole('alert').first()).toBeVisible();
  });
});
