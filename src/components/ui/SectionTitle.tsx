'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  number?: string;
  className?: string;
}

export default function SectionTitle({
  title,
  subtitle,
  number,
  className,
}: SectionTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <div ref={containerRef} className={cn('relative mb-12 md:mb-16', className)}>
      {/* Decorative large number */}
      {number && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="absolute -top-6 -left-1 md:-top-8 md:-left-2 select-none text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white/[0.03] pointer-events-none"
          aria-hidden="true"
        >
          {number}
        </motion.span>
      )}

      {/* Title — simple fade up */}
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight"
      >
        {title}
      </motion.h2>

      {/* Gradient line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
        className="mt-4 h-[2px] w-12 origin-left bg-gradient-to-r from-accent to-accent-purple"
      />

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          className="mt-4 text-base md:text-lg text-secondary max-w-2xl"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
