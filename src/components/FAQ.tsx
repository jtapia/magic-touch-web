"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "Does it work with my Magic Mouse?",
    a: "Yes — both Magic Mouse 1 and Magic Mouse 2 work for tap detection. Battery status in the menu bar requires Magic Mouse 2, since the original model doesn't report battery level.",
  },
  {
    q: "What does the free trial include?",
    a: "The full app, every feature, for 14 days. No credit card, no account. When the trial ends, clicks stop being injected but your settings and the app itself stay — you can unlock it anytime for $2.99.",
  },
  {
    q: "Is this a subscription?",
    a: "Nope. One-time purchase. Pay $2.99 once and MagicTouch is yours — including all future updates. No recurring charge, no account.",
  },
  {
    q: "Will I need to give any permissions?",
    a: "Just one: Accessibility. macOS requires it for any app that creates mouse clicks. MagicTouch walks you through enabling it on first launch — it takes about 10 seconds.",
  },
  {
    q: "Does it change my regular mouse settings?",
    a: "No. MagicTouch works alongside System Settings without touching them. Your scroll speed, tracking speed, and Magic Mouse gestures all stay exactly as they were.",
  },
  {
    q: "Can I tune how sensitive a tap needs to be?",
    a: "Yes — everything is adjustable. Tap speed, pressure levels, the zone split, double-tap timing. Start with the defaults (most people love them) and tweak only if you feel like it.",
  },
  {
    q: "Does it collect any data about me?",
    a: "Zero. Nothing. No analytics, no crash reports, no accounts, no network requests. Every tap stays on your Mac.",
  },
  {
    q: "I'm left-handed — can I flip the zones?",
    a: "Absolutely. In Preferences, set your dominant hand to Left. Right-click moves to the left side, left-click to the right. One setting, done.",
  },
  {
    q: "Will it conflict with Bartender, Ice, or Hidden Bar?",
    a: "No. MagicTouch is a well-behaved menu bar app and works alongside every popular menu bar manager.",
  },
  {
    q: "How do I quickly turn it off?",
    a: "Three ways. Click the menu bar icon to toggle. Use the keyboard shortcut (⌃⌥⌘T by default, but you can change it). Or say a spoken command through macOS Voice Control — perfect for handing your Mac to someone else.",
  },
  {
    q: "What if I change my mind?",
    a: "Email support@magictouch.app within 30 days and we'll refund you, no questions asked. We'd rather you be happy than keep $2.99.",
  },
];

function FAQItem({ faq, index, inView }: { faq: typeof faqs[number]; index: number; inView: boolean }) {
  const [open, setOpen] = useState(false);
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: 0.05 + index * 0.04 }}
    >
      <h3>
        <button
          id={buttonId}
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-controls={panelId}
          className="w-full text-left py-5 flex items-start justify-between gap-4 group"
        >
          <span className={`text-[0.95rem] font-medium transition-colors ${open ? "text-foreground" : "group-hover:text-foreground"}`}>
            {faq.q}
          </span>
          <span
            aria-hidden="true"
            className={`shrink-0 text-lg leading-none mt-0.5 transition-[transform,color] duration-200 ${open ? "text-accent-light" : "text-dim group-hover:text-foreground"}`}
            style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="grid transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr", opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-muted leading-relaxed pb-5 overflow-hidden min-h-0">{faq.a}</p>
      </div>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="faq" className="py-16 md:py-32 text-center">
      <div className="max-w-[700px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Good questions</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Everything you might ask.
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            The stuff people actually want to know — about compatibility, permissions, privacy, and the free trial.
          </p>
        </motion.div>

        <div className="mt-8 text-left divide-y divide-border">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.q} faq={faq} index={index} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
