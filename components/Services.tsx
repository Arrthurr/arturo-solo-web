'use client';

import { motion } from 'framer-motion';
import { Search, Wrench } from 'lucide-react';
import Link from 'next/link';
import { Highlight } from '@/components/Highlight';
import { usePrefersReducedMotion } from '@/lib/motion';

export default function Services() {
  const reduced = usePrefersReducedMotion();

  const services = [
    {
      icon: <Search className="h-12 w-12" />,
      title: 'Workflow Assessment',
      tagline: 'A seven-business-day decision on what to change next.',
      description:
        'I reconstruct one consequential workflow, identify the real constraint, and compare simpler process, existing software, automation, AI, and custom development.',
      details: [
        {
          label: 'What you receive',
          text: 'A decision-ready Implementation Brief: the current workflow, the recommended path, the evidence behind it, and the smallest valuable next step—followed by a findings and decision review.',
        },
        {
          label: 'Decision paths',
          text: 'Simplify · Buy · Automate · Build · Investigate · Defer',
        },
        {
          label: 'Best fit',
          text: 'A consequential workflow with an accessible decision maker, someone who knows the day-to-day work, and a recent example we can examine.',
        },
      ],
      price: '$1,500 fixed fee · Seven business days',
      startCondition:
        'The seven-business-day clock starts after payment and kickoff, with the decision owner, workflow lead, and agreed materials in place.',
      boundary:
        'Workflow Assessment does not include a prototype or production implementation. Those are authorized and priced separately only when justified. The assessment fee is not automatically a deposit on a future build.',
      cta: 'See if the assessment fits',
    },
    {
      icon: <Wrench className="h-12 w-12" />,
      title: 'Custom AI Build',
      tagline: 'Separately scoped implementation for a validated workflow.',
      description:
        'For workflows with a supported need and a clear reason custom software or AI is the right path. That evidence may come from a Workflow Assessment or equivalent discovery already completed by your team.',
      details: [
        {
          label: 'How it works',
          text: 'We agree on the smallest useful boundary, acceptance criteria, ownership, and any feasibility tests before committing to implementation.',
        },
        {
          label: 'Feasibility first',
          text: 'When success depends on uncertain platform, API, device, or data behavior, we test that assumption under representative conditions before committing to the architecture.',
        },
        {
          label: 'Delivery',
          text: 'Build, representative testing, client acceptance, release, and post-launch responsibilities are defined in the approved scope.',
        },
      ],
      cta: 'Discuss a scoped build',
    },
  ];

  return (
    <section id="services" className="section-padding bg-black text-white">
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
              Start with the decision. <Highlight>Build only when it earns its way in.</Highlight>
            </h2>
            <p className="text-xl text-gray-400 font-display">
              Two distinct engagements: Workflow Assessment establishes what should change and why. Custom AI Build implements a separately approved scope when the evidence supports it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col border-t border-gray-800 pt-8"
              >
                {service.icon}
                <h3 className="text-2xl font-bold mt-6 mb-4">{service.title}</h3>
                <p className="text-lg font-semibold text-white mb-4">{service.tagline}</p>
                <p className="text-gray-400 mb-8">{service.description}</p>
                <dl className="flex-1 space-y-6">
                  {service.details.map((detail) => (
                    <div key={detail.label}>
                      <dt className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                        {detail.label}
                      </dt>
                      <dd className="mt-2 text-sm text-gray-500">{detail.text}</dd>
                    </div>
                  ))}
                </dl>
                {service.price && (
                  <p className="mt-8 text-lg font-bold text-white">{service.price}</p>
                )}
                {service.startCondition && (
                  <p className="mt-2 text-sm text-gray-500">{service.startCondition}</p>
                )}
                {service.boundary && (
                  <p className="mt-6 border-l-2 border-white pl-4 text-sm text-gray-400">
                    {service.boundary}
                  </p>
                )}
                <Link
                  href="/contact"
                  className="mt-8 inline-flex w-fit font-semibold text-white underline decoration-gray-600 underline-offset-4 transition-colors hover:decoration-white"
                >
                  {service.cta}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
