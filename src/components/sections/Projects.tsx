'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  staggerContainer,
  staggerItem,
  viewportConfig,
} from '@/lib/animations';
import { projects } from '@/lib/data/projects';
import SectionTitle from '@/components/ui/SectionTitle';
import GlassCard from '@/components/ui/GlassCard';
import ProjectCard from '@/components/ui/ProjectCard';

const categories = [
  { key: 'all', label: 'All' },
  { key: 'systems', label: 'Systems' },
  { key: 'deep-learning', label: 'Deep Learning' },
  { key: 'computer-vision', label: 'Computer Vision' },
  { key: 'generative-ai', label: 'Generative AI' },
  { key: 'web', label: 'Web' },
] as const;

type CategoryKey = (typeof categories)[number]['key'];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const filterByCategory = (featured: boolean) =>
    projects.filter(
      (p) =>
        p.featured === featured &&
        (activeCategory === 'all' || p.category === activeCategory)
    );

  const featuredProjects = filterByCategory(true);
  const otherProjects = filterByCategory(false);

  return (
    <section id="projects" className="py-24 md:py-32 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          title="Selected Projects"
          subtitle="Systems engineering meets deep learning research"
          number="02"
        />

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap gap-2 mt-10 md:mt-12"
        >
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={cn(
                'relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-mono transition-colors duration-300',
                activeCategory === cat.key
                  ? 'text-white'
                  : 'text-secondary hover:text-white/80'
              )}
            >
              {activeCategory === cat.key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 glass rounded-full glow-cyan"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{cat.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Featured Projects */}
        <div className="mt-12 md:mt-16 space-y-10 md:space-y-16">
          <AnimatePresence mode="popLayout">
            {featuredProjects.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className="mt-20 md:mt-24">
            <p className="text-sm font-mono text-muted">More Projects</p>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-6"
            >
              <AnimatePresence mode="popLayout">
                {otherProjects.map((project) => (
                  <motion.div
                    key={project.id}
                    layout
                    variants={staggerItem}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                  >
                    <GlassCard className="p-5 sm:p-6 h-full group">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted hover:text-accent transition-colors duration-300 flex-shrink-0"
                          aria-label={`View ${project.title} on GitHub`}
                          data-cursor="pointer"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      </div>
                      <p className="text-secondary text-sm mt-2 leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="glass-subtle rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-mono text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
