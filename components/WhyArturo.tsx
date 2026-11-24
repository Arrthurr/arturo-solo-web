'use client';

import { motion } from 'framer-motion';
import { Highlight } from '@/components/Highlight';
import { usePrefersReducedMotion } from '@/lib/motion';

export default function WhyArturo() {
  const reduced = usePrefersReducedMotion();

  const bullets = [
    'Hands-on workflow assessment. Build only if the filter earns it.',
    'Evidence and tradeoffs in plain language',
    'No predetermined AI or custom-build pitch',
    'Leave capability, not dependency',
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
              Why ASLLC
            </p>
            <h2 className="heading-lg mb-8">
              Builder&apos;s judgment. <Highlight>Operator&apos;s discipline.</Highlight>
            </h2>
            <p className="text-xl text-gray-600 mb-8 font-display">
              Arthur Turnbull is a versatile Technical Systems and Operations Leader with a career built on over two decades of cross-functional systems operations, digital distribution, and full-stack engineering. Developed a pragmatic architectural approach by evolving from hands-on technical management and live systems triage into designing resilient, event-driven B2B SaaS platforms. Proficient in leveraging modern full-stack developer tools and AI-native automation to eliminate manual toil, optimize queue/routing logic, and transform recurring operational bottlenecks into durable, scalable systems.
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
