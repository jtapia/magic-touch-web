import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Comparison from "@/components/Comparison";
import Signature from "@/components/Signature";
import UseCases from "@/components/UseCases";
import Features from "@/components/Features";
import Lightweight from "@/components/Lightweight";
import Privacy from "@/components/Privacy";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Download from "@/components/Download";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <HowItWorks />
        <Comparison />
        <Signature />
        <UseCases />
        <Features />
        <Lightweight />
        <Privacy />
        <Pricing />
        <FAQ />
        <Download />
      </main>
      <Footer />
    </>
  );
}
