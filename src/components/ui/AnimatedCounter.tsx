'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  suffix = '',
  duration = 2,
  className,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, value, {
      duration,
      ease: [0.25, 0.4, 0.25, 1],
    });

    return controls.stop;
  }, [isInView, motionValue, value, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on('change', (latest) => {
      setDisplay(latest);
    });

    return unsubscribe;
  }, [rounded]);

  return (
    <span
      ref={ref}
      className={cn(
        'text-2xl sm:text-3xl md:text-4xl font-heading font-bold',
        className,
      )}
    >
      <span className="gradient-text">{display}</span>
      {suffix && (
        <span className="gradient-text">{suffix}</span>
      )}
    </span>
  );
}
