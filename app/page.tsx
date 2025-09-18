"use client";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import TrustStrip from "@/components/TrustBanner";
import SupportWidget from "@/components/SupportWidget";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";


export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Services />
      <Testimonials />
      <FAQ />
      <TrustStrip />
      <SupportWidget />   {/* Floating support */}
    </main>
  );
}
