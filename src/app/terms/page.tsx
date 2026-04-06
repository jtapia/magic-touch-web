import type { Metadata } from "next";
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
      <main className="max-w-[720px] mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Use</h1>
        <p className="text-sm text-dim mb-12">Last updated: April 6, 2026</p>

        <section className="prose-section">
          <p className="text-muted leading-relaxed mb-8">
            By purchasing or using MagicTouch, you agree to the following terms.
          </p>

          <h2>License</h2>
          <p>
            MagicTouch grants you a personal, non-exclusive, non-transferable license to use the software on any Mac you own. A single purchase covers all your personal devices.
          </p>

          <h2>Purchase and Pricing</h2>
          <p>
            MagicTouch is sold as a one-time purchase. The introductory price of $2.99 is available for a limited time. The regular price is $3.99. All purchases are processed by Stripe. Prices may change without prior notice, but any purchase you complete is final at the price displayed at checkout.
          </p>

          <h2>Refunds</h2>
          <p>
            If you are unsatisfied with MagicTouch, contact us at <a href="mailto:support@magictouch.app">support@magictouch.app</a> within 14 days of purchase for a full refund. No questions asked.
          </p>

          <h2>Permitted Use</h2>
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

          <h2>System Requirements</h2>
          <p>
            MagicTouch requires macOS 12.0 (Monterey) or later and an Apple Magic Mouse (1st or 2nd generation). The app requires Accessibility permission to function. MagicTouch uses the private MultitouchSupport framework, which may change in future macOS versions.
          </p>

          <h2>Disclaimer</h2>
          <p>
            MagicTouch is provided &quot;as is&quot; without warranty of any kind, express or implied. We do not guarantee compatibility with all macOS versions or configurations. MagicTouch uses undocumented Apple APIs that may change or break in future macOS updates.
          </p>

          <h2>Limitation of Liability</h2>
          <p>
            In no event shall MagicTouch or its developer be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use the software. Total liability is limited to the purchase price paid.
          </p>

          <h2>Changes to These Terms</h2>
          <p>
            We may update these terms from time to time. The updated version will be posted on this page with a new date. Continued use of MagicTouch after changes constitutes acceptance of the revised terms.
          </p>

          <h2>Contact</h2>
          <p>
            For questions about these terms, contact us at <a href="mailto:support@magictouch.app">support@magictouch.app</a>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
