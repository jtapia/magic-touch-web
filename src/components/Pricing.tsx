"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { DOWNLOAD_URL, STRIPE_LINK, isExternalStripeLink, TRIAL_ENABLED } from "@/lib/site";
import { useCta } from "@/hooks/useCta";

/*
 * Sale end date. If you change pricing or want to extend/shorten the sale,
 * update this date. When the date is in the past, the countdown and
 * "introductory price" badge automatically hide themselves.
 */
const SALE_END_DATE = new Date("2026-05-31T23:59:59Z");

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
  ready: boolean;
};

function useCountdown(targetDate: Date): Countdown {
  // Start with deterministic zeros so SSR and first client render match.
  // `ready` flips true on mount; callers can use it to gate rendering.
  const [timeLeft, setTimeLeft] = useState<Countdown>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
    ready: false,
  });

  useEffect(() => {
    function calc() {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
        expired: diff === 0,
        ready: true,
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
}

const featureGroups = [
  {
    heading: "The essentials",
    items: [
      "Tap to click (single & double)",
      "Right-click by zone or by pressure",
      "Middle-click and tap-to-drag",
      "Two- and three-finger tap actions",
    ],
  },
  {
    heading: "Polished details",
    items: [
      "Gentle haptics and soft click sound",
      "Customizable on-screen click dot",
      "Scroll speed and direction controls",
      "Per-app rules and visual dead zones",
    ],
  },
  {
    heading: "Everyday comforts",
    items: [
      "Palm rejection while typing",
      "Battery monitor with low-charge alerts",
      "Siri, Shortcuts & Spotlight toggle",
      "One-keystroke on/off shortcut",
    ],
  },
];

const checkIcon = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const countdown = useCountdown(SALE_END_DATE);
  const cta = useCta();
  const isWaitlist = cta.mode === "waitlist";
  const isComingSoon = cta.mode === "waitlist" || cta.mode === "placeholder";
  const onSale = !countdown.expired && !isComingSoon;

  return (
    <section ref={ref} id="pricing" className="py-16 md:py-32 text-center">
      <div className="max-w-[640px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Pricing</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            {isComingSoon ? "One price. Coming soon." : "One price. Everything unlocked."}
          </h2>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            {isWaitlist
              ? "Tappit isn't on sale yet — we're putting the final polish on it. Here's what you'll get, and what it will cost, the day it ships."
              : isComingSoon
              ? "Tappit is coming soon. Here's a preview of what you'll get and what it will cost."
              : "No tiers. No subscriptions. No hidden \u201cPro\u201d plan. Pay once, enjoy every feature (and every future update) for as long as you want."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.2 }}
          className={`relative rounded-3xl border-2 p-6 sm:p-9 text-left mt-12 shadow-xl transition-colors ${
            isComingSoon
              ? "border-dashed border-border-light bg-card/60 shadow-black/5"
              : "border-accent/30 bg-card shadow-accent/5"
          }`}
          aria-disabled={isComingSoon || undefined}
        >
          {isComingSoon ? (
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-surface border border-border text-muted text-[0.7rem] font-bold px-3 py-1 rounded-full tracking-wide whitespace-nowrap">
              COMING SOON
            </span>
          ) : (
            onSale && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 gradient-bg text-white text-[0.7rem] font-bold px-3 py-1 rounded-full tracking-wide shadow-lg shadow-accent/20 whitespace-nowrap">
                ✨ LAUNCH PRICE
              </span>
            )
          )}

          <div className="text-center mt-2">
            <div className={`flex items-baseline justify-center gap-2 ${isComingSoon ? "opacity-70" : ""}`}>
              <span className="text-5xl sm:text-6xl font-extrabold gradient-text">$2.99</span>
              {onSale && <span className="text-lg text-dim line-through">$3.99</span>}
            </div>
            <p className="text-sm text-muted mt-2">
              {isComingSoon ? "Planned launch price. One-time payment." : "One-time payment. Yours forever."}
            </p>

            {onSale && countdown.ready && (
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                <span className="text-xs text-dim">Launch price ends in:</span>
                <div className="flex items-center gap-1">
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
            )}
          </div>

          <div className={`mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-left ${isComingSoon ? "opacity-80" : ""}`}>
            {featureGroups.map((group) => (
              <div key={group.heading}>
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-accent-light mb-2.5">{group.heading}</h3>
                <ul className="space-y-2">
                  {group.items.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] leading-snug">
                      <span className="text-accent-light mt-[3px] shrink-0">{checkIcon}</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {isWaitlist ? (
              <>
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center gradient-bg text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
                >
                  Join the waitlist
                </a>
                <p className="text-center text-xs text-dim">
                  We&rsquo;ll email you the moment Tappit is available.
                </p>
              </>
            ) : isComingSoon ? (
              <p className="text-center text-sm text-muted py-1">
                Not available yet — check back soon.
              </p>
            ) : (
              <>
                <a
                  href={DOWNLOAD_URL ?? "#"}
                  className="block text-center gradient-bg text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
                >
                  {TRIAL_ENABLED ? "Try free for 14 days" : "Download Tappit"}
                </a>
                <p className="text-center text-xs text-dim">
                  {TRIAL_ENABLED ? "No credit card · Full app unlocked · No auto-charge" : "30-day refund · No questions asked"}
                </p>

                <a
                  href={STRIPE_LINK}
                  target={isExternalStripeLink ? "_blank" : undefined}
                  rel={isExternalStripeLink ? "noopener noreferrer" : undefined}
                  className="block text-center border border-border-light bg-card hover:bg-card-hover px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                >
                  Buy now for $2.99 &rarr;
                </a>
              </>
            )}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-sm text-dim mt-6"
        >
          {isComingSoon
            ? "Launching soon · One-time purchase · No subscriptions"
            : onSale
              ? "Launch price for a limited time. Regular price $3.99."
              : "One-time purchase · Instant download · Free updates"}
        </motion.p>
      </div>
    </section>
  );
}
