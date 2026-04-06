import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Comparison = dynamic(() => import("@/components/Comparison"));
const Signature = dynamic(() => import("@/components/Signature"));
const UseCases = dynamic(() => import("@/components/UseCases"));
const Features = dynamic(() => import("@/components/Features"));
const Lightweight = dynamic(() => import("@/components/Lightweight"));
const Privacy = dynamic(() => import("@/components/Privacy"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Download = dynamic(() => import("@/components/Download"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Nav />
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
      <Footer />
    </>
  );
}
