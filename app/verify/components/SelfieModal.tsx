"use client";

import React from "react";
import { X, Upload } from "lucide-react";

export default function SelfieModal({ setShowSelfieModal }: any) {
  return (
    <div className="fixed inset-0 flex items-end justify-center bg-black/50 backdrop-blur-sm z-50">
      <div className="w-full max-w-md bg-[#12161c] rounded-t-2xl p-4 shadow-2xl border border-[#27313d]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Upload Selfie</h3>
          <button
            onClick={() => setShowSelfieModal(false)}
            className="rounded-full p-1 hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <label className="flex items-center justify-center gap-2 w-full bg-[#f0b90b] text-black py-3 rounded-xl text-lg font-semibold hover:brightness-110 transition-all cursor-pointer">
          <Upload size={18} /> Upload from Device
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={() => setShowSelfieModal(false)}
          />
        </label>

        <p className="text-[12px] text-gray-400 mt-3 text-center">
          Camera not supported? Use this option to upload a selfie from your gallery.
        </p>
      </div>
    </div>
  );
}
