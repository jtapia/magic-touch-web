"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    value: "~5 MB",
    label: "Barely there",
    desc: "Uses less memory than a single browser tab. Runs all day without you noticing.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    value: "Offline",
    label: "No internet needed",
    desc: "Zero analytics, zero telemetry, zero &ldquo;phone home&rdquo;. Everything happens on your Mac.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    value: "Menu bar",
    label: "Stays out of your way",
    desc: "Tucked into your menu bar. No Dock icon, no Cmd-Tab noise, no clutter.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
    value: "Built native",
    label: "Made for Mac",
    desc: "Pure Swift — no Electron, no web tricks. Signed by Apple and ready for Apple Silicon.",
  },
];

const compat = [
  { name: "macOS 12+", desc: "Monterey and newer" },
  { name: "Apple Silicon & Intel", desc: "Universal binary — one download for every Mac" },
  { name: "Magic Mouse 1 & 2", desc: "Works on both (battery badge is MM2 only)" },
  { name: "Bartender & Ice", desc: "Plays nice with menu bar managers" },
];

export default function Lightweight() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="lightweight" className="py-16 md:py-32 bg-gradient-to-b from-background via-surface to-background">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Built right</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Tiny in size. Big on polish.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            A real Mac app — small, quiet, and respectful of your machine. It works the way macOS was meant to.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-border-light transition-all duration-300"
            >
              <div className="text-accent-light mb-3 flex justify-center">{stat.icon}</div>
              <span className="block text-2xl font-extrabold gradient-text mb-1">{stat.value}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted">{stat.label}</span>
              <p className="text-sm text-dim mt-2 leading-relaxed">{stat.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-10 bg-card border border-border rounded-xl p-6"
        >
          <h3 className="text-sm font-semibold uppercase tracking-wider text-center text-muted mb-5">Works with your Mac</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {compat.map((item) => (
              <div key={item.name} className="text-center">
                <span className="text-sm font-semibold text-foreground">{item.name}</span>
                <p className="text-xs text-dim mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
