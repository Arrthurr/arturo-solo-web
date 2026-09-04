'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Highlight } from '@/components/Highlight';
import { usePrefersReducedMotion } from '@/lib/motion';

export default function Hero() {
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
        'Leave with a recommended path and the evidence behind it. Simplify, buy, automate, build, investigate, or defer. If the path is Build, that work is a new conversation.',
    },
  ];

  return (
    <section className="bg-[#182f58] pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="container mx-auto">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm uppercase tracking-widest text-white/60 mb-6">
                Arturo Solo LLC · Decide before you build
              </p>
              <h1 className="heading-xl mb-8 text-[2.5rem] md:text-[4rem] lg:text-[4.5rem]">
                When your workflow{' '}<br />
                <Highlight>
                  no longer fits{' '}<br />
                  the work.
                </Highlight>
              </h1>
              <p className="text-xl text-white/75 font-display max-w-xl mb-6">
                When your workflow no longer fits the work, the expensive mistake is picking a fix before you know the constraint.
              </p>
              <p className="text-lg text-white/75 font-display max-w-xl mb-8">
                I reconstruct how the work actually moves, then decide — with evidence — whether to simplify, buy, automate, build, investigate, or defer. That filter is the product. The $1,500 assessment applies it to one consequential workflow in seven business days.
              </p>
              <div className="flex flex-col items-start gap-4">
                <Link href="/workshop" className="btn-primary">
                  Join the $97 workshop
                </Link>
                <Link
                  href="/contact"
                  className="text-sm font-semibold text-white underline decoration-white/50 underline-offset-4 hover:decoration-white"
                >
                  Or start a Workflow Assessment — $1,500
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-sm">
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

          <div className="grid md:grid-cols-3 gap-16 mt-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-t border-white/20 pt-8"
              >
                <span className="text-sm text-white/50">{step.number}</span>
                <h3 className="text-2xl font-bold mt-4 mb-4">{step.title}</h3>
                <p className="text-white/75">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
