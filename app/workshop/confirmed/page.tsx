import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WorkshopConfirmation from '@/components/WorkshopConfirmation';
import { readCheckoutConfig } from '@/lib/checkout/config';
import {
  buildWorkshopConfirmation,
  paidWorkshopFromStripe,
} from '@/lib/checkout/workshop-confirmation';
import { createStripeClient, retrieveCheckoutSession } from '@/lib/checkout/stripe';

export const metadata: Metadata = {
  title: 'Workshop confirmation',
  description: 'You are in for Decide Before You Build. Optional alumni Assessment is $1,200.',
};

export default async function WorkshopConfirmedPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const sessionId = (await searchParams).session_id ?? null;
  const config = readCheckoutConfig();
  let paidWorkshop = null;

  if (sessionId && config.secretKey) {
    try {
      const session = await retrieveCheckoutSession(createStripeClient(config.secretKey), sessionId);
      paidWorkshop = paidWorkshopFromStripe({
        id: session.id,
        payment_status: session.payment_status,
        created: session.created,
        metadata: session.metadata,
      });
    } catch (error) {
      console.error('Workshop confirmation retrieve error:', error);
    }
  }

  const state = buildWorkshopConfirmation({
    sessionId,
    paidWorkshop,
    config,
    now: new Date(),
  });

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <WorkshopConfirmation state={state} />
      </main>
      <Footer />
    </div>
  );
}
