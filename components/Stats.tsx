'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Highlight } from '@/components/Highlight';
import { usePrefersReducedMotion } from '@/lib/motion';

const proofItems = [
  { label: 'Public products', detail: 'Software shipped outside client work' },
  { label: 'Internal workflows', detail: 'Operational tools and processes' },
  {
    label: 'Client contexts',
    detail: 'Small organizations; leaders close to the work',
  },
  { label: 'AI work', detail: 'In development, clearly labeled' },
];

type TeachingBeat = {
  label: string;
  text: string;
};

type ClientStory = {
  name: string;
  logo: string;
  statusLine: string;
  beats: TeachingBeat[];
};

/**
 * Interim beats: only already-public phrasing plus R6 status.
 * Owner story arcs (plan U2 / R10) replace discovery/path and add "What looked true".
 */
const clientStories: ClientStory[] = [
  {
    name: 'DMDL',
    logo: '/clients/dmdl.png',
    statusLine: 'Client workflow · beta',
    beats: [
      {
        label: 'What discovery found',
        text: 'A field check-in workflow reframed after discovery.',
      },
      {
        label: 'Path that followed',
        text: 'Critical platform behavior tested through real-device use.',
      },
      {
        label: 'Status',
        text: 'Beta: admin and staff testing the website portal and native iOS/Android apps; external workforce testing the native phone app.',
      },
      {
        label: 'What this means for you',
        text: 'Start from a recent case of how the work actually moves—not a predetermined build.',
      },
    ],
  },
  {
    name: 'Joy for Books',
    logo: '/clients/joy-for-books.png',
    statusLine: 'Client system · in development',
    beats: [
      {
        label: 'What discovery found',
        text: 'An inventory-centered workflow connecting books, purchases, requests, donations, and visits.',
      },
      {
        label: 'Path that followed',
        text: 'An auditable ledger so those streams stay connected for the team that operates the work.',
      },
      {
        label: 'Status',
        text: 'Active development. Not framed as a finished portfolio outcome.',
      },
      {
        label: 'What this means for you',
        text: 'Start from a recent case of how the work actually moves—not a predetermined build.',
      },
    ],
  },
];

export default function Stats() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="py-20 bg-black text-white" data-testid="stats-proof">
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
              The proof is practical: reconstruct how the work moves, find the real constraint, and decide the path—described at the level the evidence supports, not inflated into outcome claims. When we build, the aim is a system the team can run.
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
            {clientStories.map((client, index) => (
              <motion.article
                key={client.name}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col border-t border-gray-800 pt-8"
                data-testid={`client-story-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
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
                  {client.statusLine}
                </p>
                <h3 className="mt-2 text-xl font-bold">{client.name}</h3>
                <dl className="mt-6 flex-1 space-y-5">
                  {client.beats.map((beat) => (
                    <div key={beat.label}>
                      <dt className="text-sm font-semibold uppercase tracking-wider text-gray-300">
                        {beat.label}
                      </dt>
                      <dd className="mt-2 text-sm text-gray-500">{beat.text}</dd>
                    </div>
                  ))}
                </dl>
              </motion.article>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-start gap-3 border-t border-gray-800 pt-10 md:items-center md:text-center">
            <Link href="/contact" className="btn-primary">
              Bring a recent example of where the work breaks{' '}
              <ArrowRight className="inline-block ml-2" />
            </Link>
            <p className="text-sm text-gray-500">
              A concrete stuck workflow—not a feature list or predetermined tool.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
