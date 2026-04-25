import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SuccessClient from "./SuccessClient";

export const metadata: Metadata = {
  title: "Payment confirmed | Tappit",
  description: "Your Tappit license has been issued.",
  robots: { index: false, follow: false },
};

export default function SuccessPage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <SuccessClient />
      </main>
      <Footer />
    </>
  );
}
