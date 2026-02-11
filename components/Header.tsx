"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0b0e11]/95 shadow-md" : "bg-transparent"
      }`}
      style={{ backdropFilter: scrolled ? "blur(6px)" : "none" }}
    >
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-4 flex items-center justify-between">
        {/* Logo + wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src="/blakdhut.jpg"
            alt="Blakdhut Logo"
            width={32}
            height={32}
            className="rounded-sm h-8 w-8"
          />
          <span className="text-[#f0b90b] font-extrabold tracking-wide">
            BLAKDHUT EXCHANGE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#eaecef]">
          <Link href="/#services" className="hover:text-[#f0b90b]">
            Services
          </Link>

          {/* NEW */}
          <Link href="/prop-funding" className="hover:text-[#f0b90b]">
            Prop Funding
          </Link>

          <Link href="/#testimonials" className="hover:text-[#f0b90b]">
            Testimonials
          </Link>
          <Link href="/#faqs" className="hover:text-[#f0b90b]">
            FAQs
          </Link>
          <Link href="/news" className="hover:text-[#f0b90b]">
            News
          </Link>
          <Link href="/community" className="hover:text-[#f0b90b]">
            Community
          </Link>
          <Link href="/policies" className="hover:text-[#f0b90b]">
            Policies
          </Link>
        </nav>

        {/* Right actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="https://t.me/blakdhute"
            className="px-4 py-2 rounded-lg font-semibold bg-[#f0b90b] text-black hover:bg-[#e2aa06] transition"
          >
            Buy / Sell
          </Link>
        </div>

        {/* Mobile button */}
        <button
          className="md:hidden text-[#eaecef] text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0b0e11]/95 px-6 py-4 space-y-4 text-[#eaecef]">
          <Link
            href="/#services"
            className="block hover:text-[#f0b90b]"
            onClick={() => setMobileOpen(false)}
          >
            Services
          </Link>

          {/* NEW */}
          <Link
            href="/prop-funding"
            className="block hover:text-[#f0b90b]"
            onClick={() => setMobileOpen(false)}
          >
            Prop Funding
          </Link>

          <Link
            href="/#testimonials"
            className="block hover:text-[#f0b90b]"
            onClick={() => setMobileOpen(false)}
          >
            Testimonials
          </Link>
          <Link
            href="/#faqs"
            className="block hover:text-[#f0b90b]"
            onClick={() => setMobileOpen(false)}
          >
            FAQs
          </Link>
          <Link
            href="/news"
            className="block hover:text-[#f0b90b]"
            onClick={() => setMobileOpen(false)}
          >
            News
          </Link>
          <Link
            href="/community"
            className="block hover:text-[#f0b90b]"
            onClick={() => setMobileOpen(false)}
          >
            Community
          </Link>
          <Link
            href="/policies"
            className="block hover:text-[#f0b90b]"
            onClick={() => setMobileOpen(false)}
          >
            Policies
          </Link>

          <Link
            href="https://t.me/blakdhute"
            className="block px-4 py-2 rounded-lg font-semibold bg-[#f0b90b] text-black hover:bg-[#e2aa06] transition"
            onClick={() => setMobileOpen(false)}
          >
            Buy / Sell
          </Link>
        </div>
      )}
    </header>
  );
}
