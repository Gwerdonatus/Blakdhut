"use client";

import React, { useRef, useState, useEffect } from "react";
import { Camera, X, Upload, CheckCircle2 } from "lucide-react";

export default function StepSelfie({
  formData,
  setFormData,
  errors,
  renderFilePreview,
}: any) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isCaptured, setIsCaptured] = useState(false);
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const renderError = (name: string) =>
    errors[name] ? (
      <p className="text-xs text-red-400 mt-1">{errors[name]}</p>
    ) : null;

  // 🎥 Start camera
  const startCamera = async () => {
    setErrorMsg("");
    setLoadingCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsCameraActive(true);
      }
    } catch (err: any) {
      setErrorMsg("Camera access denied. Please enable permissions or upload manually.");
    } finally {
      setLoadingCamera(false);
    }
  };

  // 📸 Capture image
  const captureSelfie = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
          setFormData((prev: any) => ({ ...prev, selfie: file }));
          setIsCaptured(true);
        }
      }, "image/jpeg");
    }
  };

  // 🧹 Stop camera
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  // 🗑 Remove selfie
  const handleCancel = () => {
    setFormData((prev: any) => ({ ...prev, selfie: null }));
    setIsCaptured(false);
    stopCamera();
  };

  // ⛔ Stop camera when leaving step
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-3">
      <p className="text-gray-400 text-sm mb-2 text-center">
        Please take a clear selfie showing your face. Ensure proper lighting and no hats, masks, or filters.
      </p>

      {!formData.selfie && !isCameraActive && (
        <div className="flex flex-col gap-2 w-full">
          <button
            onClick={startCamera}
            disabled={loadingCamera}
            className="flex items-center justify-center gap-2 w-full bg-[#f0b90b] text-black py-3 rounded-xl font-semibold hover:brightness-110 transition-all"
          >
            <Camera size={18} />{" "}
            {loadingCamera ? "Starting Camera..." : "Open Camera"}
          </button>
          <label className="flex items-center justify-center gap-2 w-full bg-[#1b2430] text-white py-3 rounded-xl font-semibold border border-[#27313d] hover:bg-[#202a36] transition-all cursor-pointer">
            <Upload size={18} /> Upload from Device
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file)
                  setFormData((prev: any) => ({ ...prev, selfie: file }));
              }}
            />
          </label>
        </div>
      )}

      {errorMsg && <p className="text-red-400 text-xs mt-1">{errorMsg}</p>}

      {isCameraActive && (
        <div className="flex flex-col items-center mt-3">
          <video
            ref={videoRef}
            className="w-full max-w-sm rounded-xl border border-[#27313d]"
          />
          <canvas ref={canvasRef} className="hidden" />
          <div className="flex gap-2 mt-3">
            <button
              onClick={captureSelfie}
              className="bg-[#f0b90b] text-black px-5 py-2 rounded-lg font-semibold flex items-center gap-2"
            >
              <CheckCircle2 size={16} /> Capture
            </button>
            <button
              onClick={handleCancel}
              className="bg-[#1b2430] border border-[#27313d] text-gray-300 px-4 py-2 rounded-lg hover:bg-[#202a36]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {formData.selfie && !isCameraActive && (
        <div className="w-full flex flex-col items-center mt-3">
          {renderFilePreview(formData.selfie)}
          <button
            onClick={handleCancel}
            className="mt-3 flex items-center gap-2 px-4 py-2 rounded-md bg-[#1b2430] border border-[#27313d] text-gray-200 text-sm hover:bg-[#202a36] transition"
          >
            <X size={16} /> Remove Selfie
          </button>
        </div>
      )}

      {renderError("selfie")}
    </div>
  );
}
