import Link from 'next/link';
import CheckoutButton from '@/components/CheckoutButton';
import type { WorkshopConfirmationState } from '@/lib/checkout/workshop-confirmation';

export default function WorkshopConfirmation({
  state,
}: {
  state: WorkshopConfirmationState;
}) {
  const showAlumniUpsell = state.status === 'alumni-eligible';

  return (
    <section className="section-padding">
      <div className="container mx-auto max-w-2xl">
        <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
          You&apos;re in
        </p>
        <h1 className="heading-lg mb-8">See you at the workshop.</h1>
        <p className="text-xl text-gray-600 mb-8 font-display">
          I&apos;ll send the virtual join details to the email you used at checkout. Bring one
          broken case. We will score it on the Six Paths.
        </p>

        {state.status === 'unconfigured' ? (
          <p className="mb-8 text-sm text-gray-600" role="status">
            If you already paid, email start@arturosolo.com with your receipt. Checkout
            verification is not configured in this environment.
          </p>
        ) : null}

        {state.status === 'missing-session' || state.status === 'unverified' ? (
          <p className="mb-8 text-sm text-gray-600" role="status">
            If you just paid, use the confirmation link from Stripe. I can also confirm from a
            receipt at start@arturosolo.com.
          </p>
        ) : null}

        {state.status === 'alumni-expired' ? (
          <p className="mb-8 text-sm text-gray-600" role="status">
            The alumni Assessment price closed 24 hours after class. Public Assessment remains
            $1,500.
          </p>
        ) : null}

        {showAlumniUpsell ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Apply the filter to your operation</h2>
            <p className="text-gray-600 mb-6 font-display">
              The workshop teaches the filter. The Assessment applies it to your operation. Seven
              days. One workflow. Implementation Brief. Public $1,500. Locked in before we start:
              $1,200.
            </p>
            <div className="flex flex-col items-start gap-4">
              <CheckoutButton
                offerId="alumni-assessment"
                alumniToken={state.alumniToken}
                label="Add Assessment — $1,200"
              />
              <Link
                href="/"
                className="font-semibold text-gray-900 underline decoration-gray-500 underline-offset-4 hover:decoration-gray-900"
              >
                No thanks, see you at the workshop
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500">
              The $1,200 is not a deposit on a build or Sprint. It locks the Assessment fee
              before we start.
            </p>
          </div>
        ) : (
          <Link href="/" className="btn-primary">
            Back to homepage
          </Link>
        )}
      </div>
    </section>
  );
}
