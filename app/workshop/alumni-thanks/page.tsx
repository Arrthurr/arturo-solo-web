import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Assessment locked in',
  description: 'Workshop alumni Assessment is locked at $1,200. The fee is not a deposit on a build.',
};

export default function AlumniThanksPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-32">
        <section className="section-padding">
          <div className="container mx-auto max-w-2xl text-center">
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
              Assessment locked
            </p>
            <h1 className="heading-lg mb-8">$1,200 locked in before we start.</h1>
            <p className="text-xl text-gray-600 mb-8 font-display">
              The workshop still teaches the filter. The Assessment applies it to one
              consequential workflow in seven business days. I will follow up at the email you
              used at checkout.
            </p>
            <p className="text-gray-500 mb-12 font-display">
              This fee is not a deposit on a build or Sprint. Implementation after a decision is
              a new conversation.
            </p>
            <Link href="/" className="btn-primary">
              Back to homepage
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
