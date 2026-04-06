"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const useCases = [
  {
    title: "Daily Workflow",
    desc: "Click without pressing. Reduce the repetitive physical effort of pressing the Magic Mouse's entire body hundreds of times a day.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Creative Professionals",
    desc: "Pressure-sensitive right-click gives you instant context menus in Photoshop, Figma, and other tools without interrupting your flow.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" /><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /><path d="M2 2l7.586 7.586" /><circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: "Developers",
    desc: "Middle-click on the center zone to open links in new tabs. Per-app right-click blocking keeps terminal and IDE workflows clean.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: "Left-Handed Users",
    desc: "Set your dominant hand to left and all tap zones mirror automatically. No system hacks, no third-party workarounds.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 19l-7.5-7.5L2 16v6h6l4.5-4.5" /><path d="M14 5l7 7-2 2-7-7 2-2z" />
      </svg>
    ),
  },
  {
    title: "Comfort-Focused",
    desc: "If pressing the Magic Mouse causes wrist strain, tapping uses far less force. Combined with palm rejection, accidental taps stay suppressed.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 7.65l.78.77L12 20.64l7.64-7.64.78-.77a5.4 5.4 0 000-7.65z" />
      </svg>
    ),
  },
  {
    title: "Multi-App Power Users",
    desc: "Block right-click in specific apps that don't need it. Adjust scroll sensitivity and direction independently from system settings.",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
];

export default function UseCases() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="use-cases" className="py-16 md:py-32 text-center">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Who It&apos;s For</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            <span className="block">Built for every Magic Mouse user.</span>
            <span className="block md:inline"> Not just power users.</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Whether you want comfort, precision, or customization, there's a reason to tap instead of press.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.07 }}
              className="bg-card border border-border rounded-xl p-6 text-left hover:border-border-light hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-accent/15 to-accent-purple/15 rounded-lg flex items-center justify-center shrink-0 text-accent-light">
                  {useCase.icon}
                </div>
                <div>
                  <h3 className="text-[0.95rem] font-semibold mb-1">{useCase.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{useCase.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
