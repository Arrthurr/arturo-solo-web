import { getOffer, type OfferId } from '@/lib/checkout/offers';

type EnvMap = Record<string, string | undefined>;

export type CheckoutConfig = {
  secretKey: string | null;
  prices: Partial<Record<OfferId, string>>;
  siteUrl: string | null;
  classStartsAt: Date | null;
};

function readPrice(env: EnvMap, offerId: OfferId): string | null {
  switch (offerId) {
    case 'workshop':
      return env.STRIPE_PRICE_WORKSHOP?.trim() || null;
    case 'alumni-assessment':
      return env.STRIPE_PRICE_ALUMNI_ASSESSMENT?.trim() || null;
    default: {
      const _exhaustive: never = offerId;
      return _exhaustive;
    }
  }
}

function parseClassStartsAt(raw: string | undefined): Date | null {
  if (!raw?.trim()) {
    return null;
  }
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function readCheckoutConfig(env: EnvMap = process.env): CheckoutConfig {
  const workshopPrice = readPrice(env, 'workshop');
  const alumniPrice = readPrice(env, 'alumni-assessment');

  return {
    secretKey: env.STRIPE_SECRET_KEY?.trim() || null,
    prices: {
      ...(workshopPrice ? { workshop: workshopPrice } : {}),
      ...(alumniPrice ? { 'alumni-assessment': alumniPrice } : {}),
    },
    siteUrl: (env.SITE_URL?.trim() || env.NEXT_PUBLIC_SITE_URL?.trim() || '').replace(/\/$/, '') || null,
    classStartsAt: parseClassStartsAt(env.WORKSHOP_START_AT),
  };
}

export function missingForOffer(config: CheckoutConfig, offerId: OfferId): string[] {
  const missing: string[] = [];
  if (!config.secretKey) {
    missing.push('STRIPE_SECRET_KEY');
  }
  if (!config.prices[offerId]) {
    missing.push(getOffer(offerId).stripePriceEnv);
  }
  if (!config.siteUrl) {
    missing.push('SITE_URL');
  }
  return missing;
}

export function workshopDateLabel(classStartsAt: Date | null): string {
  if (!classStartsAt) {
    return 'Next session date to be announced';
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'America/Phoenix',
  }).format(classStartsAt);
}
