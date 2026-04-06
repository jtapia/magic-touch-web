"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/*
 * Stripe Payment Link: create one at https://dashboard.stripe.com/payment-links
 * then set the NEXT_PUBLIC_STRIPE_PAYMENT_LINK env var, or replace the fallback below.
 */
const STRIPE_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "#";

const features = [
  "Tap-to-click (single and double)",
  "Zone-based right-click",
  "Pressure-based right-click",
  "Middle-click center zone",
  "Per-app right-click rules",
  "Haptic and sound feedback",
  "Visual tap overlay with custom colors",
  "Scroll sensitivity and inversion",
  "Palm rejection (typing pause)",
  "Battery monitoring",
  "Configurable tap sensitivity",
  "Start on login",
];

const checkIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
);

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="pricing" className="py-16 md:py-32 text-center">
      <div className="max-w-[580px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Pricing</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            One price. Everything included.
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            No tiers, no subscriptions, no feature gates. Pay once and get every feature, plus all future updates.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.2 }}
          className="relative rounded-2xl border-2 border-accent/30 bg-card p-6 sm:p-8 text-left mt-12"
        >
          <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 gradient-bg text-white text-[0.7rem] font-bold px-3 py-1 rounded-full tracking-wide shadow-lg shadow-accent/20">
            LIMITED-TIME INTRODUCTORY PRICE
          </span>

          <div className="text-center mt-2">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-extrabold gradient-text">$2.99</span>
              <span className="text-lg text-dim line-through">$3.99</span>
            </div>
            <p className="text-sm text-muted mt-1">One-time purchase. No subscription.</p>
          </div>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm">
                <span className="text-accent-light mt-0.5 shrink-0">
                  {checkIcon}
                </span>
                {f}
              </li>
            ))}
          </ul>

          <a
            href={STRIPE_LINK}
            target={STRIPE_LINK !== "#" ? "_blank" : undefined}
            rel={STRIPE_LINK !== "#" ? "noopener noreferrer" : undefined}
            className="mt-8 block text-center gradient-bg text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
          >
            Buy MagicTouch for $2.99
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-sm text-dim mt-6"
        >
          Introductory price for a limited time. Regular price $3.99.
        </motion.p>
      </div>
    </section>
  );
}
