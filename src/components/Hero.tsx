"use client";

import { motion } from "framer-motion";

const proofItems = [
  { label: "Cost", value: "Free & open source" },
  { label: "Privacy", value: "No data collected" },
  { label: "Weight", value: "Menu bar only" },
];

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-[60px]">
      <div className="max-w-[1120px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block text-xs font-semibold text-accent-light bg-accent/10 border border-accent/20 px-3.5 py-1.5 rounded-full mb-6"
          >
            Built for Magic Mouse
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-5">
            Tap to click.
            <br />
            <span className="gradient-text">On your Magic Mouse.</span>
          </h1>

          <p className="text-lg text-muted leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
            MagicTouch brings tap-to-click to the Apple Magic Mouse — with pressure-sensitive right-clicks, configurable zones, haptic feedback, and a native macOS experience.
          </p>

          <div className="flex flex-col sm:flex-row items-center lg:items-start gap-3 mb-8 w-full">
            <a
              href="#how-it-works"
              className="gradient-bg text-white w-full sm:flex-1 px-4 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all"
            >
              See How It Works
            </a>
            <a
              href="#features"
              className="w-full sm:flex-1 px-4 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base border border-border-light bg-card hover:bg-card-hover transition-colors text-center"
            >
              View Features
            </a>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
            {proofItems.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-card/80 px-4 py-3 backdrop-blur-sm">
                <span className="block text-[10px] sm:text-[11px] uppercase tracking-[0.14em] sm:tracking-[0.18em] text-dim leading-none mb-2">
                  {item.label}
                </span>
                <span className="block mt-1 font-semibold text-[11px] md:text-[14px]">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex justify-center lg:order-last"
        >
          <HeroMouse />
        </motion.div>
      </div>
    </section>
  );
}

