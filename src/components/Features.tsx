"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    title: "Tap-to-click",
    desc: "Convert light surface taps into real mouse clicks. Configurable tap duration (0.05 to 0.5s) and movement precision thresholds.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
      </svg>
    ),
  },
  {
    title: "Double-tap detection",
    desc: "Two taps within the system double-click interval trigger a proper double-click event, with visual ring feedback.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" />
      </svg>
    ),
  },
  {
    title: "Zone-based right-click",
    desc: "Tap position on the surface determines left or right click. Adjustable split point and dominant-hand flipping.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Pressure-based right-click",
    desc: "Firm taps trigger right-clicks using the finger's contact area as a pressure proxy. Three-tier classification with configurable thresholds.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    title: "Middle-click center zone",
    desc: "Enable an optional center strip for middle-click. Configurable width from 10% to 40% of the surface.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="3" x2="9" y2="21" /><line x1="15" y1="3" x2="15" y2="21" />
      </svg>
    ),
  },
  {
    title: "Haptic & sound feedback",
    desc: "Optional Force Touch trackpad vibration and audio cue on every recognized tap. Builds confidence in the feature.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" /><path d="M19.07 4.93a10 10 0 010 14.14" /><path d="M15.54 8.46a5 5 0 010 7.07" />
      </svg>
    ),
  },
  {
    title: "Visual tap overlay",
    desc: "A colored dot appears at the cursor on each tap. Separate colors for left and right clicks, with ring indicator for double-clicks.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Palm rejection",
    desc: "Typing pause mode suppresses taps for 500ms after any keypress. Prevents accidental clicks when your hand hovers near the mouse.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: "Per-app right-click rules",
    desc: "Blocklist apps that should always get left-clicks. Useful for terminals, games, or any app where right-click causes issues.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Scroll customization",
    desc: "Independent scroll sensitivity multiplier (0.25 to 4x) and direction inversion without touching system settings.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" />
      </svg>
    ),
  },
  {
    title: "Battery monitoring",
    desc: "Magic Mouse battery level displayed in the menu bar with color-coded badge: green, yellow, or red based on charge.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="18" height="12" rx="2" /><line x1="23" y1="13" x2="23" y2="11" /><line x1="6" y1="10" x2="6" y2="14" /><line x1="10" y1="10" x2="10" y2="14" />
      </svg>
    ),
  },
  {
    title: "Start on login",
    desc: "Launch automatically when you log in via native SMAppService on macOS 13+. No Launch Agents, no workarounds.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18.36 6.64a9 9 0 11-12.73 0" /><line x1="12" y1="2" x2="12" y2="12" />
      </svg>
    ),
  },
];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="features" className="py-16 md:py-32 text-center bg-gradient-to-b from-background via-surface to-background">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Capabilities</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            <span className="block">Everything your Magic Mouse</span>
            <span className="block md:inline gradient-text"> should have done from day one.</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Deep customization for tap behavior, right-click modes, feedback, scroll, and per-app rules.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
              className="relative bg-card border border-border rounded-xl p-6 text-left hover:border-border-light hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 bg-gradient-to-br from-accent/15 to-accent-purple/15 rounded-lg flex items-center justify-center shrink-0 text-accent-light">
                  {feature.icon}
                </div>
                <h3 className="text-[0.95rem] font-semibold leading-snug">{feature.title}</h3>
              </div>
              <p className="text-sm text-muted leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
