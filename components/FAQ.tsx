"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const COLORS = {
  bg: "#181A20",
  panel: "#1E2329",
  border: "#2B3139",
  yellow: "#F0B90B",
  text: "#EAECEF",
  subtext: "#B7BDC6",
};

const FAQS = [
  {
    q: "What is the actual monthly trading volume?",
    a: "$150,000+ Processed Monthly\nTrusted by hundreds of clients who rely on Blakdhut for fast and secure trades every month.",
  },
  {
    q: "Active clients served?",
    a: "Trusted by 2000+ Active Clients\nFrom everyday traders to established businesses, our growing community relies on Blakdhut every day.",
  },
  {
    q: "Countries served?",
    a: "Currently, We have Traded With Clients In Nigeria, Ghana, Cameroon And the United States\nAnd We Are Expanding Globally.",
  },
  {
    q: "Average processing time?",
    a: "Reliable Speed\nTrades typically process in 5–10 minutes, and always within 15–45 minutes. In the rare event of bank or network issues, we will keep you updated every step of the way.",
  },
  {
    q: "Do users receive blockchain confirmation receipts for all transactions?",
    a: "Transparency You Can Track\nWe provide blockchain confirmations for crypto transfers and official bank receipts for fiat payments — so you always have proof of every transaction.",
  },
  {
    q: "Are fees and rates fixed, variable, or market-driven?",
    a: "No Hidden Fees\nRates are market-driven and updated in real time, so you always know exactly what you’re paying — with zero surprises.",
  },
  {
    q: "Is there 24/7 support or monitoring?",
    a: "Real Humans, Anytime\nEvery client has direct access to our team 24/7. No automated replies, no waiting days for answers — just fast, personal support.",
  },
  {
    q: "Is my money actually safe ?",
    a: "Safe, Verified, and Transparent\nYour money is safe with Blakdhut. We only work with verified clients (KYC), provide proof for every trade, and have maintained a flawless zero-breach record since launch.",
  },
  {
    q: "Which payment methods do you support?",
    a: "We support bank transfers, crypto-to-crypto swaps, and fiat payments via trusted banking partners. More options are being added regularly.",
  },
  {
    q: "Can I trade from outside Nigeria?",
    a: "Yes. Blakdhut already serves clients in Ghana, Cameroon, and the U.S., and we are expanding globally.",
  },
  {
    q: "Do you offer large-volume (OTC) trading?",
    a: "Yes. For high-net-worth clients and businesses, we offer over-the-counter (OTC) services with personalized support and competitive rates.",
  },
  {
    q: "How do I contact Blakdhut support?",
    a: "You can reach us via Telegram (@blakdhutexchange), WhatsApp channel, or through our website contact form. Our team replies instantly 24/7.",
  },
  {
    q: "Why do we ask for KYC (Know Your Customer)?",
    a: "We require KYC to protect both our customers and our platform. It helps us:\n\n• Prevent fraud and scams – Verifying identity makes it harder for bad actors to misuse accounts.\n• Comply with regulations – Financial laws require exchanges to know who is trading to stop money laundering and terrorist financing.\n• Increase trust and security – Verified accounts enjoy safer transactions, fewer restrictions, and faster issue resolution.\n• Enable higher limits – Completing KYC gives you access to bigger transaction limits and full platform features.",
  },
  {
    q: "What documents are accepted for KYC?",
    a: "To complete your verification, we accept any one of the following valid government-issued IDs:\n\n• National Identity Card (NIN Slip or NIN Card)\n• International Passport\n• Driver's License\n• Permanent Voter's Card\n\nYou may also be asked to provide:\n• A recent utility bill, bank statement, or proof of address (not older than 3 months).\n• A selfie to confirm you are the true owner of the submitted document.",
  },
];


export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faqs"
      style={{ backgroundColor: COLORS.bg }}
      className="w-full py-20 border-t border-[#2B3139]"
    >
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-[#F0B90B]">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-[#B7BDC6] max-w-2xl mx-auto">
          Answers to the most common questions about trading, security, and
          support on Blakdhut.
        </p>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#2B3139] bg-[#1E2329] overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggle(i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center text-[#EAECEF] font-medium hover:text-[#F0B90B] transition"
              >
                {faq.q}
                <span className="text-[#F0B90B] text-lg font-bold">
                  {openIndex === i ? "−" : "+"}
                </span>
              </button>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 text-[#B7BDC6] text-sm leading-relaxed whitespace-pre-line"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
