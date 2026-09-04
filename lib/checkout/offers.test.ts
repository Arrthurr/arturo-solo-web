import { describe, expect, it } from 'vitest';
import { getOffer, OFFER_IDS, parseOfferId } from '@/lib/checkout/offers';

describe('offer catalog', () => {
  it('prices the public workshop at $97 and alumni Assessment at $1,200', () => {
    expect(getOffer('workshop').amountCents).toBe(9700);
    expect(getOffer('alumni-assessment').amountCents).toBe(120_000);
  });

  it('does not publish Sprint, Build, Partner, or retainer prices', () => {
    expect(OFFER_IDS).toEqual(['workshop', 'alumni-assessment']);
    for (const id of OFFER_IDS) {
      expect(getOffer(id).amountCents).not.toBe(300_000);
      expect(getOffer(id).amountCents).not.toBe(450_000);
    }
  });

  it('sends workshop payers to the alumni confirmation page', () => {
    expect(getOffer('workshop').successPath).toBe('/workshop/confirmed');
    expect(getOffer('alumni-assessment').successPath).toBe('/workshop/alumni-thanks');
  });

  it('rejects unknown offer ids at the boundary', () => {
    expect(parseOfferId('workshop')).toBe('workshop');
    expect(parseOfferId('alumni-assessment')).toBe('alumni-assessment');
    expect(parseOfferId('assessment')).toBeNull();
    expect(parseOfferId('sprint')).toBeNull();
  });
});
