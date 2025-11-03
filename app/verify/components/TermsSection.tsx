"use client";
import React from "react";
import { CheckCircle2, ExternalLink, Shield, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function TermsSection({ termsAccepted, setTermsAccepted }: any) {
  return (
    <div className="w-full max-w-lg mt-6 text-gray-300 text-[13px] space-y-4">

      {/* ✅ Accept line */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setTermsAccepted(!termsAccepted);
            if (!termsAccepted) toast.success("✅ Terms accepted");
          }}
          className={`w-5 h-5 flex items-center justify-center rounded border ${
            termsAccepted
              ? "bg-[#0f8b31] border-[#0f8b31]"
              : "border-gray-500 bg-transparent"
          }`}
        >
          {termsAccepted && <CheckCircle2 size={16} />}
        </button>
        <span className="text-[13px]">
          I agree to the{" "}
          <a
            href="/policies"
            target="_blank"
            className="text-[#f0b90b] hover:underline"
          >
            Terms & Compliance Policy
          </a>
        </span>
      </div>

      {/* ✅ Why KYC info */}
      <div className="p-3 bg-[#12161c] rounded-lg border border-[#1f2937]">
        <div className="flex items-center gap-2 mb-1">
          <ShieldCheck size={15} className="text-[#f0b90b]" />
          <span className="text-white font-medium text-[13px]">
            Why do I need to verify KYC?
          </span>
        </div>

        <ul className="list-disc ml-4 mt-2 space-y-1 text-gray-400 leading-relaxed">
          <li>Required under Nigerian CBN & SEC regulations</li>
          <li>Prevents fraud, identity theft & money laundering</li>
          <li>Ensures safe trading & protects user funds</li>
          <li>Helps comply with global AML/CFT laws</li>
          <li>Required before withdrawals & full platform access</li>
        </ul>

        <a
          href="/policies"
          className="text-[#f0b90b] text-xs flex items-center gap-1 mt-2 hover:underline"
          target="_blank"
        >
          Learn more about KYC compliance <ExternalLink size={12} />
        </a>
      </div>

      <p className="text-[11px] text-center text-gray-500 mt-2">
        We never share your data. Verified securely by Blakdhut Compliance.
      </p>
    </div>
  );
}