function HeroMouse() {
  return (
    <div className="relative flex items-center justify-center w-[260px] h-[320px] sm:w-[320px] sm:h-[380px] lg:w-[360px] lg:h-[420px]">
      <div className="animate-[float_5s_ease-in-out_infinite]">
        {/* Magic Mouse 2 — realistic top-down view with blue ripple */}
        <div className="relative w-[150px] h-[255px] sm:w-[180px] sm:h-[306px] lg:w-[200px] lg:h-[340px]">
          <svg viewBox="0 0 200 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              {/* Body gradient — light */}
              <linearGradient id="mm2Body" x1="100" y1="0" x2="100" y2="340" gradientUnits="userSpaceOnUse">
                <stop offset="0%" className="[stop-color:#f2f2f4] dark:[stop-color:#2e2e3a]" />
                <stop offset="50%" className="[stop-color:#e6e6ea] dark:[stop-color:#232330]" />
                <stop offset="100%" className="[stop-color:#d2d2d8] dark:[stop-color:#18181f]" />
              </linearGradient>
              {/* Surface gradient */}
              <linearGradient id="mm2Surface" x1="100" y1="12" x2="100" y2="240" gradientUnits="userSpaceOnUse">
                <stop offset="0%" className="[stop-color:#fcfcfd] dark:[stop-color:#3a3a48]" />
                <stop offset="100%" className="[stop-color:#eeeeF2] dark:[stop-color:#28283a]" />
              </linearGradient>
              {/* Top highlight */}
              <linearGradient id="mm2Highlight" x1="100" y1="16" x2="100" y2="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="white" stopOpacity="0.55" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              {/* Shadow filter */}
              <filter id="mm2Shadow" x="-15%" y="-5%" width="130%" height="115%">
                <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor="#000" floodOpacity="0.15" />
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000" floodOpacity="0.08" />
              </filter>
              {/* Blue ripple rings (matching app icon) */}
              <radialGradient id="mm2Ripple1" cx="72" cy="100" r="60" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.35" />
                <stop offset="50%" stopColor="#2563eb" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="mm2Ripple2" cx="72" cy="100" r="40" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="mm2Ripple3" cx="72" cy="100" r="18" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ground shadow ellipse */}
            <ellipse cx="100" cy="330" rx="72" ry="8" className="fill-black/[0.08] dark:fill-black/30" />

            {/* Mouse body — Magic Mouse 2: wide rounded capsule, slightly narrower at front (top) */}
            <path
              d="M100 14
               C140 14, 170 40, 172 80
               L174 250
               C174 300, 146 326, 100 326
               C54 326, 26 300, 26 250
               L28 80
               C30 40, 60 14, 100 14Z"
              fill="url(#mm2Body)"
              filter="url(#mm2Shadow)"
            />
            {/* Body border */}
            <path
              d="M100 14
               C140 14, 170 40, 172 80
               L174 250
               C174 300, 146 326, 100 326
               C54 326, 26 300, 26 250
               L28 80
               C30 40, 60 14, 100 14Z"
              fill="none"
              className="stroke-black/[0.07] dark:stroke-white/[0.08]"
              strokeWidth="1.2"
            />

            {/* Touch surface (top 70%) */}
            <path
              d="M100 18
               C138 18, 166 42, 168 80
               L169 230
               C169 235, 145 238, 100 238
               C55 238, 31 235, 31 230
               L32 80
               C34 42, 62 18, 100 18Z"
              fill="url(#mm2Surface)"
              className="stroke-black/[0.03] dark:stroke-white/[0.04]"
              strokeWidth="0.5"
            />

            {/* Top reflection */}
            <path
              d="M100 20
               C136 20, 162 44, 164 78
               L165 120
               C165 122, 140 124, 100 124
               C60 124, 35 122, 35 120
               L36 78
               C38 44, 64 20, 100 20Z"
              fill="url(#mm2Highlight)"
              className="dark:opacity-20"
            />

            {/* Center seam */}
            <line x1="100" y1="24" x2="100" y2="232" className="stroke-black/[0.04] dark:stroke-white/[0.05]" strokeWidth="0.7" />

            {/* Blue ripple rings — matching app icon aesthetic */}
            <circle cx="72" cy="100" r="50" fill="url(#mm2Ripple1)" className="animate-[pulse-ring_3s_ease-in-out_infinite]" />
            <circle cx="72" cy="100" r="30" fill="url(#mm2Ripple2)" className="animate-[pulse-ring_3s_ease-in-out_0.4s_infinite]" style={{ animationDelay: "0.4s" }} />
            <circle cx="72" cy="100" r="12" fill="url(#mm2Ripple3)" />
            {/* Center tap dot */}
            <circle cx="72" cy="100" r="4" fill="#3b82f6" fillOpacity="0.9" />
            <circle cx="72" cy="100" r="2" fill="white" fillOpacity="0.8" />

            {/* Lightning port (Magic Mouse 2) */}
            <rect x="92" y="318" width="16" height="2.5" rx="1.25" className="fill-black/[0.12] dark:fill-white/[0.08]" />

            {/* Left / Right zone labels */}
            <text x="58" y="178" textAnchor="middle" className="fill-black/20 dark:fill-white/20" fontSize="9" fontWeight="600" letterSpacing="0.12em" fontFamily="Inter, sans-serif">LEFT</text>
            <text x="142" y="178" textAnchor="middle" className="fill-black/20 dark:fill-white/20" fontSize="9" fontWeight="600" letterSpacing="0.12em" fontFamily="Inter, sans-serif">RIGHT</text>
          </svg>
        </div>
      </div>

      {/* Floating detection card */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute -right-2 sm:right-0 top-[28%] sm:top-[30%] w-[155px] sm:w-[180px] rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/90 dark:bg-black/40 text-black/80 dark:text-white/80 p-3 sm:p-4 shadow-xl shadow-black/10 dark:shadow-black/30 backdrop-blur-md"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-black/40 dark:text-white/40">Detected</p>
        <p className="mt-1.5 text-sm font-semibold">Left tap</p>
        <div className="mt-2.5 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
          <span className="text-[11px] text-black/45 dark:text-white/45">Light pressure</span>
        </div>
        <div className="mt-1.5 flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-accent dark:bg-accent-light" />
          <span className="text-[11px] text-black/45 dark:text-white/45">Zone: 32%</span>
        </div>
      </motion.div>
    </div>
  );
}
