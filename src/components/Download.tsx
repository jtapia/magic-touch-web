"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

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
            Join thousands of Magic Mouse users who switched from pressing to tapping. Free to start, one-time upgrade to unlock everything.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <a href="#pricing" className="gradient-bg text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-shadow">
              Get MagicTouch
            </a>
            <a href="mailto:support@magictouch.app" className="px-6 py-3 rounded-xl font-semibold border border-border-light bg-card hover:bg-card-hover transition-colors">
              Contact Support
            </a>
          </div>

          <p className="text-xs text-dim mt-4 leading-relaxed">
            Requires macOS 12.0 or later. Universal Binary (Apple Silicon + Intel).
          </p>
        </motion.div>
      </div>
    </section>
  );
}
