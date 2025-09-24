"use client";
import { useState } from "react";
import { FaHeadphones } from "react-icons/fa";

const COLORS = {
  yellow: "#F0B90B",
  bg: "#181A20",
  panel: "#1E2329",
  text: "#EAECEF",
  border: "#2B3139",
};

export default function SupportWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 flex items-center justify-center rounded-full shadow-lg transition hover:scale-105"
        style={{ backgroundColor: COLORS.yellow }}
      >
        <FaHeadphones className="text-black text-2xl" />
      </button>

      {/* Support Panel */}
      {open && (
        <div
          className="absolute bottom-20 right-0 w-72 rounded-xl shadow-xl p-4"
          style={{
            backgroundColor: COLORS.panel,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <h3 className="text-white font-semibold text-lg mb-2">
            Need Help?
          </h3>
          <p className="text-sm text-[#B7BDC6] mb-4">
            Our support is available 24/7. Choose a channel below:
          </p>

          <div className="flex flex-col gap-3">
            <a
              href="https://t.me/blakdhute"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium text-center transition"
              style={{
                backgroundColor: COLORS.yellow,
                color: "#0B0E11",
              }}
            >
              📲 Chat on Telegram
            </a>
            <a
              href="https://wa.me/2347080364541"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg text-sm font-medium text-center transition border"
              style={{
                borderColor: COLORS.border,
                color: COLORS.text,
              }}
            >
              💬 Chat on WhatsApp
            </a>
            <a
              href="mailto:suppor@blakdhut.com"
              className="px-4 py-2 rounded-lg text-sm font-medium text-center transition border"
              style={{
                borderColor: COLORS.border,
                color: COLORS.text,
              }}
            >
              ✉️ Email Support
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
