import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | MagicTouch",
  description: "Terms of use for MagicTouch, a tap-to-click utility for Apple Magic Mouse.",
};

export default function TermsOfUse() {
  return (
    <>
      <Nav />
      <main id="main-content" className="max-w-[720px] mx-auto px-6 pt-32 pb-24">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-dim hover:text-foreground transition-colors mb-10"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to home
        </Link>

        <header className="mb-12 pb-10 border-b border-border">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent-light mb-3">Legal</p>
          <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-3">Terms of Use</h1>
          <p className="text-sm text-dim mb-6">Last updated April 18, 2026</p>
          <p className="prose-lead">
            By purchasing or using MagicTouch, you agree to the following terms. We&apos;ve kept them short and plain, with no surprise clauses.
          </p>
        </header>

        <article className="prose-section">
          <h2>License</h2>
          <p>
            MagicTouch grants you a personal, non-exclusive, non-transferable license to use the software on any Mac you own. A single purchase covers all your personal devices.
          </p>

          <h2>Purchase and pricing</h2>
          <p>
            MagicTouch is sold as a one-time purchase. The introductory price of $2.99 is available for a limited time; the regular price is $3.99. All purchases are processed by <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a>. Prices may change without prior notice, but any purchase you complete is final at the price displayed at checkout.
          </p>

          <h2>Refunds</h2>
          <p>
            If you&apos;re unsatisfied with MagicTouch, email <a href="mailto:support@magictouch.app">support@magictouch.app</a> within 30 days of purchase for a full refund. No questions asked.
          </p>

          <h2>Permitted use</h2>
          <p>You may:</p>
          <ul>
            <li>Install and use MagicTouch on multiple Macs you personally own</li>
            <li>Use MagicTouch for personal or commercial work</li>
          </ul>
          <p>You may not:</p>
          <ul>
            <li>Redistribute, resell, or sublicense MagicTouch</li>
            <li>Reverse-engineer, decompile, or modify the application</li>
            <li>Share your license key or purchase with others</li>
          </ul>

          <h2>System requirements</h2>
          <p>
            MagicTouch requires macOS 12.0 (Monterey) or later and an Apple Magic Mouse (1st or 2nd generation). The app requires Accessibility permission to function. MagicTouch uses the private MultitouchSupport framework, which may change in future macOS versions.
          </p>

          <h2>Disclaimer</h2>
          <p>
            MagicTouch is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied. We don&apos;t guarantee compatibility with all macOS versions or configurations. MagicTouch uses undocumented Apple APIs that may change or break in future macOS updates.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            In no event shall MagicTouch or its developer be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use the software. Total liability is limited to the purchase price paid.
          </p>

          <h2>Changes to these terms</h2>
          <p>
            We may update these terms from time to time. The updated version will be posted on this page with a new date. Continued use of MagicTouch after changes constitutes acceptance of the revised terms.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, email <a href="mailto:support@magictouch.app">support@magictouch.app</a>.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
