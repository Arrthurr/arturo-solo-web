'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-gray-500 mb-6">
                Arturo Solo LLC · Workflow and AI systems
              </p>
              <h1 className="heading-xl mb-8 text-[2.5rem] md:text-[4rem] lg:text-[4.5rem]">
                When your workflow{' '}<br />
                <Highlight>
                  no longer fits{' '}<br />
                  the work.
                </Highlight>
              </h1>
              <p className="text-xl text-gray-600 font-display max-w-xl">
                Let&apos;s reconstruct how the work actually moves, find the real constraint, and decide whether to simplify, buy, automate, build—or use AI only when it earns its place—so you leave with a decision path, and when you build, a reusable workflow your team can run.
              </p>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 shadow-sm">
                <Image
                  src="/hero-workflow.jpg"
                  alt="Scattered work inputs consolidating into a clear ordered workflow path"
                  width={1024}
                  height={1024}
                  priority
                  className="h-auto w-full object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
