"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";
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
