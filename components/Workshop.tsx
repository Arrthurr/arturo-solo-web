'use client';

import { motion } from 'framer-motion';
import { Highlight } from '@/components/Highlight';
import CheckoutButton from '@/components/CheckoutButton';
import { usePrefersReducedMotion } from '@/lib/motion';

const included = [
  'One broken case you bring',
  'Six Paths scored on that case: Simplify · Buy · Automate · Build · Investigate · Defer',
  'The Decide Before You Build filter, taught so you can reuse it',
];

const notIncluded = [
  'A build, Sprint, or implementation',
  'A monthly retainer',
  'A tool list or AI tools tour',
];

export default function Workshop({ dateLabel }: { dateLabel: string }) {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
                90 minutes · Virtual · $97
              </p>
              <h1 className="heading-lg mb-8">
                Decide Before You <Highlight>Build</Highlight>
              </h1>
              <p className="text-xl text-gray-600 font-display mb-6">
                Bring one broken case. Leave with Six Paths scored. The workshop teaches the
                filter. It is not an AI tools tour.
              </p>
              <p className="text-gray-600 font-display">{dateLabel}.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
              <p className="text-2xl font-bold mb-2">$97</p>
              <p className="text-sm text-gray-600 mb-8">
                90 minutes. Virtual. One case. A scored decision path.
              </p>
              <CheckoutButton offerId="workshop" label="Join the $97 workshop" />
              <p className="mt-6 text-sm text-gray-500">
                The fee is not a deposit on an Assessment, Sprint, or build.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-6">What you leave with</h2>
              <ul className="space-y-3 text-gray-600">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-black font-bold">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Not included</h2>
              <ul className="space-y-3 text-gray-600">
                {notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="text-black font-bold">·</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
