"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Signature() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-16 md:py-32 text-center bg-gradient-to-b from-background via-surface to-background">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Signature Feature</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Right-click that<br className="hidden md:block" /> <span className="gradient-text">reads your intent.</span>
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto leading-relaxed">
            Two right-click modes let you choose how context menus are triggered. Zone-based splits the surface by position. Pressure-based reads how firmly you tap. Switch anytime in Preferences.
          </p>
        </motion.div>

        {/* Visual comparison of the two modes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mt-12 max-w-3xl mx-auto"
        >
          {/* Zone-based */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent-light">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="3" x2="12" y2="21" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Zone-Based</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Tap position determines click type. Configurable split point with left-hand support.
            </p>
            <div className="h-16 rounded-xl border border-border-light bg-surface overflow-hidden flex">
              <div className="flex-[55] bg-accent/8 flex items-center justify-center text-xs font-semibold text-accent-light border-r border-border-light">
                Left Click (55%)
              </div>
              <div className="flex-[45] bg-accent-purple/8 flex items-center justify-center text-xs font-semibold text-accent-purple">
                Right Click (45%)
              </div>
            </div>
          </div>

          {/* Pressure-based */}
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-8 text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center text-accent-light">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20" /><path d="M2 12h20" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="8" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold">Pressure-Based</h3>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-4">
              Firmness of tap determines click type. Contact area is mapped to three pressure levels.
            </p>
            <div className="flex gap-2">
              {[
                { label: "Light", color: "bg-green-500/20 text-green-600 dark:text-green-400", result: "Left" },
                { label: "Medium", color: "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400", result: "Left" },
                { label: "Firm", color: "bg-red-500/20 text-red-600 dark:text-red-400", result: "Right" },
              ].map((level) => (
                <div key={level.label} className={`flex-1 rounded-xl ${level.color} p-3 text-center`}>
                  <span className="block text-xs font-bold">{level.label}</span>
                  <span className="block text-[10px] mt-1 opacity-70">{level.result} click</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12"
        >
          {[
            { value: "55/45", label: "Default zone split (configurable)" },
            { value: "3 Levels", label: "Pressure: light, medium, firm" },
            { value: "Center Zone", label: "Optional middle-click strip" },
          ].map((stat) => (
            <div key={stat.label} className="text-center rounded-2xl border border-border bg-card px-6 py-7">
              <span className="block text-2xl font-extrabold gradient-text">{stat.value}</span>
              <span className="mt-2 block text-sm text-dim">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
