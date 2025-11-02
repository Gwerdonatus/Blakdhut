import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import {
  sendKycPendingEmail,
  sendKycAdminNotification,
} from "@/lib/mailer";

// 🧭 Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

// ✅ Helper for uploading images or files (PDFs allowed)
const uploadSanityFile = async (file: File | null, type: "image" | "file") => {
  if (!file) return null;
  const buffer = Buffer.from(await file.arrayBuffer());
  const uploaded = await client.assets.upload(type, buffer, {
    filename: file.name,
  });
  return {
    _type: type,
    asset: { _type: "reference", _ref: uploaded._id },
  };
};

export async function POST(req: NextRequest) {
  try {
    const data = await req.formData();

    // 🧩 Text fields
    const fullName = data.get("fullName") as string;
    const email = data.get("email") as string;
    const occupation = data.get("occupation") as string;
    const dateOfBirth = data.get("dateOfBirth") as string;
    const phone = data.get("phone") as string;
    const address = data.get("address") as string;
    const country = data.get("country") as string;
    const idType = data.get("idType") as string;
    const idNumber = data.get("idNumber") as string;
    const proofType = data.get("proofType") as string;
    const sourceOfFunds = data.get("sourceOfFunds") as string;
    const telegramUsername = data.get("telegramUsername") as string;
    const supportingDocumentType = data.get("supportingDocumentType") as string;

    // 🧩 Files
    const idFrontFile = data.get("idFront") as File | null;
    const idBackFile = data.get("idBack") as File | null;
    const utilityBillFile = data.get("utilityBill") as File | null;
    const supportingDocumentFile = data.get("supportingDocument") as File | null;
    const selfieFile = data.get("selfie") as File | null;

    // ✅ Upload files to Sanity
    const nationalIdFront = await uploadSanityFile(idFrontFile, "image");
    const nationalIdBack = await uploadSanityFile(idBackFile, "image");
    const utilityBill = await uploadSanityFile(utilityBillFile, "image");
    const selfie = await uploadSanityFile(selfieFile, "image");

    // ✅ Supporting document (always upload as file to support PDF)
    const supportingDocument = await uploadSanityFile(
      supportingDocumentFile,
      "file"
    );

    // ✅ Save to Sanity
    const result = await client.create({
      _type: "kycSubmission",
      fullName,
      email,
      occupation,
      dateOfBirth,
      phone,
      address,
      country,
      idType,
      idNumber,
      proofType,
      sourceOfFunds,
      telegramUsername,
      supportingDocumentType,
      supportingDocument,
      nationalIdFront,
      nationalIdBack,
      utilityBill,
      selfie,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    // ✅ Notify user + admin
    if (email) await sendKycPendingEmail(email, fullName);
    await sendKycAdminNotification({
      fullName,
      email,
      country,
      phone,
      idType,
      proofType,
    });

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    console.error("❌ KYC upload error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Upload failed" },
      { status: 500 }
    );
  }
}
