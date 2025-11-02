"use client";
import React from "react";
import { X } from "lucide-react";

export default function StepUploadBack({
  fileInputRef,
  formData,
  setFormData,
  errors,
  renderFilePreview,
}: any) {
  const renderError = (name: string) =>
    errors[name] ? (
      <p className="text-xs text-red-400 text-left -mt-1">{errors[name]}</p>
    ) : null;

  const handleCancel = () => {
    setFormData((prev: any) => ({ ...prev, idBack: null }));
  };

  return (
    <div className="w-full flex flex-col items-center">
      <button
        onClick={() => {
          fileInputRef.current?.removeAttribute("capture");
          fileInputRef.current?.setAttribute("accept", "image/*");
          fileInputRef.current?.click();
        }}
        className="bg-[#f0b90b] text-black w-full py-4 rounded-xl text-lg font-semibold mt-2 hover:brightness-110 transition-all"
      >
        {formData.idBack ? "Replace Back Document" : "Upload Document (Back)"}
      </button>
      {renderError("idBack")}

      {formData.idBack && (
        <div className="w-full flex flex-col items-center mt-3">
          {renderFilePreview(formData.idBack)}
          <button
            onClick={handleCancel}
            className="mt-3 flex items-center gap-2 px-4 py-2 rounded-md bg-[#1b2430] border border-[#27313d] text-gray-200 text-sm hover:bg-[#202a36] transition"
          >
            <X size={16} /> Cancel Upload
          </button>
        </div>
      )}
    </div>
  );
}
