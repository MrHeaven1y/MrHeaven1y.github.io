'use client';

import { type ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeUp } from '@/lib/animations';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: 'cyan' | 'purple' | 'none';
}

export default function GlassCard({
  children,
  className,
  hover = true,
  glow = 'none',
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={
        hover
          ? {
              y: -4,
              borderColor: 'rgba(255, 255, 255, 0.10)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
              transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] },
            }
          : undefined
      }
      className={cn(
        'glass rounded-2xl p-6 sm:p-8',
        'transition-all duration-400 ease-[cubic-bezier(0.25,0.4,0.25,1)]',
        glow === 'cyan' && 'glow-cyan',
        glow === 'purple' && 'glow-purple',
        className,
      )}
    >
      {children}
    </motion.div>
  );
}