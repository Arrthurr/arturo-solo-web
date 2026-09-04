'use server';

import { redirect } from 'next/navigation';
import { readCheckoutConfig } from '@/lib/checkout/config';
import { parseOfferId } from '@/lib/checkout/offers';
import { resolveCheckoutRequest } from '@/lib/checkout/resolve-checkout';
import { createCheckoutSessionUrl, createStripeClient } from '@/lib/checkout/stripe';

export type CheckoutActionState = {
  status: 'idle' | 'unconfigured' | 'ineligible' | 'error' | 'invalid';
  message?: string;
};

export async function createCheckoutSession(
  _prevState: CheckoutActionState,
  formData: FormData,
): Promise<CheckoutActionState> {
  const offerId = parseOfferId(formData.get('offerId')?.toString() ?? '');
  if (!offerId) {
    return {
      status: 'invalid',
      message: 'That checkout option is not available.',
    };
  }

  const config = readCheckoutConfig();
  const resolved = resolveCheckoutRequest({
    offerId,
    alumniToken: formData.get('alumniToken')?.toString() || null,
    config,
    now: new Date(),
  });

  switch (resolved.status) {
    case 'unconfigured':
      return {
        status: 'unconfigured',
        message:
          'Workshop checkout is not configured yet. Email start@arturosolo.com and I will send a payment link.',
      };
    case 'ineligible':
      return {
        status: 'ineligible',
        message: resolved.message,
      };
    case 'ready': {
      if (!config.secretKey || !config.siteUrl) {
        return {
          status: 'unconfigured',
          message:
            'Workshop checkout is not configured yet. Email start@arturosolo.com and I will send a payment link.',
        };
      }

      let url: string | null;
      try {
        url = await createCheckoutSessionUrl({
          stripe: createStripeClient(config.secretKey),
          priceId: resolved.priceId,
          offerId: resolved.offerId,
          successUrl: `${config.siteUrl}${resolved.successPath}?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${config.siteUrl}${resolved.cancelPath}`,
        });
      } catch (error) {
        console.error('Stripe checkout error:', error);
        return {
          status: 'error',
          message: 'Checkout could not start. Email start@arturosolo.com and I will send a payment link.',
        };
      }

      if (!url) {
        return {
          status: 'error',
          message: 'Stripe did not return a checkout URL. Email start@arturosolo.com.',
        };
      }

      redirect(url);
    }
    default: {
      const _exhaustive: never = resolved;
      return _exhaustive;
    }
  }
}
