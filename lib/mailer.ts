import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_PORT === "465",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 🖼 Dynamic logo and base URL handling
const baseUrl =
  process.env.NODE_ENV === "development"
    ? "https://e4b9256eb1fc.ngrok-free.app"
    : "https://www.blakdhut.com";

const logoUrl = `${baseUrl}/blakdhut.jpg`;
const displayBaseUrl = baseUrl.replace(/^https?:\/\//, "");

// 🎨 Common color constants
const accent = "#f0b90b";
const bg = "#0b0e11";
const card = "#12161c";
const text = "#e5e7eb";
const border = "#1f2937";

// === Email Wrapper Template ===
function wrapTemplate(_title: string, content: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${_title}</title>
      </head>
      <body style="margin:0;padding:0;background:${bg};font-family:Arial,Helvetica,sans-serif;">
        <div style="background:${bg};padding:40px 20px;color:${text};">
          <div style="max-width:600px;margin:0 auto;background:${card};border-radius:16px;padding:36px 30px;text-align:center;border:1px solid ${border};box-shadow:0 10px 20px rgba(0,0,0,0.35);">

            <!-- Logo Section -->
            <div style="margin-bottom:18px;">
              <img src="${logoUrl}" alt="Blakdhut Logo"
                style="width:100px;height:100px;border-radius:20px;object-fit:cover;margin-bottom:8px;">
              <h2 style="color:${accent};margin:0;font-size:22px;">Blakdhut Exchange</h2>
            </div>

            <hr style="border:none;border-top:1px solid #27313d;margin:22px 0;">
            ${content}
            <hr style="border:none;border-top:1px solid #27313d;margin:26px 0;">

            <p style="font-size:13px;color:#9ca3af;line-height:1.6;">
              This message was sent automatically by <strong>Blakdhut Exchange</strong>.<br/>
              Need help? Email us at 
              <a href="mailto:${process.env.SMTP_USER}" style="color:${accent};text-decoration:none;">${process.env.SMTP_USER}</a><br/>
              Website: <a href="${baseUrl}" style="color:${accent};text-decoration:none;">${displayBaseUrl}</a>
            </p>

            <p style="margin-top:10px;font-size:12px;color:#777;">
              <em>Blakdhut — Built for Africa’s Traders</em>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

// === 1. Pending / Under Review Email ===
export async function sendKycPendingEmail(to: string, fullName?: string) {
  const whatsapp = process.env.SUPPORT_WHATSAPP_URL || "#";
  const telegram = process.env.SUPPORT_TELEGRAM_URL || "#";

  const html = wrapTemplate(
    "🕒 Your KYC Submission is Under Review",
    `
      <h3 style="color:${accent};margin-bottom:12px;">🕒 KYC Submission Under Review</h3>
      <p style="line-height:1.6;font-size:15px;margin:0;">
        Hello <strong>${fullName || "Trader"}</strong>,<br/><br/>
        We’ve received your KYC verification and it’s currently <strong>under review</strong>.<br/>
        Our compliance team will verify your documents shortly and update your status.<br/><br/>
        You’ll receive another email once your KYC is approved or requires revision.
      </p>
    `
  );

  await transporter.sendMail({
    from: `"Blakdhut Support" <${process.env.SMTP_USER}>`,
    to,
    subject: "🕒 Your KYC Submission is Under Review",
    html,
  });

  console.log(`📨 Pending email sent to ${to}`);
}

// === 2. Admin Notification for New Submission ===
export async function sendKycAdminNotification(details: {
  fullName: string;
  email: string;
  country?: string;
  phone?: string;
  idType?: string;
  proofType?: string;
}) {
  const adminEmail = process.env.SMTP_USER as string;
  const subject = "🆕 New KYC Submission — Review Required";

  const html = wrapTemplate(
    subject,
    `
      <h3 style="color:${accent};margin-bottom:12px;">New KYC Submission Received</h3>
      <ul style="text-align:left;margin-top:15px;line-height:1.7;font-size:15px;padding-left:18px;">
        <li><strong>Name:</strong> ${details.fullName}</li>
        <li><strong>Email:</strong> ${details.email}</li>
        ${details.country ? `<li><strong>Country:</strong> ${details.country}</li>` : ""}
        ${details.phone ? `<li><strong>Phone:</strong> ${details.phone}</li>` : ""}
        ${details.idType ? `<li><strong>ID Type:</strong> ${details.idType}</li>` : ""}
        ${details.proofType ? `<li><strong>Proof Type:</strong> ${details.proofType}</li>` : ""}
      </ul>
      <p style="margin-top:12px;font-size:14px;">
        Please log in to <strong>Sanity Studio</strong> to review and verify this submission.
      </p>
    `
  );

  await transporter.sendMail({
    from: `"Blakdhut Bot" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    subject,
    html,
  });

  console.log(`📨 Admin notified of new KYC from ${details.fullName}`);
}

// === 3. Approval / Rejection Emails (Styled Properly) ===
export async function sendKycEmail(
  to: string,
  status: "approved" | "rejected",
  fullName?: string
) {
  const whatsapp = process.env.SUPPORT_WHATSAPP_URL || "#";
  const telegram = process.env.SUPPORT_TELEGRAM_URL || "#";

  const subject =
    status === "approved"
      ? "✅ Your KYC Verification is Approved"
      : "❌ Your KYC Verification was Rejected";

  const headingColor = status === "approved" ? "#16a34a" : "#ef4444";
  const statusTitle = status === "approved" ? "✅ KYC Approved" : "❌ KYC Rejected";

  const content =
    status === "approved"
      ? `
        <h3 style="color:${headingColor};margin-bottom:12px;">${statusTitle}</h3>
        <p style="line-height:1.6;font-size:15px;margin:0;">
          Hello <strong>${fullName || "Trader"}</strong>,<br/><br/>
          Great news! Your KYC verification has been <strong style="color:${headingColor};">APPROVED</strong> 🎉.<br/>
          You now have full access to all <strong>exchange</strong> and <strong>wallet</strong> features on Blakdhut.
        </p>
        <p style="font-size:14px;color:#d1d5db;margin-top:14px;">
          To confirm your identity, please message us on WhatsApp or Telegram using your <strong>full name</strong>.
        </p>

        <div style="text-align:center;margin-top:24px;">
          <a href="${whatsapp}" style="background:#25D366;color:#ffffff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;margin-right:10px;display:inline-block;">
            💬 WhatsApp Support
          </a>
          <a href="${telegram}" style="background:#0088cc;color:#ffffff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
            ✈️ Telegram Support
          </a>
        </div>
      `
      : `
        <h3 style="color:${headingColor};margin-bottom:12px;">${statusTitle}</h3>
        <p style="line-height:1.6;font-size:15px;margin:0;">
          Hello <strong>${fullName || "Trader"}</strong>,<br/><br/>
          Your KYC verification was <strong style="color:${headingColor};">REJECTED</strong>.<br/>
          This may be due to unclear images or missing information.
        </p>
        <p style="font-size:14px;color:#d1d5db;margin-top:14px;">
          Please review your documents and resubmit, or contact our support team for guidance.
        </p>

        <div style="text-align:center;margin-top:24px;">
          <a href="${whatsapp}" style="background:#25D366;color:#ffffff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;margin-right:10px;display:inline-block;">
            💬 WhatsApp Support
          </a>
          <a href="${telegram}" style="background:#0088cc;color:#ffffff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">
            ✈️ Telegram Support
          </a>
        </div>
      `;

  const html = wrapTemplate(subject, content);

  await transporter.sendMail({
    from: `"Blakdhut Support" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });

  console.log(`📨 ${status.toUpperCase()} KYC email sent to ${to}`);
}
