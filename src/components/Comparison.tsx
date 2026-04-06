"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const comparisons = [
  {
    title: "No physical click needed",
    desc: "The Magic Mouse requires pressing down the entire body to click. MagicTouch converts light surface taps into full clicks \u2014 less force, less fatigue, same result.",
  },
  {
    title: "Smarter right-clicks",
    desc: "macOS right-click on Magic Mouse is awkward: two-finger tap or hold Control. MagicTouch gives you zone-based or pressure-based right-click that feels natural and instant.",
  },
  {
    title: "Trackpad behavior, mouse form",
    desc: "macOS supports tap-to-click on trackpads but not Magic Mouse. MagicTouch fills that gap \u2014 same gesture you already know, on the device you prefer.",
  },
];

export default function Comparison() {
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
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Why It&apos;s Better</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">A better way to use Magic Mouse.</h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            macOS gives trackpads tap-to-click but not Magic Mouse. MagicTouch fixes that.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
          {comparisons.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.12 + index * 0.08 }}
              className="rounded-2xl border border-border bg-card p-7 text-left"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent-light text-sm font-bold">
                0{index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm text-muted leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
