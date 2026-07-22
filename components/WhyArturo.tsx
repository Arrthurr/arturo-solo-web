'use client';

import { motion } from 'framer-motion';
import { Highlight } from '@/components/Highlight';
import { usePrefersReducedMotion } from '@/lib/motion';

export default function WhyArturo() {
  const reduced = usePrefersReducedMotion();

  const bullets = [
    'Hands-on workflow assessment and implementation',
    'Evidence and tradeoffs in plain language',
    'No predetermined AI or custom-build pitch',
  ];

  return (
    <section id="team" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
        >
          <figure className="max-w-md mx-auto md:mx-0">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/arthur-turnbull.jpg"
                srcSet="/arthur-turnbull.jpg 1x, /arthur-turnbull@2x.jpg 2x"
                alt=""
                className="h-full w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 text-sm text-gray-500 font-display">
              Arthur Turnbull
            </figcaption>
          </figure>

          <div>
            <p className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              Why Arturo
            </p>
            <h2 className="heading-lg mb-8">
              Builder&apos;s judgment. <Highlight>Operator&apos;s discipline.</Highlight>
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-display">
              I can map the operation, test the hard assumptions, and build the software myself. That does not mean custom software is always the answer. You get one accountable partner who can recommend the lower-complexity path when it fits—and carry a justified build through implementation when it does not.
            </p>
            <ul className="space-y-3 text-gray-600">
              {bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="text-black font-bold">·</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
