import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | MagicTouch",
  description: "MagicTouch collects no personal data. Everything stays on your Mac.",
};

export default function PrivacyPolicy() {
  return (
    <>
      <Nav />
      <main className="max-w-[720px] mx-auto px-6 pt-32 pb-24">
        <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm text-dim mb-12">Last updated: April 6, 2026</p>

        <section className="prose-section">
          <p className="text-muted leading-relaxed mb-8">
            MagicTouch is designed with privacy as a core principle. This policy explains what data we collect, and more importantly, what we don&apos;t.
          </p>

          <h2>No Data Collection</h2>
          <p>
            MagicTouch does not collect, store, transmit, or share any personal information. The app makes <strong>zero network requests</strong> of any kind. There are no analytics, no crash reporters, no telemetry, and no third-party SDKs.
          </p>

          <h2>What Stays on Your Device</h2>
          <p>The following data is stored locally on your Mac only and never leaves your device:</p>
          <ul>
            <li>Your tap sensitivity preferences (duration, precision thresholds)</li>
            <li>Right-click mode selection (zone-based or pressure-based)</li>
            <li>Feedback preferences (haptic, sound, visual overlay colors)</li>
            <li>Per-app right-click rules</li>
            <li>Scroll customization settings</li>
            <li>Start on login preference</li>
          </ul>
          <p>
            All preferences are stored in macOS UserDefaults, a standard local storage mechanism. No cloud sync, no accounts, no external servers.
          </p>

          <h2>Touch Data</h2>
          <p>
            MagicTouch reads raw multitouch data from your Magic Mouse&apos;s capacitive surface to detect taps. This data (finger position, contact area, duration) is processed entirely in memory and in real time. It is never recorded, stored to disk, or transmitted anywhere.
          </p>

          <h2>Accessibility Permission</h2>
          <p>
            MagicTouch requires macOS Accessibility permission to inject synthetic mouse click events. This permission is used exclusively for click injection and is never used to read screen content, monitor keystrokes, or access any other application data.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            MagicTouch includes no third-party analytics, advertising, or tracking frameworks. The app is fully self-contained.
          </p>

          <h2>Purchase Data</h2>
          <p>
            Purchases are processed by Stripe. MagicTouch does not receive or store your payment information. Please refer to <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a> for details on how they handle payment data.
          </p>

          <h2>Children&apos;s Privacy</h2>
          <p>
            MagicTouch does not knowingly collect any information from anyone, including children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            If we update this policy, we will post the revised version on this page with a new &quot;Last updated&quot; date. Since MagicTouch makes no network requests, we cannot notify you in-app.
          </p>

          <h2>Contact</h2>
          <p>
            If you have questions about this privacy policy, contact us at <a href="mailto:support@magictouch.app">support@magictouch.app</a>.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
