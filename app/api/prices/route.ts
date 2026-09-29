import { NextResponse } from "next/server";

type PriceData = { usd: number; usd_24h_change: number };
type PriceResponse = Record<string, PriceData>;

const COINPAPRIKA_IDS: Record<string, string> = {
  bitcoin: "btc-bitcoin",
  ethereum: "eth-ethereum",
  binancecoin: "bnb-binance-coin",
  ripple: "xrp-xrp",
  solana: "sol-solana",
};

const CACHE_HEADERS = {
  "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
};

export const revalidate = 60;

async function fetchCoinGecko(ids: string[]): Promise<PriceResponse> {
  const params = new URLSearchParams({
    ids: ids.join(","),
    vs_currencies: "usd",
    include_24hr_change: "true",
  });
  const response = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?${params.toString()}`,
    {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
    }
  );

  if (!response.ok) {
    throw new Error(`CoinGecko returned ${response.status}`);
  }

  const data = (await response.json()) as PriceResponse;
  if (!Object.keys(data).length) {
    throw new Error("CoinGecko returned an empty price response");
  }
  return data;
}

async function fetchCoinPaprika(ids: string[]): Promise<PriceResponse> {
  const supportedIds = ids.filter((id) => COINPAPRIKA_IDS[id]);
  if (!supportedIds.length) {
    throw new Error("CoinPaprika has no mapping for the requested assets");
  }

  const rows = await Promise.all(
    supportedIds.map(async (id) => {
      const response = await fetch(
        `https://api.coinpaprika.com/v1/tickers/${COINPAPRIKA_IDS[id]}?quotes=USD`,
        {
          next: { revalidate: 60 },
          headers: { Accept: "application/json" },
        }
      );
      if (!response.ok) {
        throw new Error(`CoinPaprika returned ${response.status} for ${id}`);
      }

      const data = (await response.json()) as {
        quotes?: {
          USD?: { price?: number; percent_change_24h?: number };
        };
      };
      const quote = data.quotes?.USD;
      if (typeof quote?.price !== "number") {
        throw new Error(`CoinPaprika returned no USD price for ${id}`);
      }

      return [
        id,
        {
          usd: quote.price,
          usd_24h_change:
            typeof quote.percent_change_24h === "number"
              ? quote.percent_change_24h
              : 0,
        },
      ] as const;
    })
  );

  return Object.fromEntries(rows);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = Array.from(
    new Set(
      (searchParams.get("ids") ?? "")
        .split(",")
        .map((id) => id.trim().toLowerCase())
        .filter((id) => /^[a-z0-9-]+$/.test(id))
    )
  ).slice(0, 20);

  if (!ids.length) {
    return NextResponse.json({}, { headers: CACHE_HEADERS });
  }

  try {
    const prices = await fetchCoinGecko(ids);
    return NextResponse.json(prices, { headers: CACHE_HEADERS });
  } catch (error) {
    console.warn("[api/prices] CoinGecko failed; trying CoinPaprika", {
      error: error instanceof Error ? error.message : String(error),
      ids,
    });
  }

  try {
    const prices = await fetchCoinPaprika(ids);
    return NextResponse.json(prices, { headers: CACHE_HEADERS });
  } catch (error) {
    console.error("[api/prices] All price providers failed", {
      error: error instanceof Error ? error.message : String(error),
      ids,
    });
    return NextResponse.json(
      { error: "Live prices are temporarily unavailable" },
      { status: 502, headers: { "Cache-Control": "no-store" } }
    );
  }
}
