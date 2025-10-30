import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const update = await req.json();
    const message = update.message;
    if (!message) return NextResponse.json({ ok: true });

    const chatId = message.chat.id;
    const username = message.from.username;

    console.log("📩 Incoming from Telegram:", { chatId, username });

    // ✅ Respond to the user
    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: `✅ Your Telegram is now linked to Blakdhut.\n\nChat ID: ${chatId}\nUsername: @${username}`,
      }),
    });

    // ✅ Optional: send this info to your own backend or Sanity
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/telegram/save-chat-id`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, username }),
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Telegram webhook error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
