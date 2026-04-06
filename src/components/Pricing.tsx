"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/*
 * Stripe Payment Link — create one at https://dashboard.stripe.com/payment-links
 * then set the NEXT_PUBLIC_STRIPE_PAYMENT_LINK env var, or replace the fallback below.
 */
const STRIPE_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "#";

const freeFeatures = [
  "Tap-to-click (single & double)",
  "Zone-based right-click",
  "Configurable tap sensitivity",
  "Battery monitoring",
  "Menu bar integration",
  "Start on login",
  "Enable/disable toggle",
];

const proFeatures = [
  "Everything in Free, plus:",
  "Pressure-based right-click",
  "Middle-click center zone",
  "Per-app right-click rules",
  "Haptic & sound feedback",
  "Visual tap overlay (custom colors)",
  "Scroll sensitivity & inversion",
  "Palm rejection (typing pause)",
];

const checkIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="pricing" className="py-16 md:py-32 text-center">
      <div className="max-w-[1120px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Pricing</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            No subscriptions. No tricks.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Start free with core tap-to-click. Unlock the full experience with a one-time upgrade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-12 max-w-3xl mx-auto">
          {/* Free Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.15 }}
            className="rounded-2xl border border-border bg-card p-6 sm:p-8 text-left flex flex-col"
          >
            <h3 className="text-lg font-bold">Free</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold">$0</span>
              <span className="text-sm text-muted">/ forever</span>
            </div>
            <p className="text-sm text-muted mt-3 leading-relaxed">
              Core tap-to-click with zone-based right-click. Everything you need to stop pressing.
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {freeFeatures.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm">
                  <span className="text-green-500 mt-0.5 shrink-0">
                    {checkIcon}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#download"
              className="mt-8 block text-center px-6 py-3 rounded-xl font-semibold text-sm border border-border-light bg-card hover:bg-card-hover transition-colors"
            >
              Download Free
            </a>
          </motion.div>

          {/* Pro Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="relative rounded-2xl border-2 border-accent/30 bg-card p-6 sm:p-8 text-left flex flex-col"
          >
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 gradient-bg text-white text-[0.7rem] font-bold px-3 py-1 rounded-full tracking-wide shadow-lg shadow-accent/20">
              ONE-TIME UPGRADE
            </span>
            <h3 className="text-lg font-bold">Pro</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold gradient-text">$4.99</span>
              <span className="text-sm text-muted">/ one-time</span>
            </div>
            <p className="text-sm text-muted mt-3 leading-relaxed">
              Full power: pressure detection, per-app rules, feedback, scroll control, and every future update.
            </p>
            <ul className="mt-6 space-y-3 flex-1">
              {proFeatures.map((f) => {
                const isHeader = f.startsWith("Everything");
                return (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 shrink-0 text-accent-light">
                      {isHeader ? (
                        checkIcon
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                      )}
                    </span>
                    <span className={isHeader ? "font-medium" : ""}>{f}</span>
                  </li>
                );
              })}
            </ul>
            <a
              href={STRIPE_LINK}
              target={STRIPE_LINK !== "#" ? "_blank" : undefined}
              rel={STRIPE_LINK !== "#" ? "noopener noreferrer" : undefined}
              className="mt-8 block text-center gradient-bg text-white px-6 py-3 rounded-xl font-semibold text-sm shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
            >
              Buy Pro — $4.99
            </a>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-sm text-dim mt-8"
        >
          Buy once, unlock everything. No subscription. No account required.
        </motion.p>
      </div>
    </section>
  );
}
