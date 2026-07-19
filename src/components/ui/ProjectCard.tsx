'use client';

import { useRef } from 'react';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  type MotionStyle,
} from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fadeUp } from '@/lib/animations';
import type { Project } from '@/lib/types';

interface ProjectCardProps {
  project: Project;
  index: number;
  className?: string;
}

export default function ProjectCard({ project, index, className }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.15 });

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 200, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 200, damping: 30 });

  // Use motion values instead of state for performance
  const lightX = useMotionValue(-1000);
  const lightY = useMotionValue(-1000);
  const lightBackground = useMotionTemplate`radial-gradient(600px circle at ${lightX}px ${lightY}px, rgba(0,245,255,0.06), transparent 40%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    rawRotateX.set(((y - centerY) / centerY) * -5);
    rawRotateY.set(((x - centerX) / centerX) * 5);
    lightX.set(x);
    lightY.set(y);
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    lightX.set(-1000);
    lightY.set(-1000);
  };

  const formattedIndex = String(index + 1).padStart(2, '0');

  const tiltStyle: MotionStyle = {
    rotateX,
    rotateY,
    transformPerspective: 1200,
  };

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      transition={{ delay: index * 0.15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tiltStyle}
      className={cn(
        'relative rounded-3xl p-6 sm:p-8 md:p-12 glass gradient-border overflow-hidden',
        className,
      )}
      data-cursor="pointer"
    >
      <div
        className={cn(
          'absolute inset-0 opacity-40 bg-gradient-to-br pointer-events-none rounded-3xl',
          project.gradient,
        )}
        aria-hidden="true"
      />

      <motion.div
        className="absolute inset-0 pointer-events-none rounded-3xl hidden md:block"
        style={{ background: lightBackground }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <span
          className="block text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-white/[0.03] select-none leading-none mb-4 md:mb-6"
          aria-hidden="true"
        >
          {formattedIndex}
        </span>

        <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 text-sm sm:text-base md:text-lg text-accent font-mono">
          {project.subtitle}
        </p>

        <p className="mt-4 sm:mt-6 text-sm sm:text-base text-secondary leading-relaxed max-w-2xl">
          {project.description}
        </p>

        <div className="mt-6 sm:mt-8 flex flex-wrap gap-2 sm:gap-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="glass-subtle rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-[11px] sm:text-xs font-mono text-secondary"
            >
              {tech}
            </span>
          ))}
        </div>

        {project.metrics.length > 0 && (
          <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="glass-subtle rounded-xl px-4 py-2 sm:px-5 sm:py-3 flex flex-col"
              >
                <span className="text-[10px] sm:text-xs text-muted uppercase tracking-wider">
                  {metric.label}
                </span>
                <span className="text-base sm:text-lg font-heading font-bold gradient-text mt-1">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 sm:mt-10">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2',
              'glass-subtle rounded-full px-4 py-2 sm:px-5 sm:py-2.5',
              'text-xs sm:text-sm text-secondary hover:text-white',
              'transition-all duration-300',
            )}
            data-cursor="pointer"
          >
            <Github className="w-4 h-4" />
            <span>View Source</span>
            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}