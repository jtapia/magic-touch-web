"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const SALE_END_DATE = new Date("2025-08-01T00:00:00Z");

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

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
  "Multi-finger tap actions (2 & 3 fingers)",
  "Tap-to-drag",
  "Per-edge dead zones",
  "Per-app right-click rules",
  "Haptic and sound feedback",
  "Visual tap overlay with custom colors",
  "Scroll sensitivity and inversion",
  "Palm rejection (typing pause)",
  "Global disable shortcut",
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
  const countdown = useCountdown(SALE_END_DATE);
  const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || null;

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

            {/* Countdown timer */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-xs text-dim">Price goes up in:</span>
              {(["days", "hours", "minutes", "seconds"] as const).map((unit, i, arr) => (
                <span key={unit} className="flex items-center gap-1">
                  <span className="inline-flex flex-col items-center bg-surface border border-border rounded-lg px-2 py-1 min-w-[2.5rem]">
                    <span className="text-sm font-bold tabular-nums">{String(countdown[unit]).padStart(2, "0")}</span>
                    <span className="text-[9px] uppercase tracking-widest text-dim">{unit.slice(0, 3)}</span>
                  </span>
                  {i < arr.length - 1 && <span className="text-dim font-bold text-sm">:</span>}
                </span>
              ))}
            </div>
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

          <div className="mt-8 flex flex-col gap-3">
            {/* Primary: free trial */}
            {DOWNLOAD_URL ? (
              <a
                href={DOWNLOAD_URL}
                className="block text-center gradient-bg text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
              >
                Try Free for 14 Days
              </a>
            ) : (
              <a
                href="#"
                className="block text-center gradient-bg text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
              >
                Try Free for 14 Days
              </a>
            )}
            <p className="text-center text-xs text-dim">No account required · Cancel anytime</p>

            {/* Secondary: buy now */}
            <a
              href={STRIPE_LINK}
              target={STRIPE_LINK !== "#" ? "_blank" : undefined}
              rel={STRIPE_LINK !== "#" ? "noopener noreferrer" : undefined}
              className="block text-center border border-border-light bg-card hover:bg-card-hover px-6 py-3 rounded-xl font-semibold text-sm transition-all"
            >
              Buy Now for $2.99 →
            </a>
          </div>
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
