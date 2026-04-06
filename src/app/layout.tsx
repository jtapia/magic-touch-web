import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const siteUrl = "https://magictouch.app";

export const metadata: Metadata = {
  title: "MagicTouch: Tap-to-Click for Magic Mouse",
  description:
    "Bring tap-to-click to your Apple Magic Mouse. Pressure-sensitive right-clicks, visual feedback, and full customization. Lightweight macOS menu bar app.",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/icon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "MagicTouch",
    title: "MagicTouch: Tap-to-Click for Magic Mouse",
    description:
      "Bring tap-to-click to your Apple Magic Mouse. Pressure-sensitive right-clicks, visual feedback, and full customization.",
    images: [
      {
        url: "/app-icon-large.png",
        width: 512,
        height: 512,
        alt: "MagicTouch app icon",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "MagicTouch: Tap-to-Click for Magic Mouse",
    description:
      "Bring tap-to-click to your Apple Magic Mouse. Pressure-sensitive right-clicks, visual feedback, and full customization.",
    images: ["/app-icon-large.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* Note: dangerouslySetInnerHTML below uses only hardcoded strings (no user input),
     matching the same pattern from the TimeBar site for anti-flash theme and JSON-LD. */
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "MagicTouch",
              operatingSystem: "macOS",
              applicationCategory: "UtilitiesApplication",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              description:
                "Bring tap-to-click to your Apple Magic Mouse with pressure-sensitive right-clicks, visual feedback, and full customization.",
              url: siteUrl,
              image: `${siteUrl}/app-icon-large.png`,
            }),
          }}
        />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
