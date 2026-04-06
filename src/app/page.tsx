import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";

const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const UseCases = dynamic(() => import("@/components/UseCases"));
const Comparison = dynamic(() => import("@/components/Comparison"));
const Signature = dynamic(() => import("@/components/Signature"));
const Features = dynamic(() => import("@/components/Features"));
const Lightweight = dynamic(() => import("@/components/Lightweight"));
const Privacy = dynamic(() => import("@/components/Privacy"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Download = dynamic(() => import("@/components/Download"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <UseCases />
      <Comparison />
      <Signature />
      <Features />
      <Lightweight />
      <Privacy />
      <FAQ />
      <Download />
      <Footer />
    </>
  );
}
