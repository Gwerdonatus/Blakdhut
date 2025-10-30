// app/api/kyc/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const kyc = body?.body;

  if (!kyc) return NextResponse.json({ ok: false });

  const telegram = kyc?.telegram;
  const fullName = kyc?.fullName;

  if (!telegram) return NextResponse.json({ ok: false, msg: 'No Telegram' });

  const message = `
🎉 *KYC Approved!*
Hello ${fullName},

Your verification has been approved ✅
You can now enjoy full access on *Blakdhut Exchange*.

🚀 Visit: https://www.blakdhut.com
`;

  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: `@${telegram}`,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Telegram error:', err);
    return NextResponse.json({ error: 'Failed to send Telegram message' }, { status: 500 });
  }
}
