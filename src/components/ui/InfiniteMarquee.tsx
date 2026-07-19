'use client';

import { cn } from '@/lib/utils';

interface InfiniteMarqueeProps {
  items: string[];
  speed?: number;
  className?: string;
  reverse?: boolean;
}

export default function InfiniteMarquee({
  items,
  speed = 30,
  className,
  reverse = false,
}: InfiniteMarqueeProps) {
  const renderItems = (key: string) =>
    items.map((item, i) => (
      <span
        key={`${key}-${i}`}
        className="flex items-center gap-6 shrink-0"
      >
        <span className="text-sm font-mono uppercase tracking-widest text-secondary/50 whitespace-nowrap">
          {item}
        </span>
        <span
          className="w-1 h-1 rounded-full bg-accent shrink-0"
          aria-hidden="true"
        />
      </span>
    ));

  return (
    <div
      className={cn(
        'relative overflow-hidden w-full group',
        className,
      )}
    >
      {/* Left fade */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
        style={{
          background:
            'linear-gradient(to right, var(--color-bg), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Right fade */}
      <div
        className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
        style={{
          background:
            'linear-gradient(to left, var(--color-bg), transparent)',
        }}
        aria-hidden="true"
      />

      {/* Scrolling track */}
      <div
        className="flex items-center gap-6 w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {renderItems('a')}
        {renderItems('b')}
      </div>
    </div>
  );
}
