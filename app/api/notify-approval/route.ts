import { NextRequest, NextResponse } from "next/server";
import { sendKycEmail } from "@/lib/mailer"; // ✅ reuse your styled function

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    console.log("📩 Sanity Webhook Received:", payload);

    // Sanity sends data either inside body or at root
    const doc = payload.body || payload;
    const email = doc.email;
    const status = doc.status;
    const fullName = doc.fullName || "Trader";

    if (!email) {
      console.error("❌ No email found in document.");
      return NextResponse.json(
        { success: false, message: "No email provided" },
        { status: 400 }
      );
    }

    // Only trigger on 'approved' or 'rejected'
    if (status !== "approved" && status !== "rejected") {
      console.log(`ℹ️ Skipped email: status is '${status}'`);
      return NextResponse.json({ success: true, skipped: "No action for this status" });
    }

    // ✅ Send using your main styled mailer
    await sendKycEmail(email, status, fullName);

    console.log(`📨 Styled ${status.toUpperCase()} KYC email sent to ${email}`);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("❌ notify-approval error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Email sending failed" },
      { status: 500 }
    );
  }
}
