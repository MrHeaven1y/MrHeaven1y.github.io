"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { experience } from '@/lib/data/experience';
import { staggerContainer, fadeUp } from "@/lib/animations";

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" className="py-24 md:py-32 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <SectionTitle title="Experience" number="05" />

        {/* Timeline */}
        <div className="relative mt-12 md:mt-16">
          {/* Vertical Line */}
          <div
            className="absolute left-3 sm:left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, #00f5ff, #7c3aed)",
            }}
          />

          <motion.div
            className="space-y-8 sm:space-y-10 md:space-y-16"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experience.map((entry, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className="relative"
                  variants={fadeUp}
                >
                  {/* Timeline Dot */}
                  <div
                    className="absolute left-3 sm:left-4 md:left-1/2 top-5 sm:top-6 w-3 h-3 sm:w-4 sm:h-4 rounded-full -translate-x-1/2 z-10"
                    style={{
                      background: "#00f5ff",
                      boxShadow: "0 0 12px rgba(0, 245, 255, 0.5)",
                      border: "3px solid #050505",
                    }}
                  />

                  {/* Card */}
                  <div
                    className={`ml-8 sm:ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${
                      isLeft ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <GlassCard hover>
                      <span className="text-xs sm:text-sm font-mono text-accent">
                        {entry.period}
                      </span>
                      <h3 className="text-lg sm:text-xl font-heading font-bold text-white mt-1">
                        {entry.title}
                      </h3>
                      <p className="text-secondary text-xs sm:text-sm">{entry.company}</p>
                      <p className="text-xs sm:text-sm text-secondary mt-3 leading-relaxed">
                        {entry.description}
                      </p>

                      <ul className="mt-3 sm:mt-4 space-y-1.5 sm:space-y-2">
                        {entry.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-secondary">
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                              style={{ background: "#00f5ff" }}
                            />
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
