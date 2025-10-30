import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import {
  sendKycPendingEmail,
  sendKycAdminNotification,
} from "@/lib/mailer";

// 🧭 Sanity client setup
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

// ✅ Helper to upload file to Sanity
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
    const formData = await req.formData();

    const fullName = formData.get("fullName") as string;
    const email = formData.get("email") as string;
    const occupation = formData.get("occupation") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;
    const phone = formData.get("phone") as string;
    const address = formData.get("address") as string;
    const country = formData.get("country") as string;
    const idType = formData.get("idType") as string;
    const idNumber = formData.get("idNumber") as string;
    const proofType = formData.get("proofType") as string;

    const nationalIdFrontFile = formData.get("nationalIdFront") as File | null;
    const nationalIdBackFile = formData.get("nationalIdBack") as File | null;
    const utilityBillFile = formData.get("utilityBill") as File | null;
    const selfieFile = formData.get("selfie") as File | null;

    const nationalIdFront = await uploadSanityFile(nationalIdFrontFile, "image");
    const nationalIdBack = await uploadSanityFile(nationalIdBackFile, "image");
    const utilityBill = await uploadSanityFile(utilityBillFile, "image");
    const selfie = await uploadSanityFile(selfieFile, "image");

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
      nationalIdFront,
      nationalIdBack,
      utilityBill,
      selfie,
      status: "pending",
      submittedAt: new Date().toISOString(),
    });

    // ✅ Send "Pending" email to user
    if (email) await sendKycPendingEmail(email, fullName);

    // ✅ Notify admin of new submission
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
