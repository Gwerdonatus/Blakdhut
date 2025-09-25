"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { client } from "../lib/sanity.client";
import { urlFor } from "../lib/sanity.image";

type PriceData = { usd: number; usd_24h_change: number };

type CoinRow = {
  id: string;
  symbol: string;
  name: string;
  logo: string | any;
};

const POPULAR_COINS: CoinRow[] = [
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", logo: "/coins/bitcoin.jpeg" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", logo: "/coins/ethereum.jpg" },
  { id: "binancecoin", symbol: "BNB", name: "BNB", logo: "/coins/bnb.jpg" },
  { id: "ripple", symbol: "XRP", name: "XRP", logo: "/coins/xrp.jpg" },
  { id: "solana", symbol: "SOL", name: "Solana", logo: "/coins/sol.jpg" },
];

const COLORS = {
  bg: "#181A20",
  panel: "#1E2329",
  yellow: "#F0B90B",
  green: "#0ECB81",
  red: "#F6465D",
  border: "#2B3139",
  subtext: "#B7BDC6",
};

const fetcher = (query: string) => client.fetch(query);

async function fetchPrices(ids: string[]): Promise<Record<string, PriceData>> {
  if (!ids.length) return {};
  const params = new URLSearchParams();
  params.set("ids", ids.join(","));
  const res = await fetch(`/api/prices?${params.toString()}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Price API error");
  return res.json();
}

export default function Hero() {
  const [moved, setMoved] = useState<number>(4667380);
  const [displayed, setDisplayed] = useState<number>(4667380);
  const frame = useRef<number | null>(null);

  const [priceError, setPriceError] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("blakdhut_moved");
    if (saved) {
      const v = parseInt(saved, 10);
      if (!isNaN(v)) {
        setMoved(v);
        setDisplayed(v);
      }
    } else {
      localStorage.setItem("blakdhut_moved", "4667380");
    }
    const id = setInterval(() => {
      const inc = Math.floor(Math.random() * 500) + 1;
      setMoved((prev) => {
        const next = prev + inc;
        localStorage.setItem("blakdhut_moved", String(next));
        return next;
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const loop = () => {
      setDisplayed((prev) => {
        if (prev === moved) return prev;
        const diff = moved - prev;
        const step = Math.ceil(diff / 20);
        return prev + step;
      });
      frame.current = requestAnimationFrame(loop);
    };
    frame.current = requestAnimationFrame(loop);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [moved]);

  const TABS = ["Popular", "New Listing"] as const;
  const [active, setActive] = useState<(typeof TABS)[number]>("Popular");

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

  const { data: latestNews } = useSWR(
    `*[_type == "post"] | order(publishedAt desc)[0...3]{
      _id,
      title,
      slug,
      publishedAt
    }`,
    fetcher
  );

  const [prices, setPrices] = useState<Record<string, PriceData>>({});

  useEffect(() => {
    const ids =
      active === "Popular"
        ? POPULAR_COINS.map((c) => c.id)
        : (newCoins?.map((c: any) => c.coingeckoId) ?? []);

    if (!ids.length) return;

    fetchPrices(ids)
      .then((data) => {
        setPrices(data);
        setPriceError(false);
      })
      .catch(() => setPriceError(true));

    const t = setInterval(() => {
      fetchPrices(ids).then(setPrices).catch(() => setPriceError(true));
    }, 60_000);

    return () => clearInterval(t);
  }, [active, newCoins]);

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
      className="w-full min-h-screen flex flex-col items-center pt-20 sm:pt-24 lg:pt-28"
    >
      {/* Error banner */}
      {priceError && (
        <div className="w-full bg-[#F6465D] text-white text-center py-2 text-sm font-medium">
          ⚠️ Live prices are temporarily unavailable. Retrying…
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start">
        {/* Left side: headline */}
        <div className="flex flex-col justify-center gap-6 text-center lg:text-left">
          <div className="text-[44px] sm:text-[64px] lg:text-[92px] font-extrabold text-[#F0B90B] tracking-tight leading-tight">
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
          <div className="flex justify-center lg:justify-start mt-4">
            <a
              href="https://t.me/blakdhute"
              className="px-6 py-3 rounded-lg font-semibold text-lg shadow-md transition"
              style={{ backgroundColor: COLORS.yellow, color: "#0B0E11" }}
            >
              Buy / Sell Crypto
            </a>
          </div>
        </div>

        {/* Right: coins + news */}
        <div className="flex flex-col gap-6 w-full">
          {/* Coin panel */}
          <div
            className="rounded-2xl p-5 lg:p-6 w-full"
            style={{ backgroundColor: COLORS.panel, border: `1px solid ${COLORS.border}` }}
          >
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

          {/* News panel */}
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
            <div className="space-y-2">
              {latestNews?.map((post: any) => (
                <Link
                  key={post._id}
                  href={`/news/${post.slug.current}`}
                  className="block text-sm text-[#B7BDC6] hover:text-white"
                >
                  {post.title}
                </Link>
              )) ?? (
                <div className="text-sm text-[#B7BDC6]">No articles yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
