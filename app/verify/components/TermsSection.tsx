"use client";

import React from "react";
import {
  ShieldCheck,
  Lock,
  Clock,
  ExternalLink,
  CheckCircle2,
  FileText,
} from "lucide-react";
import toast from "react-hot-toast";

export default function TermsSection({ termsAccepted, setTermsAccepted }: any) {
  return (
    <div className="w-full max-w-lg mt-8 bg-[#12161c]/95 border border-[#1f2937] rounded-2xl shadow-[0_0_15px_rgba(240,185,11,0.05)] p-6">
      <div className="flex items-start gap-3">
        <ShieldCheck
          size={22}
          className="text-[#f0b90b] mt-0.5 drop-shadow-[0_0_3px_rgba(240,185,11,0.6)]"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-white">Terms & Conditions</h4>
          <p className="text-sm text-gray-300 mt-1 leading-relaxed">
            Before completing your KYC verification, please review and agree to
            our compliance terms. We ensure your data is handled securely in
            accordance with our privacy and AML policies.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-4">
            <a
              href="/policies"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[#f0b90b] hover:underline text-sm"
            >
              <FileText size={14} />
              View Full Terms
              <ExternalLink size={13} className="opacity-80" />
            </a>

            <button
              type="button"
              onClick={() => {
                setTermsAccepted(true);
                toast.success("✅ Terms accepted");
              }}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border transition-all ${
                termsAccepted
                  ? "bg-[#102018] border-[#2b4135] text-green-400"
                  : "bg-[#1b2430] border-[#27313d] text-gray-200 hover:bg-[#202a36]"
              }`}
            >
              {termsAccepted && <CheckCircle2 size={15} />}
              {termsAccepted ? "Accepted" : "Accept & Continue"}
            </button>
          </div>
        </div>
      </div>

      {/* 🔒 Trust Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 text-sm">
        <div className="flex items-center gap-2 rounded-lg bg-[#0e1318] border border-[#27313d]/80 px-3 py-2">
          <Lock size={16} className="text-[#f0b90b]" />
          <span className="text-gray-300">Encrypted Data</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[#0e1318] border border-[#27313d]/80 px-3 py-2">
          <ShieldCheck size={16} className="text-[#f0b90b]" />
          <span className="text-gray-300">Manual Review</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-[#0e1318] border border-[#27313d]/80 px-3 py-2">
          <Clock size={16} className="text-[#f0b90b]" />
          <span className="text-gray-300">Fast Updates</span>
        </div>
      </div>

      {/* ✨ Footer strip */}
      <div className="mt-6 border-t border-[#1f2937] pt-3 text-center text-[12px] text-gray-500">
        Powered by <span className="text-[#f0b90b] font-medium">Blakdhut Compliance</span>
      </div>
    </div>
  );
}
