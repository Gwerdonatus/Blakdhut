"use client";
import {
  FaExchangeAlt,
  FaWallet,
  FaCoins,
  FaBuilding,
  FaChartLine,
} from "react-icons/fa";
import Link from "next/link";

const COLORS = {
  bg: "#181A20",
  panel: "#1E2329",
  text: "#EAECEF",
  subtext: "#B7BDC6",
  yellow: "#F0B90B",
  border: "#2B3139",
};

const SERVICES = [
  {
    icon: <FaExchangeAlt className="text-[#F0B90B] text-3xl" />,
    title: "Buy, Sell & Swap Crypto",
    desc: "Execute fast and secure transactions at competitive rates. Whether converting Naira to crypto, cashing out, or swapping between digital assets, Blakdhut delivers seamless execution with guaranteed confirmations.",
    link: "/blog/buy-sell-swap",
  },
  {
    icon: <FaWallet className="text-[#F0B90B] text-3xl" />,
    title: "Payments With Crypto",
    desc: "Leverage cryptocurrency for real-world payments. From bills and personal purchases to real estate and vehicle acquisitions, we ensure smooth, transparent, and compliant transfers to sellers or service providers.",
    link: "/blog/payments",
  },
  {
    icon: <FaCoins className="text-[#F0B90B] text-3xl" />,
    title: "Crypto On Demand",
    desc: "Access any cryptocurrency you require — delivered directly to your wallet. Ideal for investors, traders, and businesses seeking specific or hard-to-source digital assets without the technical barriers.",
    link: "/blog/crypto-on-demand",
  },
  {
    icon: <FaBuilding className="text-[#F0B90B] text-3xl" />,
    title: "Business Solutions",
    desc: "Empowering entrepreneurs and companies with structured crypto support. From vendor payments and international settlements to bulk liquidity needs, Blakdhut provides reliable, scalable solutions tailored to business operations.",
    link: "/blog/business-solutions",
  },

  // ✅ NEW SERVICE: Prop Funding
  {
    icon: <FaChartLine className="text-[#F0B90B] text-3xl" />,
    title: "Prop Firm Funding",
    desc: "Fast, structured prop firm funding using USDT/USDC. Share your prop firm and account size, get a clear confirmation of total + fee, then we execute — no card stress, no P2P delays.",
    link: "/prop-funding",
  },
];

export default function Services() {
  return (
    // 🔹 Added id="services" so the header link works
    <section
      id="services"
      style={{ backgroundColor: COLORS.bg }}
      className="w-full py-20"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Headline */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Our Services
          </h2>
          <p className="text-[#B7BDC6] max-w-2xl mx-auto text-lg">
            Comprehensive solutions for individuals and businesses navigating
            the crypto economy.
          </p>
        </div>

        {/* Service Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className="rounded-2xl p-6 flex flex-col gap-4 justify-between transition hover:shadow-lg hover:scale-[1.02]"
              style={{
                backgroundColor: COLORS.panel,
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-shrink-0">{s.icon}</div>
                  <h3 className="text-xl font-bold text-white">{s.title}</h3>
                </div>
                <p className="text-[#B7BDC6] text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>

              {/* Slim Button (now uses each service link) */}
              <div className="mt-3">
                <Link
                  href={s.link}
                  className="inline-block px-4 py-1.5 rounded-md font-medium text-sm transition hover:opacity-95"
                  style={{
                    backgroundColor: COLORS.yellow,
                    color: "#0B0E11",
                  }}
                >
                  Learn More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}