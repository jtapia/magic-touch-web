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
    label: "Memory usage",
    desc: "Lighter than a browser tab. Stays running all day without impact.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
      </svg>
    ),
    value: "0",
    label: "Network requests",
    desc: "No analytics, no telemetry, and no phoning home. Ever.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    value: "No Dock Icon",
    label: "Menu bar only",
    desc: "Pure utility. No Dock clutter, no Cmd+Tab noise.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" />
      </svg>
    ),
    value: "Native Swift",
    label: "No Electron, no web views",
    desc: "Built with SwiftUI and AppKit. Hardened runtime for security.",
  },
];

const compat = [
  { name: "Bartender", desc: "Works alongside menu bar managers" },
  { name: "Ice / Hidden Bar", desc: "No conflicts with icon hiding" },
  { name: "Magic Mouse 1 + 2", desc: "Tap detection on both; battery monitor is MM2 only" },
  { name: "macOS 12+", desc: "Monterey and later supported" },
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
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Proof</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Small footprint. Deep integration.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Native Swift, no runtime overhead, no network activity. Built to stay invisible until you need it.
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
          <h3 className="text-sm font-semibold uppercase tracking-wider text-center text-muted mb-5">Compatibility</h3>
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
