import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Workshop from '@/components/Workshop';
import { readCheckoutConfig, workshopDateLabel } from '@/lib/checkout/config';

export const metadata: Metadata = {
  title: 'Decide Before You Build',
  description:
    'A $97, 90-minute virtual workshop. Bring one broken case. Leave with Six Paths scored. Not an AI tools tour.',
};

export default function WorkshopPage() {
  const config = readCheckoutConfig();
  const dateLabel = workshopDateLabel(config.classStartsAt);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <Workshop dateLabel={dateLabel} />
      </main>
      <Footer />
    </div>
  );
}
