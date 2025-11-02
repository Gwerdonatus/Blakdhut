"use client";
import React from "react";
import { X } from "lucide-react";

export default function StepProofOfAddress({
  fileInputRef,
  formData,
  setFormData,
  errors,
  renderFilePreview,
  utilityOptions,
}: any) {
  const renderError = (n: string) =>
    errors[n] ? <p className="text-xs text-red-400">{errors[n]}</p> : null;

  const inputClass =
    "w-full bg-[#12161c] text-white placeholder:text-gray-400 border border-[#27313d] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/30";

  const handleCancelFile = () => {
    setFormData((prev: any) => ({
      ...prev,
      utilityBill: null,
    }));
  };

  return (
    <div className="w-full flex flex-col gap-3 items-center">
      {/* Dropdown for Proof Type */}
      <div className="w-full">
        <label className="block text-gray-300 text-sm mb-1 ml-1">
          Proof of Address Type
        </label>
        <select
          name="proofType"
          value={formData.proofType || ""}
          onChange={(e) =>
            setFormData((prev: any) => ({
              ...prev,
              proofType: e.target.value,
            }))
          }
          className={inputClass}
        >
          <option value="">Select Utility Bill Type</option>
          {utilityOptions.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {renderError("proofType")}
      </div>

      {/* Upload File Button */}
      <button
        onClick={() => {
          fileInputRef.current?.removeAttribute("capture");
          fileInputRef.current?.setAttribute("accept", "image/*");
          fileInputRef.current?.click();
        }}
        className="bg-[#f0b90b] text-black w-full py-4 rounded-xl text-lg font-semibold mt-2 hover:brightness-110 transition-all"
      >
        {formData.utilityBill ? "Replace Document" : "Upload Document"}
      </button>

      {renderError("utilityBill")}

      {/* File Preview + Cancel Button */}
      {formData.utilityBill && (
        <div className="w-full flex flex-col items-center mt-3">
          {renderFilePreview(formData.utilityBill)}
          <button
            onClick={handleCancelFile}
            className="mt-3 flex items-center gap-2 px-4 py-2 rounded-md bg-[#1b2430] border border-[#27313d] text-gray-200 text-sm hover:bg-[#202a36] transition"
          >
            <X size={16} /> Cancel Upload
          </button>
        </div>
      )}
    </div>
  );
}
