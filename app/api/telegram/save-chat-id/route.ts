import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { chatId, username } = await req.json();

    // Find the document in Sanity where telegramUsername matches
    const res = await fetch(
      `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-03-25/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
        },
        body: JSON.stringify({
          mutations: [
            {
              patch: {
                query: `*[_type == "kycSubmission" && telegramUsername == "${username}"][0]`,
                set: { telegramChatId: chatId.toString() },
              },
            },
          ],
        }),
      }
    );

    const data = await res.json();
    console.log("✅ Chat ID saved:", data);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Save chat ID error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
