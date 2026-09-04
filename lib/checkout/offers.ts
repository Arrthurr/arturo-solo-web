export const OFFER_IDS = ['workshop', 'alumni-assessment'] as const;

export type OfferId = (typeof OFFER_IDS)[number];

export type Offer = {
  id: OfferId;
  name: string;
  amountCents: number;
  stripePriceEnv: 'STRIPE_PRICE_WORKSHOP' | 'STRIPE_PRICE_ALUMNI_ASSESSMENT';
  successPath: '/workshop/confirmed' | '/workshop/alumni-thanks';
};

export const OFFERS: Record<OfferId, Offer> = {
  workshop: {
    id: 'workshop',
    name: 'Decide Before You Build',
    amountCents: 9700,
    stripePriceEnv: 'STRIPE_PRICE_WORKSHOP',
    successPath: '/workshop/confirmed',
  },
  'alumni-assessment': {
    id: 'alumni-assessment',
    name: 'Workflow Assessment (workshop alumni)',
    amountCents: 120_000,
    stripePriceEnv: 'STRIPE_PRICE_ALUMNI_ASSESSMENT',
    successPath: '/workshop/alumni-thanks',
  },
};

export function parseOfferId(raw: string): OfferId | null {
  return OFFER_IDS.find((id) => id === raw) ?? null;
}

export function getOffer(id: OfferId): Offer {
  return OFFERS[id];
}
