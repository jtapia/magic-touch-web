import { PH_PRODUCT_URL, PH_UPCOMING_URL } from "@/lib/site";

/**
 * Shows a Product Hunt badge if either PH URL env var is set.
 * Post-launch (PH_PRODUCT_URL) wins over pre-launch (PH_UPCOMING_URL).
 *
 * You can replace the inline SVG with Product Hunt's official embed script
 * (api.producthunt.com/widgets/embed-image/v1/...) after launch: that widget
 * updates the upvote count in real time. This static version works anywhere.
 */
export default function ProductHuntBadge() {
  const href = PH_PRODUCT_URL ?? PH_UPCOMING_URL;
  if (!href) return null;

  const launched = Boolean(PH_PRODUCT_URL);
  const label = launched ? "Vote on Product Hunt" : "Follow on Product Hunt";
  const sub = launched ? "We're live today" : "Launching soon";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label}. ${sub}.`}
      className="inline-flex items-center gap-3 rounded-xl border border-[#da552f]/25 bg-[#da552f]/5 hover:bg-[#da552f]/10 px-4 py-2.5 transition-colors"
    >
      <svg width="24" height="24" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="20" fill="#da552f" />
        <path
          d="M22.667 20H17v-6h5.667a3 3 0 010 6zM20 10H13v20h4v-6h3a7 7 0 000-14z"
          fill="#fff"
        />
      </svg>
      <span className="flex flex-col items-start leading-tight">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-[#da552f]">
          Product Hunt
        </span>
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </span>
    </a>
  );
}
