import { describe, expect, it } from 'vitest';
import { verifyAlumniToken } from '@/lib/checkout/alumni-token';
import {
  buildWorkshopConfirmation,
  paidWorkshopFromStripe,
} from '@/lib/checkout/workshop-confirmation';
import type { CheckoutConfig } from '@/lib/checkout/config';

const readyConfig: CheckoutConfig = {
  secretKey: 'test-alumni-secret',
  prices: {
    workshop: 'price_workshop_test',
    'alumni-assessment': 'price_alumni_test',
  },
  siteUrl: 'https://arturosolo.com',
  classStartsAt: new Date('2026-09-11T17:00:00.000Z'),
};

describe('buildWorkshopConfirmation', () => {
  it('hides the alumni price when the workshop payment is not verified', () => {
    expect(
      buildWorkshopConfirmation({
        sessionId: null,
        paidWorkshop: null,
        config: readyConfig,
        now: new Date('2026-09-05T12:00:00.000Z'),
      }).status,
    ).toBe('missing-session');

    expect(
      buildWorkshopConfirmation({
        sessionId: 'cs_test_workshop',
        paidWorkshop: null,
        config: readyConfig,
        now: new Date('2026-09-05T12:00:00.000Z'),
      }).status,
    ).toBe('unverified');
  });

  it('issues an alumni token only after a paid workshop session', () => {
    const result = buildWorkshopConfirmation({
      sessionId: 'cs_test_workshop',
      paidWorkshop: {
        sessionId: 'cs_test_workshop',
        paidAt: new Date('2026-09-04T16:00:00.000Z'),
      },
      config: readyConfig,
      now: new Date('2026-09-05T12:00:00.000Z'),
    });

    expect(result.status).toBe('alumni-eligible');
    if (result.status === 'alumni-eligible') {
      expect(
        verifyAlumniToken(result.alumniToken, 'test-alumni-secret', new Date('2026-09-05T12:00:00.000Z')),
      ).toMatchObject({ sessionId: 'cs_test_workshop' });
    }
  });
});

describe('paidWorkshopFromStripe', () => {
  it('accepts only a paid workshop Checkout Session', () => {
    expect(
      paidWorkshopFromStripe({
        id: 'cs_test_workshop',
        payment_status: 'paid',
        created: 1_757_000_000,
        metadata: { offerId: 'workshop' },
      }),
    ).toEqual({
      sessionId: 'cs_test_workshop',
      paidAt: new Date(1_757_000_000 * 1000),
    });

    expect(
      paidWorkshopFromStripe({
        id: 'cs_test_other',
        payment_status: 'paid',
        created: 1_757_000_000,
        metadata: { offerId: 'alumni-assessment' },
      }),
    ).toBeNull();
  });
});
