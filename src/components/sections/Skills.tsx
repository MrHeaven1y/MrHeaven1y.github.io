"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Brain, Server, Cpu } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/animations";

interface SkillDomain {
  title: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
  skills: string[];
}

const domains: SkillDomain[] = [
  {
    title: "Languages",
    color: "text-[#00f5ff]",
    bgColor: "bg-[#00f5ff]",
    icon: <Code2 className="w-5 h-5" />,
    skills: ["C", "Python", "TypeScript", "Rust", "Java", "C++"],
  },
  {
    title: "ML & Deep Learning",
    color: "text-[#7c3aed]",
    bgColor: "bg-[#7c3aed]",
    icon: <Brain className="w-5 h-5" />,
    skills: [
      "PyTorch", "TensorFlow", "Transformers", "GANs", "CNNs",
      "Autodiff", "Self-Attention", "Diffusion Models", "GNNs", "SE-Net", "DDP",
    ],
  },
  {
    title: "Infrastructure",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400",
    icon: <Server className="w-5 h-5" />,
    skills: ["Flask", "Docker", "WebAssembly", "REST API", "HuggingFace", "CMake", "Git", "Linux"],
  },
  {
    title: "Systems",
    color: "text-amber-400",
    bgColor: "bg-amber-400",
    icon: <Cpu className="w-5 h-5" />,
    skills: ["CUDA", "NCCL", "Emscripten", "Memory Management", "Computation Graphs"],
  },
];

const pipelines = [
  { label: "Edge Inference", steps: ["C", "WebAssembly", "Browser"] },
  { label: "Distributed Training", steps: ["PyTorch", "DDP", "NCCL"] },
  { label: "From-Scratch ML", steps: ["Autodiff", "Backprop", "Training"] },
];

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="skills" className="py-24 md:py-32 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <SectionTitle title="Expertise" number="04" />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12 md:mt-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {domains.map((domain) => (
            <motion.div key={domain.title} variants={staggerItem}>
              <GlassCard hover className="h-full">
                <div className={cn("mb-3", domain.color)}>{domain.icon}</div>
                <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                  {domain.title}
                </h3>
                <div className={cn("w-8 h-[2px] mt-2 mb-4 rounded-full", domain.bgColor)} />
                <div className="flex flex-wrap gap-1.5">
                  {domain.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-mono bg-white/[0.03] text-secondary border border-transparent transition-all duration-300 hover:text-white hover:border-white/10"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Pipelines */}
        <motion.div
          className="grid sm:grid-cols-3 gap-3 sm:gap-4 mt-12 md:mt-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {pipelines.map((pipeline) => (
            <motion.div key={pipeline.label} variants={staggerItem}>
              <div className="glass-subtle rounded-xl p-4 sm:p-5">
                <p className="text-[10px] sm:text-xs font-mono text-muted uppercase tracking-wider mb-3">
                  {pipeline.label}
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                  {pipeline.steps.map((step, i) => (
                    <span key={step} className="flex items-center gap-2">
                      <span className="gradient-text text-xs sm:text-sm font-heading font-semibold">
                        {step}
                      </span>
                      {i < pipeline.steps.length - 1 && (
                        <span className="text-muted text-[10px]">→</span>
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
