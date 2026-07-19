'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorVariant = 'default' | 'pointer' | 'text';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Looser spring for outer ring
  const outerX = useSpring(mouseX, { stiffness: 250, damping: 20, mass: 0.5 });
  const outerY = useSpring(mouseY, { stiffness: 250, damping: 20, mass: 0.5 });

  // Tighter spring for inner dot
  const innerX = useSpring(mouseX, { stiffness: 1000, damping: 35, mass: 0.2 });
  const innerY = useSpring(mouseY, { stiffness: 1000, damping: 35, mass: 0.2 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    },
    [mouseX, mouseY, isVisible]
  );

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isCoarse || prefersReduced) return;

    document.body.classList.add('cursor-none');
    window.addEventListener('mousemove', handleMouseMove);

    const handlePointerEnter = (e: Event) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) {
        const cursorType = target.getAttribute('data-cursor') as CursorVariant;
        setVariant(cursorType || 'default');
      }
    };

    const handlePointerLeave = (e: Event) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (target) setVariant('default');
    };

    document.addEventListener('mouseover', handlePointerEnter);
    document.addEventListener('mouseout', handlePointerLeave);

    return () => {
      document.body.classList.remove('cursor-none');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handlePointerEnter);
      document.removeEventListener('mouseout', handlePointerLeave);
    };
  }, [handleMouseMove]);

  if (!isVisible) return null;

  const outerSize = variant === 'text' ? { width: 60, height: 2 } : { width: 32, height: 32 };
  const outerScale = variant === 'pointer' ? 1.8 : 1;
  // Removed mixBlendMode difference to save CPU/GPU
  const outerBorderColor = variant === 'pointer' ? 'rgba(0, 245, 255, 0.8)' : 'rgba(255, 255, 255, 0.4)';

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{
          x: outerX,
          y: outerY,
          width: outerSize.width,
          height: outerSize.height,
          translateX: '-50%',
          translateY: '-50%',
          border: `1px solid ${outerBorderColor}`,
          borderRadius: variant === 'text' ? '1px' : '50%',
        }}
        animate={{
          scale: outerScale,
          width: outerSize.width,
          height: outerSize.height,
          borderRadius: variant === 'text' ? '1px' : '50%',
        }}
        transition={{
          scale: { type: 'spring', stiffness: 300, damping: 20 },
          width: { type: 'spring', stiffness: 300, damping: 20 },
          height: { type: 'spring', stiffness: 300, damping: 20 },
          borderRadius: { duration: 0.2 },
        }}
      />

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white"
        style={{
          x: innerX,
          y: innerY,
          width: 6,
          height: 6,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          opacity: variant === 'text' ? 0 : 1,
          scale: variant === 'pointer' ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
    </>
  );
}