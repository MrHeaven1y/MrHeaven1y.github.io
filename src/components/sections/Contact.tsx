"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, Github, Linkedin, Twitter, Mail, Copy } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import GlassCard from "@/components/ui/GlassCard";
import MagneticButton from "@/components/effects/MagneticButton";
import { socialLinks } from '@/lib/data/config';
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";

const socials = [
  { icon: <Github className="w-5 h-5" />, label: "GitHub", value: "MrHeaven1y", href: socialLinks.github, copyable: false },
  { icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn", value: "Connect", href: socialLinks.linkedin, copyable: false },
  { icon: <Twitter className="w-5 h-5" />, label: "Twitter / X", value: "Follow", href: socialLinks.twitter, copyable: false },
  { icon: <Mail className="w-5 h-5" />, label: "Email", value: socialLinks.email, href: `mailto:${socialLinks.email}`, copyable: true },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [formState, setFormState] = useState<"idle" | "sending" | "sent">("idle");
  const [copied, setCopied] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [fieldValues, setFieldValues] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setTimeout(() => {
      setFormState("sent");
      setTimeout(() => setFormState("idle"), 3000);
    }, 1500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(socialLinks.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (field: string, value: string) => {
    setFieldValues((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section id="contact" className="py-24 md:py-32 px-5 sm:px-6 md:px-12 lg:px-24 relative">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <SectionTitle
          title="Get in Touch"
          subtitle="Have a project in mind? Let's build something together."
          number="06"
        />

        <motion.div
          className="grid lg:grid-cols-5 gap-10 lg:gap-16 mt-12 md:mt-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Form */}
          <motion.div className="lg:col-span-3" variants={fadeUp}>
            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {(["name", "email", "message"] as const).map((field) => (
                  <div key={field} className="relative">
                    {field === "message" ? (
                      <textarea
                        id={`contact-${field}`}
                        value={fieldValues[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={4}
                        className="w-full bg-transparent border-b-2 border-white/10 py-3 px-0 text-sm sm:text-base text-white outline-none transition-colors duration-300 focus:border-[#00f5ff] resize-none"
                      />
                    ) : (
                      <input
                        type={field === "email" ? "email" : "text"}
                        id={`contact-${field}`}
                        value={fieldValues[field]}
                        onChange={(e) => handleChange(field, e.target.value)}
                        onFocus={() => setFocusedField(field)}
                        onBlur={() => setFocusedField(null)}
                        required
                        className="w-full bg-transparent border-b-2 border-white/10 py-3 px-0 text-sm sm:text-base text-white outline-none transition-colors duration-300 focus:border-[#00f5ff]"
                      />
                    )}
                    <label
                      htmlFor={`contact-${field}`}
                      className={`absolute left-0 text-muted text-xs sm:text-sm font-mono transition-all duration-300 pointer-events-none ${
                        focusedField === field || fieldValues[field]
                          ? "-top-3 text-[10px] sm:text-xs text-[#00f5ff]"
                          : "top-3"
                      }`}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </label>
                  </div>
                ))}

                <MagneticButton>
                  <button
                    type="submit"
                    disabled={formState !== "idle"}
                    className="w-full glass-strong rounded-xl py-3 sm:py-4 text-xs sm:text-sm font-mono uppercase tracking-widest text-white flex items-center justify-center gap-3 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,245,255,0.15)] disabled:opacity-50"
                    data-cursor="pointer"
                  >
                    {formState === "idle" && (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                    {formState === "sending" && (
                      <motion.div
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    {formState === "sent" && (
                      <motion.span
                        className="flex items-center gap-2 text-[#00f5ff]"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <CheckCircle className="w-4 h-4" />
                        Sent!
                      </motion.span>
                    )}
                  </button>
                </MagneticButton>
              </form>
            </GlassCard>
          </motion.div>

          {/* Social Links */}
          <motion.div className="lg:col-span-2" variants={fadeUp}>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">
              Connect
            </h3>

            <motion.div
              className="flex flex-col gap-3 sm:gap-4 mt-5 sm:mt-6"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {socials.map((social) => (
                <motion.div key={social.label} variants={staggerItem}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={social.copyable ? (e) => { e.preventDefault(); copyEmail(); } : undefined}
                    className="flex items-center gap-3 sm:gap-4 glass-subtle rounded-xl p-3 sm:p-4 transition-all duration-300 hover:border-[#00f5ff]/20 group"
                    data-cursor="pointer"
                  >
                    <span className="text-secondary group-hover:text-[#00f5ff] transition-colors duration-300">
                      {social.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] sm:text-xs text-muted font-mono uppercase tracking-wider">
                        {social.label}
                      </p>
                      <p className="text-white text-xs sm:text-sm truncate">{social.value}</p>
                    </div>
                    {social.copyable && (
                      <span className="text-[10px] sm:text-xs font-mono text-muted group-hover:text-[#00f5ff] transition-colors flex items-center gap-1">
                        {copied ? (
                          <span className="text-[#00f5ff]">Copied!</span>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            Copy
                          </>
                        )}
                      </span>
                    )}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
