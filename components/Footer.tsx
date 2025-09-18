"use client";
import Image from "next/image";
import Link from "next/link";

const COLORS = {
  bg: "#0B0E11",
  text: "#EAECEF",
  subtext: "#B7BDC6",
  yellow: "#F0B90B",
  border: "#2B3139",
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: COLORS.bg }} className="border-t border-[#2B3139]">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Logo + About */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src="/blakdhut.jpg"
              alt="Blakdhut Logo"
              width={32}
              height={32}
              className="rounded-sm h-8 w-8"
            />
            <span className="text-[#f0b90b] font-extrabold tracking-wide text-lg">
              BLAKDHUT EXCHANGE
            </span>
          </div>
          <p className="text-[#B7BDC6] leading-relaxed text-sm">
            Fast. Secure. Reliable Crypto Trading.  
            Buy, sell, and swap crypto with full transparency and zero scams.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-4">Explore</h3>
          <ul className="space-y-2 text-[#B7BDC6]">
            <li>
              <Link href="/" className="hover:text-[#f0b90b]">Services</Link>
            </li>
            <li>
              <Link href="/news" className="hover:text-[#f0b90b]">News</Link>
            </li>
            <li>
              <Link href="/policies" className="hover:text-[#f0b90b]">Policies</Link>
            </li>
            <li>
              <Link href="/testimonials" className="hover:text-[#f0b90b]">Testimonials</Link>
            </li>
          </ul>
        </div>

        {/* QR Codes */}
        <div>
          <h3 className="text-white font-semibold mb-4">Join Us</h3>
          <div className="flex gap-6 items-center">
            <div className="text-center">
              <Image
                src="/images/TelegramQr.jpg"
                alt="Telegram QR"
                width={100}
                height={100}
                className="rounded-lg border border-[#2B3139]"
              />
              <p className="text-xs mt-2 text-[#B7BDC6]">Telegram</p>
            </div>
            <div className="text-center">
              <Image
                src="/images/teleQR.jpg"
                alt="WhatsApp QR"
                width={100}
                height={100}
                className="rounded-lg border border-[#2B3139]"
              />
              <p className="text-xs mt-2 text-[#B7BDC6]">WhatsApp</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <p className="text-[#B7BDC6]">Email: support@blakdhut.com</p>
          <p className="text-[#B7BDC6]">Telegram: @Blakdhut</p>
          <p className="text-[#B7BDC6]">WhatsApp: +234 7080 364541</p>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#2B3139] text-center py-6 text-[#B7BDC6] text-xs">
        © {new Date().getFullYear()} Blakdhut Exchange. All rights reserved.
      </div>
    </footer>
  );
}
