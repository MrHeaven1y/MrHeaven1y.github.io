'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface TextRevealProps {
  text: string;
  className?: string;
}

export default function TextReveal({ text, className }: TextRevealProps) {
  const words = text.split(' ');

  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.03, delayChildren: 0.1 },
        },
      }}
      className={cn(
        'text-base sm:text-lg md:text-xl leading-relaxed text-secondary max-w-2xl',
        className,
      )}
    >
      {words.map((word, i) => (
        <span key={i}>
          <motion.span
            variants={{
              hidden: { opacity: 0.1, y: 5 },
              visible: { opacity: 1, y: 0 },
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </motion.p>
  );
}