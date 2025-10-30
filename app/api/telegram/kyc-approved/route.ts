import { NextRequest, NextResponse } from "next/server";

const TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

export async function POST(req: NextRequest) {
  const payload = await req.json();
  console.log("📩 Sanity Webhook Received:", payload);

  const doc = payload.body || payload;
  const chatId = doc.telegramChatId;

  if (!chatId) {
    console.error("❌ No chat ID found in doc:", doc);
    return NextResponse.json({ ok: false, error: "No chat ID found" }, { status: 400 });
  }

  const message = `✅ Hi ${doc.fullName || "there"}, your KYC has been approved.\nYou can now trade on Blakdhut.`;

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "HTML" }),
  });

  const data = await res.json();
  if (!data.ok) {
    console.error("❌ Telegram Error:", data);
    return NextResponse.json({ ok: false, error: data.description }, { status: 400 });
  }

  console.log("✅ Telegram Message Sent to:", chatId);
  return NextResponse.json({ ok: true });
}
