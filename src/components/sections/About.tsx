'use client';

import { motion } from 'framer-motion';
import {
  Brain,
  Eye,
  Cpu,
  GitBranch,
  Server,
  Globe,
  Sparkles,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  fadeUp,
  staggerContainer,
  staggerItem,
  viewportConfig,
} from '@/lib/animations';
import { techMarquee } from '@/lib/data/config';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import AnimatedCounter from '@/components/ui/AnimatedCounter';
import TextReveal from '@/components/ui/TextReveal';
import InfiniteMarquee from '@/components/ui/InfiniteMarquee';

const stats = [
  { value: 10, suffix: '+', label: 'Projects Shipped' },
  { value: 4, suffix: '', label: 'ML Frameworks' },
  { value: 97, suffix: '%', label: 'Peak Accuracy' },
  { value: 3, suffix: '', label: 'Systems Languages' },
];

const expertise = [
  { 
    name: 'Deep Learning & GenAI', 
    icon: Brain,
    desc: 'Designing and training vision transformers and generative models from scratch.'
  },
  { 
    name: 'Systems Engineering', 
    icon: Cpu,
    desc: 'Writing highly optimized, memory-safe code in C and Rust for AI infrastructure.'
  },
  { 
    name: 'Mathematical Foundations', 
    icon: GitBranch,
    desc: 'Building custom reverse-mode autodiff engines to understand the math under the hood.'
  },
  { 
    name: 'Scalable MLOps', 
    icon: Server,
    desc: 'Deploying distributed training pipelines and edge inference optimizations.'
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="About & Expertise" number="01" />

        <div className="grid xl:grid-cols-12 gap-12 lg:gap-16 mt-12 md:mt-16">
          {/* Left Column: Bio + Stats (Spans 7 cols on XL) */}
          <div className="xl:col-span-7 flex flex-col justify-between">
            <div>
              <TextReveal 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-medium"
                text="I build AI systems at the intersection of deep learning research and systems engineering. From implementing reverse-mode autodiff engines in C to training vision transformers across multiple GPUs, I focus on understanding and building foundational AI infrastructure — not just using it. Every project involves building core components from first principles." 
              />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid grid-cols-2 gap-4 mt-12 xl:mt-auto"
            >
              {stats.map((stat) => (
                <motion.div key={stat.label} variants={staggerItem}>
                  <GlassCard className="p-5 sm:p-6 lg:p-8 flex flex-col justify-center items-center text-center h-full border-white/5 bg-white/[0.02]">
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold gradient-text">
                      <AnimatedCounter
                        value={stat.value}
                        suffix={stat.suffix}
                      />
                    </div>
                    <p className="text-secondary text-xs sm:text-sm mt-3 font-mono tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Expertise (Spans 5 cols on XL) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            className="xl:col-span-5 flex flex-col gap-4"
          >
            {expertise.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.name}
                  variants={staggerItem}
                  whileHover={{ x: 5 }}
                  className="glass-subtle rounded-2xl p-6 sm:p-8 flex items-start gap-5 sm:gap-6 transition-all duration-500 hover:bg-white/[0.05] hover:border-accent/30 group"
                >
                  <div className="p-3 rounded-xl bg-bg-elevated border border-white/10 group-hover:border-accent/40 transition-colors shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-white mb-2">
                      {item.name}
                    </h3>
                    <p className="text-secondary text-sm sm:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Tech Marquee */}
        <div className="mt-24">
          <InfiniteMarquee items={techMarquee} />
        </div>
      </div>
    </section>
  );
}
