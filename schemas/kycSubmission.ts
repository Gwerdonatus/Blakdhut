export default {
  name: "kycSubmission",
  title: "KYC Submission",
  type: "document",
  fields: [
    { name: "fullName", title: "Full Name", type: "string" },
    { name: "email", title: "Email Address", type: "string" },  // ✅ NEW
    { name: "occupation", title: "Occupation", type: "string" },
    { name: "country", title: "Country of Residence", type: "string" },

    { name: "address", title: "Address", type: "string" },
    { name: "dateOfBirth", title: "Date of Birth", type: "string" },
    { name: "idType", title: "ID Type", type: "string" },
    { name: "idNumber", title: "ID Number", type: "string" },
    { name: "phone", title: "Phone Number", type: "string" },
    { name: "proofType", title: "Proof of Address Type", type: "string" },

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
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "selfie",
      title: "Selfie",
      type: "image",
      options: { hotspot: true },
    },

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
  ],
};
