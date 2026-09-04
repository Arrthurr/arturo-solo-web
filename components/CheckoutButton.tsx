'use client';

import { useFormState, useFormStatus } from 'react-dom';
import {
  createCheckoutSession,
  type CheckoutActionState,
} from '@/app/actions/create-checkout-session';
import type { OfferId } from '@/lib/checkout/offers';

const initialState: CheckoutActionState = { status: 'idle' };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? 'Opening checkout...' : label}
    </button>
  );
}

export default function CheckoutButton({
  offerId,
  alumniToken,
  label,
}: {
  offerId: OfferId;
  alumniToken?: string;
  label: string;
}) {
  const [state, formAction] = useFormState(createCheckoutSession, initialState);

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="offerId" value={offerId} />
      {alumniToken ? <input type="hidden" name="alumniToken" value={alumniToken} /> : null}
      <SubmitButton label={label} />
      {state.message ? (
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      ) : null}
    </form>
  );
}
