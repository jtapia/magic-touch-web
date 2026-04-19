"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const STRIPE_LINK = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "#pricing";
const DOWNLOAD_URL = process.env.NEXT_PUBLIC_DOWNLOAD_URL || null;

export default function Download() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="download" className="py-16 md:py-32 text-center">
      <div className="max-w-[560px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Image src="/app-icon-large.png" alt="MagicTouch" width={96} height={96} className="mx-auto mb-6 rounded-2xl shadow-lg shadow-accent/10" priority />
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            Ready to stop pressing?
          </h2>
          <p className="text-muted text-lg leading-relaxed mt-4">
            One-time purchase, every feature included. 14-day free trial — no account required.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <a
              href={STRIPE_LINK}
              target={STRIPE_LINK !== "#pricing" ? "_blank" : undefined}
              rel={STRIPE_LINK !== "#pricing" ? "noopener noreferrer" : undefined}
              className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
            >
              Buy for $2.99
            </a>
            {DOWNLOAD_URL && (
              <a
                href={DOWNLOAD_URL}
                className="px-6 py-3 rounded-xl font-semibold border border-border-light bg-card hover:bg-card-hover transition-colors"
              >
                Download Free Trial
              </a>
            )}
            <a href="mailto:support@magictouch.app" className="px-6 py-3 rounded-xl font-semibold border border-border-light bg-card hover:bg-card-hover transition-colors">
              Contact Support
            </a>
          </div>

          <p className="text-xs text-dim mt-4 leading-relaxed">
            Requires macOS 12.0 or later · Universal Binary (Apple Silicon + Intel)
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-dim">
            <span className="inline-flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
              </svg>
              Notarized by Apple
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Developer ID signed
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
              Auto-updates via Sparkle
            </span>
            <a href="/changelog" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" />
              </svg>
              View changelog
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
