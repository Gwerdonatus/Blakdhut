"use client";
import React from "react";
import Confetti from "react-confetti";

export default function ConfettiModal({ windowSize, setShowConfetti }: any) {
  return (
    <>
      <Confetti width={windowSize.width} height={windowSize.height} />
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg z-50">
        <div className="bg-[#12161c] p-6 rounded-2xl text-center shadow-xl max-w-sm border border-[#27313d]">
          <div className="text-5xl mb-3">✅</div>
          <h3 className="text-lg font-bold">KYC Submitted!</h3>
          <p className="text-gray-300 mt-2 leading-relaxed">
            We’ve received your KYC submission.{" "}
            <strong>
              Please check your email for confirmation. If you don’t see it,
              check your <u>Spam/Junk</u> folder. We typically review within 24
              hours.
            </strong>
          </p>
          <button
            onClick={() => setShowConfetti(false)}
            className="mt-4 bg-[#f0b90b] text-black px-6 py-2 rounded-full hover:brightness-110 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
}
