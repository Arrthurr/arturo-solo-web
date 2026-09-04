import { verifyAlumniToken } from '@/lib/checkout/alumni-token';
import { missingForOffer, type CheckoutConfig } from '@/lib/checkout/config';
import { getOffer, type OfferId } from '@/lib/checkout/offers';

export type CheckoutRequestResult =
  | {
      status: 'ready';
      offerId: OfferId;
      priceId: string;
      successPath: '/workshop/confirmed' | '/workshop/alumni-thanks';
      cancelPath: '/workshop' | '/workshop/confirmed';
    }
  | {
      status: 'unconfigured';
      missing: string[];
    }
  | {
      status: 'ineligible';
      message: string;
    };

export function resolveCheckoutRequest(input: {
  offerId: OfferId;
  alumniToken: string | null;
  config: CheckoutConfig;
  now: Date;
}): CheckoutRequestResult {
  const missing = missingForOffer(input.config, input.offerId);
  if (missing.length > 0) {
    return { status: 'unconfigured', missing };
  }

  const offer = getOffer(input.offerId);
  const priceId = input.config.prices[input.offerId];
  const secretKey = input.config.secretKey;
  if (!priceId || !secretKey) {
    return { status: 'unconfigured', missing: missingForOffer(input.config, input.offerId) };
  }

  switch (input.offerId) {
    case 'workshop':
      return {
        status: 'ready',
        offerId: 'workshop',
        priceId,
        successPath: offer.successPath,
        cancelPath: '/workshop',
      };
    case 'alumni-assessment': {
      if (!input.alumniToken) {
        return {
          status: 'ineligible',
          message: 'The $1,200 Assessment is only available after workshop payment, and only until 24 hours after class.',
        };
      }
      const verified = verifyAlumniToken(input.alumniToken, secretKey, input.now);
      if (!verified) {
        return {
          status: 'ineligible',
          message: 'The alumni Assessment window has closed, or this confirmation link is no longer valid.',
        };
      }
      return {
        status: 'ready',
        offerId: 'alumni-assessment',
        priceId,
        successPath: offer.successPath,
        cancelPath: '/workshop/confirmed',
      };
    }
    default: {
      const _exhaustive: never = input.offerId;
      return _exhaustive;
    }
  }
}
