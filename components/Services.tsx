'use client';

import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { Highlight } from '@/components/Highlight';
import { usePrefersReducedMotion } from '@/lib/motion';

const details = [
  {
    label: 'What you receive',
    text: 'A decision-ready Implementation Brief: the current workflow, the recommended path, the evidence behind it, and the smallest valuable next step, followed by a findings and decision review.',
  },
  {
    label: 'Decision paths',
    text: 'Simplify · Buy · Automate · Build · Investigate · Defer',
  },
  {
    label: 'Best fit',
    text: 'Small organizations where leaders wear many hats, decision-makers (or strong recommenders) are close to the work, and one consequential process is costing real time, with a recent example we can examine.',
  },
];

export default function Services() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="services" className="section-padding bg-[#D0E7F9] text-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-24 mb-24">
            <h2 className="heading-lg">
              Bring one stuck workflow. <Highlight>Leave with a decision.</Highlight>
            </h2>
            <p className="text-xl text-gray-700 font-display">
              Workflow Assessment applies the filter to one consequential workflow. $1,500 fixed, seven business days. You leave with an Implementation Brief and a recommended path. Walking away with that brief is success. The fee is not a deposit on a future build.
            </p>
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 20 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col border-t border-gray-900/20 pt-8"
          >
            <Search className="h-12 w-12" />
            <h3 className="text-2xl font-bold mt-6 mb-4">Workflow Assessment</h3>
            <p className="text-lg font-semibold text-gray-900 mb-4">
              A seven-business-day decision on what to change next.
            </p>
            <p className="text-gray-700 mb-8">
              I reconstruct one consequential workflow, identify the real constraint, and compare simpler process, existing software, automation, AI, and custom development.
            </p>
            <dl className="space-y-6">
              {details.map((detail) => (
                <div key={detail.label}>
                  <dt className="text-sm font-semibold uppercase tracking-wider text-gray-800">
                    {detail.label}
                  </dt>
                  <dd className="mt-2 text-sm text-gray-700">{detail.text}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-8 text-lg font-bold text-gray-900">
              $1,500 fixed fee · Seven business days
            </p>
            <p className="mt-2 text-sm text-gray-700">
              The seven-business-day clock starts after payment and kickoff, with the decision owner, workflow lead, and agreed materials in place.
            </p>
            <p className="mt-6 border-l-2 border-gray-900 pl-4 text-sm text-gray-700">
              Workflow Assessment does not include a prototype or production implementation. The fee is not a deposit on a future build, and it does not credit toward later work. If a build is justified, that is a new conversation.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex w-fit font-semibold text-gray-900 underline decoration-gray-500 underline-offset-4 transition-colors hover:decoration-gray-900"
            >
              Bring one stuck workflow. $1,500. Seven days. A decision.
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
