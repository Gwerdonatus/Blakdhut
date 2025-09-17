"use client";

import Header from "@/components/Header";

export default function PoliciesPage() {
  return (
    <main className="min-h-screen bg-[#181A20] text-white">
      {/* ✅ Shared Header */}
      <Header />

      {/* Page Content */}
      <section className="pt-32 pb-20">
        <div className="max-w-6xl mx-auto px-6 space-y-20">
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-[#F0B90B]">
            About Blakdhut
          </h1>

          {/* Video with gradient background */}
          <div className="relative rounded-xl overflow-hidden shadow-lg aspect-video">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0e11]/50 to-transparent z-10"></div>
            <iframe
              className="w-full h-full relative z-20"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Blakdhut About Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* About Section */}
          <div className="space-y-6">
            <p className="text-[#B7BDC6] text-lg leading-relaxed">
              <span className="text-white font-semibold">Blakdhut Exchange</span>{" "}
              was built with a simple but powerful vision: to create a crypto
              platform that people can actually trust. After years of seeing
              unreliable exchanges and slow, frustrating transactions, we set
              out to build something different — a secure, transparent, and
              reliable exchange designed for real people and businesses.
            </p>

            <p className="text-[#B7BDC6] text-lg leading-relaxed">
              Today, Blakdhut helps clients across{" "}
              <span className="text-white font-semibold">
                Nigeria, Ghana, Cameroon, and the United States
              </span>{" "}
              buy, sell, swap, and make payments with cryptocurrency. Every
              trade is backed by blockchain proof or official bank receipts, so
              you always have complete transparency.
            </p>

            <p className="text-[#B7BDC6] text-lg leading-relaxed">
              With over{" "}
              <span className="text-white font-semibold">
                $150K processed monthly
              </span>
              ,{" "}
              <span className="text-white font-semibold">
                2000+ active clients
              </span>
              , and{" "}
              <span className="text-white font-semibold">
                zero breaches since launch
              </span>
              , we’ve proven that crypto trading can be both fast and safe.
            </p>

            <div className="mt-6">
              <h2 className="text-xl font-bold text-white mb-3">
                Our Core Values
              </h2>
              <ul className="list-disc list-inside space-y-2 text-[#B7BDC6] text-lg">
                <li>
                  <span className="text-white font-semibold">Trust</span> – Every
                  transaction is transparent and verified.
                </li>
                <li>
                  <span className="text-white font-semibold">Reliability</span> – 
                  Guaranteed fulfillment on every trade.
                </li>
                <li>
                  <span className="text-white font-semibold">Security</span> – 
                  Zero breaches since launch.
                </li>
                <li>
                  <span className="text-white font-semibold">Human Support</span>{" "}
                  – Real people available 24/7.
                </li>
              </ul>
            </div>
          </div>

          {/* Policies Grid */}
          <div>
            <h2 className="text-center text-2xl sm:text-3xl font-bold text-white mb-10">
              Compliance & Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-[#1E2329] border border-[#2B3139]">
                <h3 className="text-xl font-semibold text-white mb-3">
                  KYC Verification
                </h3>
                <p className="text-[#B7BDC6] text-sm leading-relaxed">
                  All users must pass Know Your Customer (KYC) verification
                  before trading. This ensures every account is tied to a real
                  identity, preventing fraud and abuse.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1E2329] border border-[#2B3139]">
                <h3 className="text-xl font-semibold text-white mb-3">
                  No Fraudulent Funds
                </h3>
                <p className="text-[#B7BDC6] text-sm leading-relaxed">
                  We do not accept stolen or fraudulent funds. Suspicious
                  deposits and withdrawals are flagged and reviewed immediately.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1E2329] border border-[#2B3139]">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Verified Transactions
                </h3>
                <p className="text-[#B7BDC6] text-sm leading-relaxed">
                  Every transaction is confirmed with a blockchain hash or
                  verified bank receipt. This provides complete transparency for
                  both buyers and sellers.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#1E2329] border border-[#2B3139]">
                <h3 className="text-xl font-semibold text-white mb-3">
                  Fraud Monitoring
                </h3>
                <p className="text-[#B7BDC6] text-sm leading-relaxed">
                  Our system monitors trades for unusual patterns or suspicious
                  activity. We act fast to prevent losses and keep your funds
                  safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto mb-12 px-6">
        <div className="rounded-xl border border-[#F0B90B] bg-[#1E2329] px-6 py-4 text-center font-semibold text-sm text-[#EAECEF] shadow-md">
          ⚠️ <span className="font-bold">Disclaimer:</span> Blakdhut is not yet
          licensed as a financial institution by SEC Nigeria or CBN. However, we
          enforce strict internal compliance (KYC/AML) to ensure safe and
          transparent transactions.
        </div>
      </div>
    </main>
  );
}
