import 'server-only';

import Stripe from 'stripe';

export function createStripeClient(secretKey: string): Stripe {
  return new Stripe(secretKey);
}

export async function retrieveCheckoutSession(stripe: Stripe, sessionId: string) {
  return stripe.checkout.sessions.retrieve(sessionId);
}

export async function createCheckoutSessionUrl(input: {
  stripe: Stripe;
  priceId: string;
  offerId: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<string | null> {
  const session = await input.stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{ price: input.priceId, quantity: 1 }],
    success_url: input.successUrl,
    cancel_url: input.cancelUrl,
    metadata: { offerId: input.offerId },
  });

  return session.url;
}
