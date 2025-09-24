"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import { client } from "../lib/sanity.client";
import { urlFor } from "../lib/sanity.image";

// ---------------- Types ----------------
type PriceData = { usd: number; usd_24h_change: number };

type CoinRow = {
  id: string;
  symbol: string;
  name: string;
  logo: string | any;
};

// ---------------- Static Popular Coins ----------------
const POPULAR_COINS: CoinRow[] = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", logo: "/coins/bitcoin.jpeg" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", logo: "/coins/ethereum.jpg" },
  { id: "binancecoin", symbol: "BNB", name: "BNB", logo: "/coins/bnb.jpg" },
  { id: "ripple", symbol: "XRP", name: "XRP", logo: "/coins/xrp.jpg" },
  { id: "solana", symbol: "SOL", name: "Solana", logo: "/coins/sol.jpg" },
];

// ---------------- Colors ----------------
const COLORS = {
  bg: "#181A20",
  panel: "#1E2329",
  yellow: "#F0B90B",
  green: "#0ECB81",
  red: "#F6465D",
  border: "#2B3139",
  subtext: "#B7BDC6",
};

// ---------------- Sanity Fetch ----------------
const fetcher = (query: string) => client.fetch(query);

export default function Hero() {
  // Animated counter
  const [moved, setMoved] = useState<number>(4667380);
  const [displayed, setDisplayed] = useState<number>(4667380);
  const animationFrame = useRef<number | null>(null);

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
      if (animationFrame.current !== null) cancelAnimationFrame(animationFrame.current);
    };
  }, [moved]);

  // Tabs
  const TABS = ["Popular", "New Listing"] as const;
  const [active, setActive] = useState<typeof TABS[number]>("Popular");

  // Fetch new coins
  const { data: newCoins } = useSWR(
    `*[_type == "coin" && isNewListing == true] | order(_createdAt desc)[0...5]{
      _id,
      name,
      symbol,
      coingeckoId,
      logo
    }`,
    fetcher
  );

  // Fetch latest news
  const { data: latestNews } = useSWR(
    `*[_type == "post"] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      publishedAt
    }`,
    fetcher
  );

  // Prices
  const [prices, setPrices] = useState<Record<string, PriceData>>({});
  const [priceError, setPriceError] = useState<boolean>(false);

  const fetchPrices = async (ids: string[]) => {
    if (!ids.length) return;
    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(
        ","
      )}&vs_currencies=usd&include_24hr_change=true`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Network error");
      const json: Record<string, PriceData> = await res.json();
      setPrices(json);
      setPriceError(false);
    } catch (e) {
      console.error("Price fetch failed", e);
      setPriceError(true);
    }
  };

  useEffect(() => {
    const ids =
      active === "Popular"
        ? POPULAR_COINS.map((c) => c.id)
        : newCoins?.map((c: any) => c.coingeckoId) || [];

    if (ids.length) fetchPrices(ids);
    const interval = setInterval(() => fetchPrices(ids), 60_000);
    return () => clearInterval(interval);
  }, [active, newCoins]);

  // Coin list
  const list: CoinRow[] = useMemo(() => {
    if (active === "Popular") return POPULAR_COINS;
    if (newCoins?.length) {
      return newCoins.map((c: any) => ({
        id: c.coingeckoId,
        symbol: c.symbol,
        name: c.name,
        logo: c.logo,
      }));
    }
    return [];
  }, [active, newCoins]);

  return (
    <section
      style={{ backgroundColor: COLORS.bg }}
      className="w-full min-h-screen flex flex-col items-center pt-4 lg:pt-6"
    >
      {/* Error Banner */}
      {priceError && (
        <div className="w-full bg-[#F6465D] text-white text-center py-2 text-sm font-medium">
          ⚠️ Live prices are temporarily unavailable. Retrying...
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 w-full items-start">
        {/* Left: Counter + Info */}
        <div className="flex flex-col justify-center gap-6 text-center lg:text-left">
          <div className="text-[50px] sm:text-[72px] lg:text-[92px] font-extrabold text-[#F0B90B] tracking-tight leading-tight">
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

        {/* Right: Coins + News */}
        <div className="flex flex-col gap-6 w-full">
          {/* Coin Panel */}
          <div
            className="rounded-2xl p-5 lg:p-6 w-full"
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
               &gt;
              </a>
            </div>

            {/* Prices */}
            <div className="mt-4 space-y-3">
              {list.map((c) => {
                const row = prices[c.id];
                const price = row?.usd ?? null;
                const change = row?.usd_24h_change ?? null;
                const changeColor = change && change >= 0 ? COLORS.green : COLORS.red;

                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-between rounded-xl px-4 py-3"
                    style={{ backgroundColor: COLORS.bg, border: `1px solid ${COLORS.border}` }}
                  >
                    <div className="flex items-center gap-3">
                      <Image
                        src={
                          typeof c.logo === "string"
                            ? c.logo
                            : urlFor(c.logo).width(40).height(40).url()
                        }
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
                        {price ? `$${price.toLocaleString()}` : "— Price unavailable"}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: change ? changeColor : COLORS.subtext }}
                      >
                        {change ? `${change.toFixed(2)}%` : "—"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* News Panel */}
          <div
            className="rounded-2xl p-5 lg:p-6 w-full"
            style={{ backgroundColor: COLORS.panel, border: `1px solid ${COLORS.border}` }}
          >
            <div className="flex items-center justify-between border-b border-[#2B3139] pb-2 mb-3">
              <h2 className="text-sm font-semibold text-white">News</h2>
              <Link href="/news" className="text-xs text-[#B7BDC6] hover:text-white">
                View All News &gt;
              </Link>
            </div>

            <div className="space-y-3">
              {latestNews?.map((post: any) => {
                const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
                return (
                  <Link
                    key={post._id}
                    href={`/news/${post.slug.current}`}
                    className="block group"
                  >
                    <div className="flex items-center justify-between">
                      {/* Title */}
                      <span className="text-sm text-[#B7BDC6] group-hover:text-white truncate">
                        {post.title}
                      </span>

                      {/* Dot + Date */}
                      <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                        <span className="w-1 h-1 rounded-full bg-[#6E767D]"></span>
                        <span className="text-xs text-[#6E767D]">{date}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
