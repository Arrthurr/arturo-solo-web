'use client';

import { motion } from 'framer-motion';
import { Highlight } from '@/components/Highlight';
import { usePrefersReducedMotion } from '@/lib/motion';

export default function Process() {
  const reduced = usePrefersReducedMotion();

  const steps = [
    {
      number: '01',
      title: 'Reconstruct the workflow',
      description:
        'Walk one representative case from trigger to completed state. Identify the people, records, systems, handoffs, exceptions, workarounds, and the source that wins when records disagree.',
    },
    {
      number: '02',
      title: 'Find the real constraint',
      description:
        'Separate the requested feature from the operational problem. Compare simpler process, existing software, automation, AI, and custom software against the same requirements and evidence.',
    },
    {
      number: '03',
      title: 'Act on the decision',
      description:
        'Simplify, buy, automate, investigate, defer—or separately scope a build with clear acceptance criteria, feasibility gates, ownership, and a measurable boundary.',
    },
  ];

  return (
    <section id="process" className="section-padding">
      <div className="container mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className="heading-lg mb-24 max-w-3xl">
            Map the work. Choose the path. <Highlight>Build only what is justified.</Highlight>
          </h2>
          <div className="grid md:grid-cols-3 gap-16">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-t border-gray-200 pt-8"
              >
                <span className="text-sm text-gray-400">{step.number}</span>
                <h3 className="text-2xl font-bold mt-4 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
