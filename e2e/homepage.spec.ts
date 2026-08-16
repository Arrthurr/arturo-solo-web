import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('renders a single Workflow Assessment offer', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      'When your workflow no longer fits the work',
    );
    await expect(
      page.getByText(/Let.?s reconstruct how the work actually moves/i),
    ).toBeVisible();
    await expect(
      page.getByText(/simplify, buy, automate, build, investigate, or defer/i),
    ).toBeVisible();
    await expect(page.getByText(/build with AI/i)).toHaveCount(0);
    await expect(page.getByText('Bring me a bottleneck', { exact: true })).toHaveCount(0);
    await expect(page.getByText(/Start with a recent example/i)).toHaveCount(0);
    await expect(
      page.getByText(/Reconstruct the work first\. AI is a technique/i),
    ).toHaveCount(0);
    await expect(
      page.getByRole('img', {
        name: /Scattered work inputs consolidating into a clear ordered workflow path/i,
      }),
    ).toBeVisible();

    const services = page.locator('#services');
    await expect(
      services.getByRole('heading', { name: 'Workflow Assessment' }),
    ).toBeVisible();
    await expect(
      services.getByRole('heading', { name: 'Custom AI Build' }),
    ).toHaveCount(0);
    await expect(services.getByText('$1,500 fixed fee', { exact: false })).toBeVisible();
    await expect(services.getByText(/seven business days/i)).toBeVisible();
    await expect(services.getByText(/one consequential workflow/i)).toBeVisible();
    await expect(services.getByText(/starts after payment and kickoff/i)).toBeVisible();
    await expect(services.getByText(/Implementation Brief/i)).toBeVisible();
    await expect(
      services.getByText(/does not include a prototype or production implementation/i),
    ).toBeVisible();
    await expect(
      services.getByText(/not a deposit on a future build/i),
    ).toBeVisible();
    await expect(
      services.getByText(/Simplify · Buy · Automate · Build · Investigate · Defer/i),
    ).toBeVisible();
    await expect(services.getByText(/Two distinct engagements/i)).toHaveCount(0);
    await expect(services.getByText(/Build when necessary/i)).toHaveCount(0);
    await expect(services.getByText(/Discuss a scoped build/i)).toHaveCount(0);
    await expect(services.getByText(/See if the assessment fits/i)).toHaveCount(0);
    await expect(services.getByText(/equivalent discovery/i)).toHaveCount(0);
    await expect(services.getByText(/built to hand off/i)).toHaveCount(0);
    await expect(services.getByText(/wear many hats/i)).toBeVisible();
    await expect(
      services.getByRole('link', {
        name: /Bring one stuck workflow\. \$1,500\. Seven days\. A decision\./i,
      }),
    ).toHaveAttribute('href', '/contact');
    await expect(
      page.locator('#team').getByText(/Leave capability, not dependency/i),
    ).toBeVisible();
    await expect(
      page.locator('#team').getByText(/map the work/i),
    ).toBeVisible();
    await expect(
      page.locator('#team').getByText(/No predetermined AI or custom-build pitch/i),
    ).toBeVisible();
    await expect(page.getByText('AI Jumpstart', { exact: true })).toHaveCount(0);
    await expect(page.getByText(/AI consultancy/i)).toHaveCount(0);

    await expect(page.getByAltText('DMDL')).toBeVisible();
    await expect(page.getByAltText('Joy for Books')).toBeVisible();
    await expect(
      page.getByText(/what happened after a decision/i),
    ).toBeVisible();
    await expect(
      page.getByText(/not a catalog of builds for sale/i),
    ).toBeVisible();
    await expect(
      page.getByText('Client contexts', { exact: true }).first(),
    ).toBeVisible();
    await expect(page.getByText('What looked true').first()).toBeVisible();
    await expect(page.getByText('What discovery found').first()).toBeVisible();
    await expect(page.getByText(/Client workflow · beta/i)).toBeVisible();
    await expect(page.getByText(/Google Form/i)).toBeVisible();
    await expect(page.getByText(/Expo\/React Native/i)).toBeVisible();
    await expect(page.getByText(/external workforce/i)).toBeVisible();
    await expect(page.getByText(/Book inventory/i)).toBeVisible();
    await expect(page.getByText(/Active development/i)).toBeVisible();
    await expect(
      page.getByRole('link', {
        name: /Bring a recent example of where the work breaks/i,
      }),
    ).toHaveAttribute('href', '/contact');
    await expect(
      page.getByText(/A concrete stuck workflow—not a feature list or predetermined tool/i),
    ).toBeVisible();
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
