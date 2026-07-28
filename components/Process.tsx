'use client';

import { motion } from 'framer-motion';
import { Highlight } from '@/components/Highlight';
import { usePrefersReducedMotion } from '@/lib/motion';

export default function Process() {
  const reduced = usePrefersReducedMotion();

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
        </motion.div>
      </div>
    </section>
  );
}
