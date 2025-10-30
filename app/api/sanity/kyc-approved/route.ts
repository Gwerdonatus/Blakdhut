import { NextRequest, NextResponse } from "next/server";
import { sendKycEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const doc = payload?.body || payload;

    const email = doc?.email;
    const status = doc?.status;

    if (!email) {
      return NextResponse.json({ ok: false, error: "No email in KYC doc" }, { status: 400 });
    }

    if (status !== "approved" && status !== "rejected") {
      return NextResponse.json({ ok: true, skipped: "No action for this status" });
    }

    await sendKycEmail(email, status);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("KYC email error:", err);
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
