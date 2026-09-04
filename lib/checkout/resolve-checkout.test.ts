import { describe, expect, it } from 'vitest';
import { signAlumniToken } from '@/lib/checkout/alumni-token';
import { resolveCheckoutRequest } from '@/lib/checkout/resolve-checkout';
import type { CheckoutConfig } from '@/lib/checkout/config';

const secret = 'test-alumni-secret';
const expiresAt = new Date('2026-09-12T17:00:00.000Z');
const now = new Date('2026-09-05T12:00:00.000Z');

const readyConfig: CheckoutConfig = {
  secretKey: secret,
  prices: {
    workshop: 'price_workshop_test',
    'alumni-assessment': 'price_alumni_test',
  },
  siteUrl: 'https://arturosolo.com',
  classStartsAt: new Date('2026-09-11T17:00:00.000Z'),
};

describe('resolveCheckoutRequest', () => {
  it('prepares a workshop session when Stripe prices are configured', () => {
    const result = resolveCheckoutRequest({
      offerId: 'workshop',
      alumniToken: null,
      config: readyConfig,
      now,
    });

    expect(result).toEqual({
      status: 'ready',
      offerId: 'workshop',
      priceId: 'price_workshop_test',
      successPath: '/workshop/confirmed',
      cancelPath: '/workshop',
    });
  });

  it('blocks alumni checkout without a valid token', () => {
    const result = resolveCheckoutRequest({
      offerId: 'alumni-assessment',
      alumniToken: null,
      config: readyConfig,
      now,
    });

    expect(result.status).toBe('ineligible');
  });

  it('prepares alumni checkout when the confirmation token is still valid', () => {
    const alumniToken = signAlumniToken({
      sessionId: 'cs_test_workshop',
      expiresAt,
      secret,
    });
    const result = resolveCheckoutRequest({
      offerId: 'alumni-assessment',
      alumniToken,
      config: readyConfig,
      now,
    });

    expect(result).toMatchObject({
      status: 'ready',
      offerId: 'alumni-assessment',
      priceId: 'price_alumni_test',
      successPath: '/workshop/alumni-thanks',
      cancelPath: '/workshop/confirmed',
    });
  });

  it('returns unconfigured instead of inventing a Stripe session', () => {
    const result = resolveCheckoutRequest({
      offerId: 'workshop',
      alumniToken: null,
      config: {
        secretKey: null,
        prices: {},
        siteUrl: null,
        classStartsAt: null,
      },
      now,
    });

    expect(result.status).toBe('unconfigured');
    if (result.status === 'unconfigured') {
      expect(result.missing).toContain('STRIPE_SECRET_KEY');
    }
  });
});
