"use client";
import React from "react";
import { X } from "lucide-react";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

export default function StepSupportingDocument({
  fileInputRef,
  formData,
  setFormData,
  errors,
}: any) {
  const renderError = (name: string) =>
    errors[name] ? (
      <p className="text-xs text-red-400 mt-1">{errors[name]}</p>
    ) : null;

  const inputClass =
    "w-full bg-[#12161c] text-white placeholder:text-gray-400 border border-[#27313d] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/30";

  const documentOptions = [
    "Bank Statement",
    "Proof of Employment",
    "Tax Clearance Certificate",
    "Business Registration Document",
    "Reference Letter",
    "Other",
  ];

  // ✅ Handle PDF or Image Upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.type;
    const maxSizeMB = 10; // for PDFs

    try {
      // 📄 Handle PDF upload
      if (fileType === "application/pdf") {
        if (file.size / 1024 / 1024 > maxSizeMB) {
          toast.error("PDF file too large (max 10MB)");
          return;
        }
        setFormData((prev: any) => ({ ...prev, supportingDocument: file }));
        toast.success("PDF uploaded successfully ✅");
      }
      // 🖼 Handle image compression before upload
      else if (fileType.startsWith("image/")) {
        const compressed = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
        setFormData((prev: any) => ({ ...prev, supportingDocument: compressed }));
        toast.success("Image uploaded successfully ✅");
      } else {
        toast.error("Unsupported file type. Please upload a PDF or image.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file.");
    }
  };

  // ✅ Cancel / Remove uploaded document
  const handleCancelFile = () => {
    setFormData((prev: any) => ({
      ...prev,
      supportingDocument: null,
    }));
    toast("Upload removed", { icon: "🗑" });
  };

  // ✅ Preview PDF or Image
  const renderFilePreview = (file: File | null) => {
    if (!file) return null;
    const url = URL.createObjectURL(file);

    if (file.type === "application/pdf") {
      return (
        <iframe
          src={url}
          title="PDF Preview"
          className="w-full h-64 mt-3 rounded-md border border-[#27313d]"
        ></iframe>
      );
    } else if (file.type.startsWith("image/")) {
      return (
        <img
          src={url}
          alt="Preview"
          className="w-full max-w-xs h-40 object-cover rounded-lg mt-3 border border-[#27313d]"
        />
      );
    } else {
      return (
        <p className="text-sm text-gray-400 mt-2">
          File uploaded: <span className="text-[#f0b90b]">{file.name}</span>
        </p>
      );
    }
  };

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      {/* Document Type */}
      <div className="w-full">
        <label className="block text-gray-300 text-sm mb-1 ml-1">
          Document Type
        </label>
        <select
          name="supportingDocumentType"
          value={formData.supportingDocumentType || ""}
          onChange={(e) =>
            setFormData((prev: any) => ({
              ...prev,
              supportingDocumentType: e.target.value,
            }))
          }
          className={inputClass}
        >
          <option value="">Select Document Type</option>
          {documentOptions.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {renderError("supportingDocumentType")}
      </div>

      {/* Upload Button */}
      <button
        onClick={() => {
          fileInputRef.current?.removeAttribute("capture");
          fileInputRef.current?.setAttribute("accept", "image/*,.pdf");
          fileInputRef.current?.click();
        }}
        className="bg-[#f0b90b] text-black w-full py-4 rounded-xl text-lg font-semibold mt-2 hover:brightness-110 transition-all"
      >
        {formData.supportingDocument
          ? "Replace Supporting Document"
          : "Upload Supporting Document"}
      </button>
      {renderError("supportingDocument")}

      {/* File Preview + Cancel */}
      {formData.supportingDocument && (
        <div className="w-full flex flex-col items-center mt-3">
          {renderFilePreview(formData.supportingDocument)}
          <button
            onClick={handleCancelFile}
            className="mt-3 flex items-center gap-2 px-4 py-2 rounded-md bg-[#1b2430] border border-[#27313d] text-gray-200 text-sm hover:bg-[#202a36] transition"
          >
            <X size={16} /> Cancel Upload
          </button>
        </div>
      )}

      {/* Hidden Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
