import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders workflow-first positioning and distinct services', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'When the work no longer fits the tools',
    );

    const services = page.locator('#services');
    await expect(
      services.getByRole('heading', { name: 'Workflow Assessment' }),
    ).toBeVisible();
    await expect(
      services.getByRole('heading', { name: 'Custom AI Build' }),
    ).toBeVisible();
    await expect(services.getByText('$1,500 fixed fee', { exact: false })).toBeVisible();
    await expect(services.getByText(/seven business days/i)).toBeVisible();
    await expect(services.getByText(/starts after payment and kickoff/i)).toBeVisible();
    await expect(services.getByText(/Implementation Brief/i)).toBeVisible();
    await expect(
      services.getByText(/does not include a prototype or production implementation/i),
    ).toBeVisible();
    await expect(
      services.getByText(/Simplify · Buy · Automate · Build · Investigate · Defer/i),
    ).toBeVisible();
    await expect(services.getByText(/equivalent discovery/i)).toBeVisible();
    await expect(page.getByText('AI Jumpstart', { exact: true })).toHaveCount(0);

    await expect(page.getByAltText('DMDL')).toBeVisible();
    await expect(page.getByAltText('Joy for Books')).toBeVisible();
    await expect(page.getByAltText('HG Jones Associates')).toHaveCount(0);
    await expect(page.getByAltText('Texas Head Start Association')).toHaveCount(0);
    await expect(page.getByText('Why Arturo')).toBeVisible();

    const founderPhoto = page.locator('#team').locator('img');
    await expect(founderPhoto).toBeVisible();
    await expect(founderPhoto).toHaveAttribute(
      'srcset',
      /arthur-turnbull@2x\.jpg 2x/,
    );
    await expect(
      page.locator('#team').getByText('Arthur Turnbull', { exact: true }),
    ).toBeVisible();
    await expect(
      page.locator('#team').getByText('AT', { exact: true }),
    ).toHaveCount(0);
  });
});
