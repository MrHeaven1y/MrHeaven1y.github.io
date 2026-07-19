'use client';

import { Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { techMarquee } from '@/lib/data/config';
import { socialLinks } from '@/lib/data/config';

const socials = [
  { icon: Github, href: socialLinks.github, label: 'GitHub' },
  { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
  { icon: Twitter, href: socialLinks.twitter, label: 'X / Twitter' },
  { icon: Mail, href: `mailto:${socialLinks.email}`, label: 'Email' },
];

const marqueeItems = [...techMarquee, ...techMarquee];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-bg">
      {/* Tech Marquee — pure CSS animation */}
      <div className="overflow-hidden py-6 sm:py-8 group">
        <div
          className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="mx-3 sm:mx-4 inline-block font-mono text-xs sm:text-sm text-muted"
            >
              {tech}
              <span className="mx-3 sm:mx-4 text-white/10">—</span>
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="mx-auto max-w-7xl px-5 sm:px-6 py-10 sm:py-16 md:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:gap-8 md:flex-row">
          <p className="font-heading text-base sm:text-lg font-semibold tracking-wide text-primary">
            Dibyendu Mukherjee
          </p>

          <div className="flex items-center gap-3 sm:gap-4">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 text-secondary transition-all duration-300 hover:border-accent/40 hover:text-accent"
                data-cursor="pointer"
                aria-label={label}
              >
                <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-12 border-t border-white/5 pt-6 sm:pt-8 text-center">
          <p className="text-[10px] sm:text-xs text-muted">
            © {new Date().getFullYear()} — Designed & built with precision
          </p>
        </div>
      </div>
    </footer>
  );
}
