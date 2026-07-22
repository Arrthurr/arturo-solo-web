'use client';

import { motion } from 'framer-motion';
import { Highlight } from '@/components/Highlight';
import { usePrefersReducedMotion } from '@/lib/motion';

const proofItems = [
  { label: 'Public products', detail: 'Software shipped outside client work' },
  { label: 'Internal workflows', detail: 'Operational tools and processes' },
  { label: 'Client contexts', detail: 'Small organizations and consequential work' },
  { label: 'AI work', detail: 'In development, clearly labeled' },
];

const proofLogos = [
  {
    name: 'DMDL',
    logo: '/clients/dmdl.png',
    detail:
      'A field check-in workflow reframed after discovery, with critical platform behavior tested through real-device use.',
    status: 'Client workflow · implementation learning',
  },
  {
    name: 'Joy for Books',
    logo: '/clients/joy-for-books.png',
    detail:
      'An inventory-centered system connecting books, purchases, requests, donations, and visits through an auditable ledger.',
    status: 'Client system · in development',
  },
];

export default function Stats() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-16 mb-16">
            <h2 className="heading-lg">
              Built work. Real operating <Highlight>context</Highlight>.
            </h2>
            <p className="text-xl text-gray-400 font-display">
              The proof is practical: operational workflows and client work described at the level the evidence supports—not inflated into outcome claims.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-16 md:grid-cols-4">
            {proofItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-t border-gray-800 pt-6"
              >
                <p className="font-bold">{item.label}</p>
                <p className="mt-2 text-sm text-gray-500">{item.detail}</p>
              </motion.div>
            ))}
          </div>

          <p className="text-sm text-gray-500 mb-8 uppercase tracking-wider">
            Client contexts
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {proofLogos.map((client, index) => (
              <motion.article
                key={client.name}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-t border-gray-800 pt-8"
              >
                <div className="flex h-32 items-center rounded-xl bg-white px-8 py-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-20 w-auto max-w-full object-contain object-left"
                  />
                </div>
                <p className="mt-6 text-xs uppercase tracking-wider text-gray-500">
                  {client.status}
                </p>
                <h3 className="mt-2 text-xl font-bold">{client.name}</h3>
                <p className="mt-3 text-gray-400">{client.detail}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
