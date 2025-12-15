"use client";

import React, { useRef } from "react";
import { X } from "lucide-react";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

interface Props {
  formData: any;
  setFormData: any;
  errors: any;
  renderFilePreview: (file: File | null) => React.ReactNode;
}

export default function StepSupportingDocument({
  formData,
  setFormData,
  errors,
  renderFilePreview,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentFieldRef = useRef<string>("");

  const inputClass =
    "w-full bg-[#12161c] text-white placeholder:text-gray-400 border border-[#27313d] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/30";

  const openFileDialog = (field: string) => {
    currentFieldRef.current = field;
    fileInputRef.current?.setAttribute("accept", "image/*,.pdf");
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSizeMB = 10;

    try {
      if (file.type !== "application/pdf" && !file.type.startsWith("image/")) {
        toast.error("Only PDF or image files are allowed");
        return;
      }

      if (file.size / 1024 / 1024 > maxSizeMB) {
        toast.error("File too large (max 10MB)");
        return;
      }

      let finalFile = file;

      // Compress images only
      if (file.type.startsWith("image/")) {
        finalFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1200,
          useWebWorker: true,
        });
      }

      setFormData((prev: any) => ({
        ...prev,
        [field]: finalFile,
      }));

      toast.success("File added successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add file");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleCancelFile = (field: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: null }));
    toast("Upload removed", { icon: "🗑" });
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Business Selection */}
      <div>
        <label className="text-gray-300 text-sm">
          Do you have a registered business?
        </label>

        <div className="flex gap-4 mt-2">
          <button
            onClick={() =>
              setFormData((prev: any) => ({
                ...prev,
                businessAccount: "yes",
              }))
            }
            className={`flex-1 py-2 rounded-md ${
              formData.businessAccount === "yes"
                ? "bg-[#f0b90b] text-black"
                : "bg-[#12161c] border border-[#27313d] text-white"
            }`}
          >
            Yes
          </button>

          <button
            onClick={() =>
              setFormData((prev: any) => ({
                ...prev,
                businessAccount: "no",
              }))
            }
            className={`flex-1 py-2 rounded-md ${
              formData.businessAccount === "no"
                ? "bg-[#f0b90b] text-black"
                : "bg-[#12161c] border border-[#27313d] text-white"
            }`}
          >
            No
          </button>
        </div>

        {errors.businessAccount && (
          <p className="text-xs text-red-400 mt-1">
            {errors.businessAccount}
          </p>
        )}
      </div>

      {formData.businessAccount === "yes" && (
        <>
          {/* Business Name */}
          <div>
            <label className="text-gray-300 text-sm">Business Name</label>
            <input
              type="text"
              className={inputClass}
              placeholder="Enter your business name"
              value={formData.businessName || ""}
              onChange={(e) =>
                setFormData((prev: any) => ({
                  ...prev,
                  businessName: e.target.value,
                }))
              }
            />
            {errors.businessName && (
              <p className="text-xs text-red-400">
                {errors.businessName}
              </p>
            )}
          </div>

          {/* CAC Certificate */}
          <div>
            <label className="text-gray-300 text-sm">
              Upload CAC Certificate
            </label>

            <button
              onClick={() => openFileDialog("cacCertificate")}
              className="bg-[#f0b90b] text-black w-full py-4 rounded-xl font-semibold mt-2"
            >
              Upload CAC Certificate
            </button>

            {renderFilePreview(formData.cacCertificate)}

            {formData.cacCertificate && (
              <button
                onClick={() => handleCancelFile("cacCertificate")}
                className="mt-2 flex items-center gap-1 text-red-400"
              >
                <X size={16} /> Remove
              </button>
            )}

            {errors.cacCertificate && (
              <p className="text-xs text-red-400 mt-1">
                {errors.cacCertificate}
              </p>
            )}
          </div>

          {/* Registration of Application */}
          <div>
            <label className="text-gray-300 text-sm">
              Upload Registration of Application
            </label>

            <button
              onClick={() =>
                openFileDialog("registrationApplication")
              }
              className="bg-[#f0b90b] text-black w-full py-4 rounded-xl font-semibold mt-2"
            >
              Upload Registration of Application
            </button>

            {renderFilePreview(formData.registrationApplication)}

            {formData.registrationApplication && (
              <button
                onClick={() =>
                  handleCancelFile("registrationApplication")
                }
                className="mt-2 flex items-center gap-1 text-red-400"
              >
                <X size={16} /> Remove
              </button>
            )}

            {errors.registrationApplication && (
              <p className="text-xs text-red-400 mt-1">
                {errors.registrationApplication}
              </p>
            )}
          </div>
        </>
      )}

      <input
        ref={fileInputRef}
        type="file"
        hidden
        onChange={(e) =>
          handleFileUpload(e, currentFieldRef.current)
        }
      />
    </div>
  );
}
