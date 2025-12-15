export default {
  name: "kycSubmission",
  title: "KYC Submission",
  type: "document",
  fields: [
    { name: "fullName", title: "Full Name", type: "string" },
    { name: "email", title: "Email Address", type: "string" },
    { name: "occupation", title: "Occupation", type: "string" },
    { name: "country", title: "Country of Residence", type: "string" },
    { name: "address", title: "Address", type: "string" },
    { name: "dateOfBirth", title: "Date of Birth", type: "string" },
    { name: "idType", title: "ID Type", type: "string" },
    { name: "idNumber", title: "ID Number", type: "string" },
    { name: "phone", title: "Phone Number", type: "string" },
    { name: "proofType", title: "Proof of Address Type", type: "string" },
    { name: "sourceOfFunds", title: "Source of Funds", type: "string" },
    { name: "telegramUsername", title: "Telegram Username", type: "string" },

    {
      name: "nationalIdFront",
      title: "National ID (Front)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "nationalIdBack",
      title: "National ID (Back)",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "utilityBill",
      title: "Utility Bill",
      type: "file",
      options: { accept: [".pdf", ".jpg", ".jpeg", ".png"] },
    },

    // ✅ Supporting Document (can be PDF or image)
    {
      name: "supportingDocumentType",
      title: "Supporting Document Type",
      type: "string",
      options: {
        list: [
          { title: "Bank Statement", value: "Bank Statement" },
          { title: "Proof of Employment", value: "Proof of Employment" },
          { title: "Tax Clearance Certificate", value: "Tax Clearance Certificate" },
          { title: "Business Registration Document", value: "Business Registration Document" },
          { title: "Reference Letter", value: "Reference Letter" },
          { title: "Other", value: "Other" },
        ],
      },
    },
    {
      name: "supportingDocument",
      title: "Supporting Document (PDF or Image)",
      type: "file",
      description: "Upload your supporting document (PDF or image).",
      options: { accept: [".pdf", ".jpg", ".jpeg", ".png"] },
    },

    { name: "selfie", title: "Selfie", type: "image", options: { hotspot: true } },

    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
        layout: "radio",
      },
      initialValue: "pending",
    },
    {
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },

    // ✅ Business Verification
    {
      name: "businessAccount",
      title: "Has Business Account",
      type: "string",
      options: {
        list: [
          { title: "Yes", value: "yes" },
          { title: "No", value: "no" },
        ],
      },
    },
    {
      name: "businessName",
      title: "Business Name",
      type: "string",
    },
    {
      name: "cacCertificate",
      title: "CAC Certificate",
      type: "file",
      options: { accept: [".pdf", ".jpg", ".jpeg", ".png"] },
    },
    {
      name: "registrationApplication",
      title: "Application for Registration",
      type: "file",
      options: { accept: [".pdf", ".jpg", ".jpeg", ".png"] },
    },
  ],
};