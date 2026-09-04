import { alumniWindow } from '@/lib/checkout/alumni-eligibility';
import { signAlumniToken } from '@/lib/checkout/alumni-token';
import type { CheckoutConfig } from '@/lib/checkout/config';
import { parseOfferId } from '@/lib/checkout/offers';

export type PaidWorkshopSession = {
  sessionId: string;
  paidAt: Date;
};

export type WorkshopConfirmationState =
  | { status: 'missing-session' }
  | { status: 'unconfigured' }
  | { status: 'unverified' }
  | { status: 'alumni-eligible'; alumniToken: string; expiresAt: Date }
  | { status: 'alumni-expired'; expiresAt: Date };

export function buildWorkshopConfirmation(input: {
  sessionId: string | null;
  paidWorkshop: PaidWorkshopSession | null;
  config: CheckoutConfig;
  now: Date;
}): WorkshopConfirmationState {
  if (!input.config.secretKey) {
    return { status: 'unconfigured' };
  }
  if (!input.sessionId) {
    return { status: 'missing-session' };
  }
  if (!input.paidWorkshop || input.paidWorkshop.sessionId !== input.sessionId) {
    return { status: 'unverified' };
  }

  const window = alumniWindow({
    now: input.now,
    paidAt: input.paidWorkshop.paidAt,
    classStartsAt: input.config.classStartsAt,
  });

  if (window.status === 'expired') {
    return { status: 'alumni-expired', expiresAt: window.expiresAt };
  }

  return {
    status: 'alumni-eligible',
    alumniToken: signAlumniToken({
      sessionId: input.paidWorkshop.sessionId,
      expiresAt: window.expiresAt,
      secret: input.config.secretKey,
    }),
    expiresAt: window.expiresAt,
  };
}

export function paidWorkshopFromStripe(session: {
  id: string;
  payment_status: string | null;
  created: number;
  metadata: Record<string, string> | null;
}): PaidWorkshopSession | null {
  if (session.payment_status !== 'paid') {
    return null;
  }
  if (parseOfferId(session.metadata?.offerId ?? '') !== 'workshop') {
    return null;
  }
  return {
    sessionId: session.id,
    paidAt: new Date(session.created * 1000),
  };
}
