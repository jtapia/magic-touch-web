"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const faqs = [
  {
    q: "Does it work with both Magic Mouse 1 and 2?",
    a: "Both generations use the same capacitive multitouch surface, so tap detection works on both. Battery monitoring requires Magic Mouse 2 (Lightning/USB-C) \u2014 Magic Mouse 1 does not expose battery over IOKit.",
  },
  {
    q: "Does it need Accessibility permissions?",
    a: "Yes. MagicTouch injects synthetic mouse events via CGEvent, which requires Accessibility access. The app prompts on first launch and shows a warning in the menu if permission is missing.",
  },
  {
    q: "Can I customize tap sensitivity?",
    a: "Fully. Tap duration threshold (0.05\u20130.5s), movement precision (0.01\u20130.20), pressure boundaries, zone split point, and double-tap window are all adjustable in Preferences.",
  },
  {
    q: "Will it conflict with Bartender, Ice, or Hidden Bar?",
    a: "No. MagicTouch is a standard menu bar app with autosaveName persistence. It works alongside all popular menu bar managers without conflicts.",
  },
  {
    q: "Does it change system mouse settings?",
    a: "No. MagicTouch operates independently. It reads raw multitouch data from the private MultitouchSupport framework and injects synthetic clicks at the HID level. Your System Preferences stay untouched.",
  },
  {
    q: "How does pressure-based right-click work?",
    a: "The Magic Mouse\u2019s capacitive surface reports finger contact area. Larger area means more pressure. MagicTouch classifies contacts into light, medium, and firm \u2014 firm taps trigger right-click. Thresholds are fully configurable.",
  },
  {
    q: "Does it collect any data?",
    a: "Zero. No analytics, no crash reporter, no accounts, no network requests. All touch processing happens locally.",
  },
  {
    q: "Can I disable it quickly without quitting?",
    a: "Yes. The menu bar has an enable/disable toggle. Disabling skips tap processing without disconnecting the device, so re-enabling is instant.",
  },
  {
    q: "Does it support left-handed use?",
    a: "Yes. Set your dominant hand to Left in Preferences and all tap zones mirror automatically.",
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
          <span className="text-[0.95rem] font-medium group-hover:text-foreground transition-colors">
            {faq.q}
          </span>
          <span
            aria-hidden="true"
            className="text-dim shrink-0 text-lg leading-none mt-0.5 transition-[transform,color] duration-200 group-hover:text-foreground"
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
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "220px" : "0px", opacity: open ? 1 : 0 }}
      >
        <p className="text-sm text-muted leading-relaxed pb-5">{faq.a}</p>
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
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">FAQ</p>
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Questions? Answered.
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto">
            Common questions about compatibility, permissions, customization, and privacy.
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
