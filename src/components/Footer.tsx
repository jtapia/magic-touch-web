import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-border pt-16 pb-8" style={{ backgroundColor: "var(--color-footer-bg)" }}>
      <div className="max-w-[1120px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-6 md:gap-10">
          <div>
            <div className="flex items-center gap-2.5">
              <Image src="/app-icon.png" alt="MagicTouch" width={24} height={24} className="rounded-md" />
              <span className="text-lg font-bold">MagicTouch</span>
            </div>
            <p className="text-sm text-dim mt-2 max-w-xs">Tap to click, right where you already work. A small, quiet, beautifully native Mac app.</p>
          </div>
          <div className="grid grid-cols-3 gap-6 sm:gap-12 md:gap-16">
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold mb-1">Product</h4>
              <a href="/#how-it-works" className="text-sm text-dim hover:text-foreground transition-colors">How It Works</a>
              <a href="/#features" className="text-sm text-dim hover:text-foreground transition-colors">Features</a>
              <a href="/#pricing" className="text-sm text-dim hover:text-foreground transition-colors">Pricing</a>
              <a href="/#download" className="text-sm text-dim hover:text-foreground transition-colors">Download</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold mb-1">Support</h4>
              <a href="/#faq" className="text-sm text-dim hover:text-foreground transition-colors">FAQ</a>
              <a href="/changelog" className="text-sm text-dim hover:text-foreground transition-colors">Changelog</a>
              <a href="/press" className="text-sm text-dim hover:text-foreground transition-colors">Press Kit</a>
              <a href="mailto:support@magictouch.app" className="text-sm text-dim hover:text-foreground transition-colors">Contact</a>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="text-sm font-semibold mb-1">Legal</h4>
              <a href="/privacy" className="text-sm text-dim hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="/terms" className="text-sm text-dim hover:text-foreground transition-colors">Terms of Use</a>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-5 border-t border-border">
          <p className="text-xs text-dim text-center">&copy; 2026 MagicTouch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
