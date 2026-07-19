'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import {
  staggerContainer,
  staggerItem,
  viewportConfig,
} from '@/lib/animations';
import { labEntries } from '@/lib/data/lab';
import SectionTitle from '@/components/ui/SectionTitle';

const terminalLines = [
  { type: 'prompt', text: '$ python -c "import vector_engine as ve"' },
  { type: 'prompt', text: '$ model = ve.Sequential([' },
  { type: 'code', text: '    ve.DenseLayer(784, 128, \'relu\'),' },
  { type: 'code', text: '    ve.DenseLayer(128, 10, \'softmax\')' },
  { type: 'code', text: '  ])' },
  { type: 'prompt', text: '$ loss = ve.softmax_cross_entropy(pred, target)' },
  { type: 'prompt', text: '$ loss.backward()  # reverse-mode autodiff' },
  { type: 'prompt', text: '$ optimizer.step() # SGD with momentum' },
  {
    type: 'output',
    text: '> Training... epoch 1/10 [████████░░] 80% | loss: 0.234',
  },
];

export default function AILab() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const terminalInView = useInView(terminalRef, { once: true, amount: 0.3 });

  return (
    <section id="lab" className="py-24 md:py-32 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <SectionTitle title="AI Laboratory" number="03" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportConfig}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-mono text-accent text-xs sm:text-sm mt-4"
        >
          {'// Research areas and experiments'}
        </motion.p>

        {/* Lab Entry Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportConfig}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-12 md:mt-16"
        >
          {labEntries.map((entry) => (
            <motion.div
              key={entry.title}
              variants={staggerItem}
              className={cn(
                'glass rounded-xl overflow-hidden cursor-default',
                'border border-transparent transition-all duration-300',
                'hover:border-accent/10'
              )}
            >
              {/* Title bar */}
              <div className="flex items-center h-7 sm:h-8 px-3 bg-white/[0.03] border-b border-white/5">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e] ml-1.5" />
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840] ml-1.5" />
                <span className="ml-3 text-[10px] sm:text-xs font-mono text-muted">
                  {entry.category}
                </span>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5">
                <h3 className="text-base sm:text-lg font-heading font-semibold text-white">
                  {entry.title}
                </h3>
                <p className="text-xs sm:text-sm text-secondary mt-2 leading-relaxed">
                  {entry.description}
                </p>

                {entry.metric && (
                  <div className="mt-3 sm:mt-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs sm:text-sm font-mono text-accent">
                      {entry.metric}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                  {entry.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] sm:text-xs font-mono text-muted/70 px-2 py-0.5 rounded bg-white/[0.03]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated Terminal */}
        <div ref={terminalRef} className="mt-12 md:mt-16 max-w-2xl mx-auto">
          <div
            className={cn(
              'glass rounded-xl overflow-hidden',
              'border border-white/[0.06]'
            )}
          >
            {/* Terminal header */}
            <div className="flex items-center h-8 sm:h-9 px-3 sm:px-4 bg-white/[0.03] border-b border-white/5">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#febc2e] ml-1.5" />
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#28c840] ml-1.5" />
              <span className="ml-3 text-[10px] sm:text-xs font-mono text-muted">
                terminal
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-4 sm:p-6 font-mono text-[11px] sm:text-sm space-y-1 sm:space-y-1.5 min-h-[180px] sm:min-h-[220px] overflow-x-auto">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={
                    terminalInView
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -10 }
                  }
                  transition={{
                    duration: 0.4,
                    delay: i * 0.2,
                    ease: 'easeOut',
                  }}
                  className={cn(
                    'whitespace-nowrap',
                    line.type === 'prompt' && 'text-green-400',
                    line.type === 'code' && 'text-secondary',
                    line.type === 'output' && 'text-accent'
                  )}
                >
                  {line.text}
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <motion.span
                initial={{ opacity: 0 }}
                animate={
                  terminalInView
                    ? { opacity: [1, 0, 1] }
                    : { opacity: 0 }
                }
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: terminalLines.length * 0.2 + 0.3,
                }}
                className="inline-block w-1.5 sm:w-2 h-3 sm:h-4 bg-green-400 ml-0.5 align-middle"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
