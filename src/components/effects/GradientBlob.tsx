'use client';

import { cn } from '@/lib/utils';

interface GradientBlobProps {
  className?: string;
  color1?: string;
  color2?: string;
  size?: number;
}

export default function GradientBlob({
  className,
  color1 = '#00f5ff',
  color2 = '#7c3aed',
  size = 400,
}: GradientBlobProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute animate-blob-morph',
        className
      )}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color1} 0%, ${color2} 50%, transparent 70%)`,
        filter: 'blur(80px)',
        opacity: 0.15,
        willChange: 'border-radius',
      }}
      aria-hidden="true"
    />
  );
}
