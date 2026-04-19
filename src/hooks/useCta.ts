"use client";

import { useEffect, useState } from "react";
import { DOWNLOAD_URL, STRIPE_LINK } from "@/lib/site";

export type CtaMode = "waitlist" | "purchase";

export type CtaConfig = {
  mode: CtaMode;
  href: string;
};

const fallback: CtaConfig = {
  mode: "purchase",
  href: DOWNLOAD_URL ?? STRIPE_LINK,
};

export function useCta(): CtaConfig {
  const [cta, setCta] = useState<CtaConfig>(fallback);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/cta", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { mode?: string; href?: string } | null) => {
        if (cancelled || !data?.href) return;
        const mode: CtaMode = data.mode === "waitlist" ? "waitlist" : "purchase";
        setCta({ mode, href: data.href });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return cta;
}
