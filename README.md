# MagicTouch

Tap-to-click for Apple Magic Mouse. A lightweight macOS menu bar utility that converts surface taps into real mouse clicks — with pressure-sensitive right-clicks, configurable zones, haptic feedback, and per-app rules.

**Website**: Built with Next.js 16, Tailwind CSS 4, and Framer Motion. Static export for Cloudflare Pages.

## Features

**Core**: Tap-to-click (single & double), zone-based right-click, configurable sensitivity, battery monitoring, start on login.

**Pro**: Pressure-based right-click, middle-click center zone, per-app right-click rules, haptic & sound feedback, visual tap overlay, scroll customization, palm rejection.

## Tech Stack

- **Next.js 16** with App Router and static export (`output: "export"`)
- **React 19** + **TypeScript 5**
- **Tailwind CSS 4** with CSS custom properties for dark/light theming
- **Framer Motion 12** for scroll-triggered animations
- **Stripe Payment Links** for checkout (no backend required)

## Getting Started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Static output in /out
```

## Deployment

Configured for Cloudflare Pages via `wrangler.toml`:

```bash
npm run build && npx wrangler pages deploy out
```

Or connect the repo in the Cloudflare Pages dashboard with:
- Build command: `npm run build`
- Output directory: `out`

## Stripe Setup

1. Create a Payment Link at [dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links)
2. Set the environment variable:
   ```
   NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/your_link_here
   ```
3. Rebuild and deploy

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, metadata, theme anti-flash
│   ├── page.tsx            # Section composition with dynamic imports
│   └── globals.css         # Tailwind theme, animations, dark mode
├── components/
│   ├── Nav.tsx             # Fixed nav with mobile menu, theme toggle
│   ├── Hero.tsx            # Hero with Magic Mouse 2 SVG + floating card
│   ├── HowItWorks.tsx      # 3-step process explanation
│   ├── Comparison.tsx      # 3 differentiators vs physical clicking
│   ├── Signature.tsx       # Zone vs pressure right-click comparison
│   ├── UseCases.tsx        # 6 audience persona cards
│   ├── Features.tsx        # 12 capability cards (3-col grid)
│   ├── Lightweight.tsx     # Performance stats + compatibility matrix
│   ├── Privacy.tsx         # Zero data collection
│   ├── Pricing.tsx         # Free/Pro tiers with Stripe Payment Link
│   ├── FAQ.tsx             # 11 accordion items
│   ├── Download.tsx        # Final CTA
│   └── Footer.tsx          # Navigation + copyright
└── context/
    └── ThemeContext.tsx     # Light/dark toggle with localStorage
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_STRIPE_PAYMENT_LINK` | Stripe Payment Link URL for Pro purchase | No (falls back to `#`) |

## License

All rights reserved.
