'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Highlight } from '@/components/Highlight';
import { usePrefersReducedMotion } from '@/lib/motion';

export default function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
            Arturo Solo LLC · Workflow and AI systems
          </p>
          <h1 className="heading-xl mb-8 text-[2.5rem] md:text-[4.5rem]">
            When the work{' '}<br />
            no longer fits{' '}<br />
            the tools,{' '}<br />
            <Highlight>
              start with<span className="md:hidden"><br /></span>{' '}
              the workflow.
            </Highlight>
          </h1>
          <div className="grid md:grid-cols-2 gap-16 items-end">
            <div className="space-y-6">
              <p className="text-xl text-gray-600 font-display">
                I reconstruct how the work actually moves, find the real constraint, and determine whether the right next step is to simplify, buy, automate, or build.
              </p>
              <p className="text-lg text-gray-500 font-display">
                The answer may be a simpler process, existing software, focused automation, a justified use of AI, or a custom system.
              </p>
            </div>
            <div className="md:text-right space-y-4">
              <Link href="/contact" className="btn-primary md:w-2/3">
                Bring me a bottleneck <ArrowRight className="inline-block ml-2" />
              </Link>
              <p className="text-sm text-gray-500 md:text-right">
                Start with a recent example—not a predetermined tool.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
