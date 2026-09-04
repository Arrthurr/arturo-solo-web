import { describe, expect, it } from 'vitest';
import { missingForOffer, readCheckoutConfig, workshopDateLabel } from '@/lib/checkout/config';

describe('readCheckoutConfig', () => {
  it('records missing Stripe and site values without inventing them', () => {
    const config = readCheckoutConfig({});
    expect(config.secretKey).toBeNull();
    expect(config.prices).toEqual({});
    expect(missingForOffer(config, 'workshop')).toEqual([
      'STRIPE_SECRET_KEY',
      'STRIPE_PRICE_WORKSHOP',
      'SITE_URL',
    ]);
    expect(missingForOffer(config, 'alumni-assessment')).toEqual([
      'STRIPE_SECRET_KEY',
      'STRIPE_PRICE_ALUMNI_ASSESSMENT',
      'SITE_URL',
    ]);
  });

  it('lets workshop checkout start when only the workshop price is present', () => {
    const config = readCheckoutConfig({
      STRIPE_SECRET_KEY: 'sk_test_123',
      STRIPE_PRICE_WORKSHOP: 'price_workshop',
      SITE_URL: 'https://arturosolo.com/',
      WORKSHOP_START_AT: '2026-09-11T17:00:00.000Z',
    });

    expect(config).toMatchObject({
      secretKey: 'sk_test_123',
      prices: { workshop: 'price_workshop' },
      siteUrl: 'https://arturosolo.com',
    });
    expect(missingForOffer(config, 'workshop')).toEqual([]);
    expect(missingForOffer(config, 'alumni-assessment')).toEqual([
      'STRIPE_PRICE_ALUMNI_ASSESSMENT',
    ]);
    expect(config.classStartsAt?.toISOString()).toBe('2026-09-11T17:00:00.000Z');
  });
});

describe('workshopDateLabel', () => {
  it('uses a placeholder when the class date is unset', () => {
    expect(workshopDateLabel(null)).toBe('Next session date to be announced');
  });
});
