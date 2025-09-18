"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

type CGIds = "bitcoin" | "ethereum" | "binancecoin" | "ripple" | "solana";

type CoinRow = {
  id: CGIds;
  symbol: string;
  name: string;
  logo: string;
};

type PriceData = {
  usd: number;
  usd_24h_change: number;
};

const COINS: CoinRow[] = [
  { id: "bitcoin",     symbol: "BTC", name: "Bitcoin",  logo: "/coins/bitcoin.jpeg" },
  { id: "ethereum",    symbol: "ETH", name: "Ethereum", logo: "/coins/ethereum.jpg" },
  { id: "binancecoin", symbol: "BNB", name: "BNB",      logo: "/coins/bnb.jpg" },
  { id: "ripple",      symbol: "XRP", name: "XRP",      logo: "/coins/xrp.jpg" },
  { id: "solana",      symbol: "SOL", name: "Solana",   logo: "/coins/sol.jpg" },
];

const COLORS = {
  bg:      "#181A20",
  panel:   "#1E2329",
  text:    "#EAECEF",
  subtext: "#B7BDC6",
  yellow:  "#F0B90B",
  green:   "#0ECB81",
  red:     "#F6465D",
  border:  "#2B3139",
};

export default function Hero() {
  const [moved, setMoved] = useState<number>(4667380);
  const [displayed, setDisplayed] = useState<number>(4667380);
  const animationFrame = useRef<number | null>(null);

  // Load + persist value in localStorage
  useEffect(() => {
    const saved = localStorage.getItem("blakdhut_moved");
    if (saved) {
      const val = parseInt(saved, 10);
      if (!isNaN(val)) {
        setMoved(val);
        setDisplayed(val);
      }
    } else {
      localStorage.setItem("blakdhut_moved", "4667380");
    }

    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 500) + 1;
      setMoved((prev) => {
        const newValue = prev + increment;
        localStorage.setItem("blakdhut_moved", newValue.toString());
        return newValue;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Smooth animation
  useEffect(() => {
    const animate = () => {
      setDisplayed((prev) => {
        if (prev === moved) return prev;
        const diff = moved - prev;
        const step = Math.ceil(diff / 20);
        return prev + step;
      });
      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [moved]);

  // Tabs
  const TABS = ["Popular", "New Listing"] as const;
  const [active, setActive] = useState<typeof TABS[number]>("Popular");

  // Live prices
  const [data, setData] = useState<Record<CGIds, PriceData>>({
    bitcoin: { usd: 0, usd_24h_change: 0 },
    ethereum: { usd: 0, usd_24h_change: 0 },
    binancecoin: { usd: 0, usd_24h_change: 0 },
    ripple: { usd: 0, usd_24h_change: 0 },
    solana: { usd: 0, usd_24h_change: 0 },
  });

  const fetchData = async () => {
    try {
      const ids = COINS.map((c) => c.id).join(",");
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const json: Record<CGIds, PriceData> = await res.json();
      setData(json);
    } catch (e) {
      console.error("Price fetch failed", e);
    }
  };

  useEffect(() => {
    fetchData();
    const id = setInterval(fetchData, 60_000);
    return () => clearInterval(id);
  }, []);

  const list = useMemo(() => {
    return active === "Popular" ? COINS : [...COINS].reverse();
  }, [active]);

  return (
    <section
      style={{ backgroundColor: COLORS.bg }}
      className="w-full min-h-screen flex items-center pt-0 lg:pt-5"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-stretch">
        {/* Left */}
        <div className="flex flex-col justify-center gap-6 text-center lg:text-left">
          <div className="text-[38px] sm:text-[50px] lg:text-[68px] font-extrabold text-[#F0B90B] tracking-tight">
            ${displayed.toLocaleString()}
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
            Moved with <span className="text-[#F0B90B]">zero delays</span>,{" "}
            <span className="text-[#F0B90B]">zero scams</span>.
          </h1>
          <p className="text-base sm:text-lg text-[#B7BDC6] max-w-xl mx-auto lg:mx-0">
            Blakdhut is the trusted exchange partner for individuals and
            businesses who demand speed, transparency, and reliability in every
            crypto trade.
          </p>

          <div className="flex justify-center lg:justify-start mt-6">
            <a
              href="https://t.me/blakdhute"
              className="px-6 py-3 rounded-lg font-semibold text-lg shadow-md transition"
              style={{ backgroundColor: COLORS.yellow, color: "#0B0E11" }}
            >
              Buy / Sell Crypto
            </a>
          </div>
        </div>

        {/* Right: Coin Panel */}
        <div className="flex h-full">
          <div
            className="rounded-2xl p-5 lg:p-6 w-full flex flex-col justify-between"
            style={{ backgroundColor: COLORS.panel, border: `1px solid ${COLORS.border}` }}
          >
            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-[#2B3139] pb-2">
              <div className="flex gap-6">
                {TABS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActive(t)}
                    className={`pb-2 text-sm ${
                      active === t
                        ? "text-white font-semibold border-b-2 border-[#F0B90B]"
                        : "text-[#B7BDC6]"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <a href="#" className="text-xs text-[#B7BDC6] hover:text-white">
                View All 350+ Coins &gt;
              </a>
            </div>

            {/* Prices */}
            <div className="mt-4 space-y-3 flex-1">
              {list.map((c) => {
                const row = data[c.id];
                const price = row?.usd ?? 0;
                const change = row?.usd_24h_change ?? 0;
                const changeColor = change >= 0 ? COLORS.green : COLORS.red;

                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}` }}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={c.logo}
                        alt={c.symbol}
                        width={24}
                        height={24}
                        className="rounded-full h-6 w-6"
                      />
                      <span className="text-sm text-white font-semibold">{c.symbol}</span>
                      <span className="text-sm text-[#B7BDC6]">{c.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-sm text-white font-medium">
                        {price ? `$${price.toLocaleString()}` : "—"}
                      </span>
                      <span className="text-sm font-medium" style={{ color: changeColor }}>
                        {price ? `${change.toFixed(2)}%` : ""}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
