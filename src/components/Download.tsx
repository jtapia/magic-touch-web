"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { DOWNLOAD_URL, STRIPE_LINK, isExternalStripeLink, TRIAL_ENABLED } from "@/lib/site";
import { useCta } from "@/hooks/useCta";

export default function Download() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const cta = useCta();
  const isWaitlist = cta.mode === "waitlist";
  const isComingSoon = cta.mode === "waitlist" || cta.mode === "placeholder";
  const primaryHref = isWaitlist ? cta.href : DOWNLOAD_URL ?? "#pricing";
  const primaryLabel = isWaitlist
    ? "Join the waitlist"
    : TRIAL_ENABLED
      ? DOWNLOAD_URL ? "Download free trial" : "Start free trial"
      : DOWNLOAD_URL ? "Download Tappit" : "Get Tappit";

  return (
    <section ref={ref} id="download" className="py-16 md:py-32 text-center">
      <div className="max-w-[560px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Image src="/app-icon-large.png" alt="Tappit" width={96} height={96} className="mx-auto mb-6 rounded-2xl shadow-lg shadow-accent/10" priority />
          <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4">
            {isComingSoon ? "Be the first to try it." : "Ready to stop pressing?"}
          </h2>
          <p className="text-muted text-lg leading-relaxed mt-4">
            {isWaitlist
              ? "Tappit is almost here. Join the waitlist and we'll email you on launch day."
              : isComingSoon
              ? "Tappit is coming soon. Check back here when it's ready."
              : TRIAL_ENABLED
              ? "Try the full app free for 14 days. If you love it (and we think you will), keep it forever for $2.99."
              : "Download Tappit and keep it forever for $2.99. Not happy? 30-day refund, no questions asked."}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            {cta.mode === "placeholder" ? (
              <p className="text-sm text-muted py-3">Not available yet — check back soon.</p>
            ) : (
              <>
                <a
                  href={primaryHref}
                  target={isWaitlist ? "_blank" : undefined}
                  rel={isWaitlist ? "noopener noreferrer" : undefined}
                  className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  {!isWaitlist && DOWNLOAD_URL && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                  )}
                  {primaryLabel}
                </a>
                {!isWaitlist && (
                  <a
                    href={STRIPE_LINK}
                    target={isExternalStripeLink ? "_blank" : undefined}
                    rel={isExternalStripeLink ? "noopener noreferrer" : undefined}
                    className="px-6 py-3 rounded-xl font-semibold border border-border-light bg-card hover:bg-card-hover transition-colors"
                  >
                    Buy for $2.99
                  </a>
                )}
              </>
            )}
          </div>

          <p className="text-xs text-dim mt-4 leading-relaxed">
            {TRIAL_ENABLED && "No credit card required · "}macOS 12 or later · Works on Apple Silicon &amp; Intel
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-dim">
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
              Auto-updates included
            </span>
            <Link href="/changelog" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" />
              </svg>
              View changelog
            </Link>
            <a href="mailto:support@gettappit.com" className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Contact support
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
