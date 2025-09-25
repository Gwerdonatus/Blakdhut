import { NextResponse } from "next/server";

// CoinGecko Simple Price proxy with short cache to avoid client rate limits
export const revalidate = 60; // ISR for 60s

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get("ids");

  if (!ids) {
    return NextResponse.json({}, { status: 200 });
  }

  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(
    ids
  )}&vs_currencies=usd&include_24hr_change=true`;

  try {
    const res = await fetch(url, {
      // cache on the server for a minute
      next: { revalidate: 60 },
      headers: {
        // optional: if you have a CG key, uncomment and add env:
        // "x-cg-pro-api-key": process.env.CG_API_KEY ?? "",
      },
    });

    if (!res.ok) {
      return NextResponse.json({}, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "s-maxage=60, stale-while-revalidate=60",
      },
    });
  } catch {
    return NextResponse.json({}, { status: 200 });
  }
}
