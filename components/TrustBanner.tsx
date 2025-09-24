"use client";
import Image from "next/image";

export default function TrustStrip() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-[#181A20]">
      {/* ✅ Background image removed */}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 text-center flex flex-col gap-6">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
          Where Crypto Meets{" "}
          <span className="text-[#F0B90B]">TRUST</span>
        </h2>

        <p className="max-w-2xl mx-auto text-[#B7BDC6] text-base sm:text-lg leading-relaxed">
          Not just a transaction. A lifeline. Whether you’re cashing out in a rush,
          sending money to family, or funding a dream — Blakdhut is the reliable
          bridge between your digital coins and real-world needs.
        </p>

        <div className="flex justify-center gap-4 mt-4">
          <a
            href="https://t.me/blakdhute"
            className="px-6 py-3 bg-[#F0B90B] text-black rounded-lg font-semibold hover:bg-[#e2aa06] transition"
          >
            Trade on Telegram
          </a>
          <a
            href="https://wa.me/2347080364541"
            className="px-6 py-3 border border-[#F0B90B] text-[#F0B90B] rounded-lg font-semibold hover:bg-[#F0B90B] hover:text-black transition"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
