"use client";

import { useEffect, useState } from "react";
import { STRIPE_LINK } from "@/lib/site";

export function useCtaHref(): string {
  const [href, setHref] = useState(STRIPE_LINK);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/cta", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data: { href?: string } | null) => {
        if (cancelled || !data?.href) return;
        setHref(data.href);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  return href;
}
