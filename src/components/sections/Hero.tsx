"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import MagneticButton from "@/components/effects/MagneticButton";

interface HeroProps {
  isLoaded: boolean;
}

export default function Hero({ isLoaded }: HeroProps) {
  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6">
      {/* Greeting */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="text-[#a1a1aa] text-xs sm:text-sm font-[family-name:var(--font-mono)] tracking-widest uppercase mb-6"
      >
        Hello, I&apos;m
      </motion.p>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="w-full max-w-[90vw] mx-auto"
      >
        <h1 className="font-[family-name:var(--font-heading)] font-bold tracking-normal leading-tight text-[clamp(2.5rem,10vw,8rem)]">
          DIBYENDU MUKHERJEE
        </h1>
      </motion.div>

      {/* Title */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="gradient-text text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-mono)] mt-6"
      >
        AI Engineer
      </motion.p>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        className="text-[#a1a1aa] text-sm sm:text-base md:text-lg max-w-lg text-center mt-4 leading-relaxed"
      >
        Building intelligent systems from first principles — from custom
        autograd engines in C to production vision transformers.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isLoaded ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-10"
      >
        <MagneticButton>
          <a
            href="#projects"
            className="glass-strong rounded-full px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-[family-name:var(--font-mono)] uppercase tracking-wider inline-block transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)]"
            data-cursor="pointer"
          >
            Explore Projects
          </a>
        </MagneticButton>

        <MagneticButton>
          <a
            href="#contact"
            className="rounded-full px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-[family-name:var(--font-mono)] uppercase tracking-wider inline-block border border-white/20 bg-transparent transition-all duration-300 hover:border-[#00f5ff] hover:text-[#00f5ff]"
            data-cursor="pointer"
          >
            Get in Touch
          </a>
        </MagneticButton>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] font-[family-name:var(--font-mono)] text-[#52525b] uppercase tracking-widest"
        >
          Scroll
        </motion.span>
        <motion.div
          animate={{ y: [0, 6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-[#52525b]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
