"use client";

import Link from "next/link";
import Image from "next/image";
import {
  FaTiktok,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
  FaTelegramPlane,
} from "react-icons/fa";

const COLORS = {
  bg: "#0B0E11",
  text: "#EAECEF",
  subtext: "#B7BDC6",
  yellow: "#F0B90B",
  border: "#2B3139",
};

export default function Footer() {
  return (
    <footer
      className="w-full border-t"
      style={{ backgroundColor: COLORS.bg, borderColor: COLORS.border }}
    >
      {/* Grid Section */}
      <div className="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand / About */}
        <div>
          <h2 className="text-white font-bold text-lg mb-3">Blakdhut</h2>
          <p className="text-sm text-[#B7BDC6] leading-relaxed">
            Blakdhut is the trusted exchange partner for individuals and
            businesses who demand speed, transparency, and reliability in every
            crypto trade.
          </p>
        </div>

        {/* QR Codes */}
        <div>
          <h3 className="text-white font-semibold mb-3">Join Us</h3>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Image
              src="/images/teleQR.jpg"
              alt="WhatsApp QR"
              width={120}
              height={120}
              className="rounded-lg border border-[#2B3139] object-contain"
            />
            <Image
              src="/images/TelegramQr.jpg"
              alt="Telegram QR"
              width={120}
              height={120}
              className="rounded-lg border border-[#2B3139] object-contain"
            />
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/policies"
                className="text-[#EAECEF] hover:text-[#F0B90B] transition"
              >
                Help Center
              </Link>
            </li>
            <li>
              <a
                href="mailto:support@blakdhut.com"
                className="text-[#EAECEF] hover:text-[#F0B90B] transition"
              >
                Contact Support
              </a>
            </li>
            <li>
              <Link
                href="/policies"
                className="text-[#EAECEF] hover:text-[#F0B90B] transition"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-white font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/policies"
                className="text-[#EAECEF] hover:text-[#F0B90B] transition"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="text-[#EAECEF] hover:text-[#F0B90B] transition"
              >
                Learn
              </Link>
            </li>
            <li>
              <Link
                href="/policies"
                className="text-[#EAECEF] hover:text-[#F0B90B] transition"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h3 className="text-white font-semibold mb-3">Community</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaTiktok className="text-lg text-[#EAECEF]" />
              <a
                href="https://www.tiktok.com/@blakdhute?_t=ZS-8zyh0fVMf7H&_r=1"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F0B90B] transition"
              >
                TikTok
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram className="text-lg text-[#EAECEF]" />
              <a
                href="https://www.instagram.com/blakdhute?igsh=MWx3cG5md3p2MmY4OA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F0B90B] transition"
              >
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaTwitter className="text-lg text-[#EAECEF]" />
              <a
                href="https://x.com/blakdhute?s=21"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F0B90B] transition"
              >
                Twitter
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaWhatsapp className="text-lg text-[#EAECEF]" />
              <a
                href="https://whatsapp.com/channel/0029Vaff2PW3rZZVjeJfLr1U"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F0B90B] transition"
              >
                WhatsApp
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaTelegramPlane className="text-lg text-[#EAECEF]" />
              <a
                href="https://t.me/blakdhutexchange"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F0B90B] transition"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom note */}
      <div
        className="w-full text-center py-6 border-t"
        style={{ borderColor: COLORS.border }}
      >
        <p className="text-sm text-[#B7BDC6]">
          © {new Date().getFullYear()} Blakdhut. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
