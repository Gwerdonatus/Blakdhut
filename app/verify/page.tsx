"use client";

import React, { useState, useRef, useEffect, JSX } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";

// 🧩 Components
import StepBasicInfo from "./components/StepBasicInfo";
import StepIDType from "./components/StepIDType";
import StepUploadFront from "./components/StepUploadFront";
import StepUploadBack from "./components/StepUploadBack";
import StepProofOfAddress from "./components/StepProofOfAddress";
import StepSupportingDocument from "./components/StepSupportingDocument"; 
import StepSelfie from "./components/StepSelfie";
import TermsSection from "./components/TermsSection";
import ConfettiModal from "./components/ConfettiModal";

import {
  UserCircle,
  IdCard,
  CreditCard,
  ArrowLeftRight,
  FileText,
  FolderOpenDot,
  Camera as CameraIcon,
} from "lucide-react";

const logo = "/blakdhut.jpg";

const steps = [
  "Basic Info",
  "ID Type",
  "Upload ID (Front)",
  "Upload ID (Back)",
  "Proof of Address",
  "Supporting Document",
  "Take Selfie",
];

const utilityOptions = [
  "Light Bill (Electricity)",
  "Water Bill",
  "Internet Subscription",
  "Waste Bill",
  "Bank Statement",
  "Other Official Document",
];

const sourceOfFundsOptions = [
  "Salary / Employment",
  "Business Revenue",
  "Savings / Personal Funds",
  "Crypto Trading / Investments",
  "Real Estate",
  "Gift / Inheritance",
  "Remittance (Family or Friends)",
  "Mining / Staking",
  "Other",
];

type KYCFormData = {
  fullName: string;
  email: string;
  occupation: string;
  sourceOfFunds: string;
  telegramUsername: string;
  dateOfBirth: string;
  phone: string;
  address: string;
  country: string;
  idType: string;
  idNumber: string;
  proofType: string;
  idFront: File | null;
  idBack: File | null;
  utilityBill: File | null;
  selfie: File | null;
  businessAccount: "yes" | "no" | "";
  businessName: string;
  cacCertificate: File | null;
  registrationApplication: File | null;
};

export default function VerifyPage() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [countryOptions, setCountryOptions] = useState<
    { value: string; label: JSX.Element }[]
  >([]);
  const [selectedCountry, setSelectedCountry] = useState<{
    value: string;
    label: JSX.Element;
  } | null>(null);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const termsSectionRef = useRef<HTMLDivElement>(null);
  const [termsError, setTermsError] = useState(false);

  const [formData, setFormData] = useState<KYCFormData>({
    fullName: "",
    email: "",
    occupation: "",
    sourceOfFunds: "",
    telegramUsername: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    country: "",
    idType: "",
    idNumber: "",
    proofType: "",
    idFront: null,
    idBack: null,
    utilityBill: null,
    selfie: null,
    businessAccount: "",
    businessName: "",
    cacCertificate: null,
    registrationApplication: null,
  });

  // ✅ Email validation
  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(value.trim());

  // ✅ Track window size for confetti
  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // ✅ Fetch country list once
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        const data = await res.json();
        const list = data
          .map((c: any) => ({
            value: c.name.common,
            label: (
              <div className="flex items-center gap-2">
                <img
                  src={c.flags?.png}
                  alt={`${c.name.common} flag`}
                  width={20}
                  height={14}
                  className="rounded-sm"
                />
                <span>{c.name.common}</span>
              </div>
            ),
          }))
          .sort((a: any, b: any) => a.value.localeCompare(b.value));
        setCountryOptions(list);
        const nigeria = list.find(
          (c: any) => c.value.toLowerCase() === "nigeria"
        );
        if (nigeria) {
          setSelectedCountry(nigeria);
          setFormData((prev) => ({ ...prev, country: nigeria.value }));
        }
      } catch {
        toast.error("Failed to load countries");
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  // ✅ Helper to preview images or PDFs
  const renderFilePreview = (file: File | null) => {
    if (!file) return null;

    if (file.type === "application/pdf") {
      return (
        <div className="mt-3 flex items-center gap-2 text-gray-300 bg-[#12161c] border border-[#27313d] p-3 rounded-md">
          <FileText size={24} />
          <span>{file.name}</span>
          <span className="text-sm">({Math.round(file.size / 1024)} KB)</span>
        </div>
      );
    } else {
      return (
        <motion.img
          key={file.name}
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="w-full max-w-xs h-32 object-cover rounded-lg mt-3 border border-[#27313d]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />
      );
    }
  };

  // ✅ Validate each step
  const validateStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    switch (step) {
      case 0:
        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!isValidEmail(formData.email))
          newErrors.email = "Invalid email";
        if (!formData.occupation)
          newErrors.occupation = "Occupation is required";
        if (!formData.sourceOfFunds)
          newErrors.sourceOfFunds = "Select your source of funds";
        if (!formData.telegramUsername)
          newErrors.telegramUsername = "Telegram username is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.dateOfBirth)
          newErrors.dateOfBirth = "Date of birth is required";
        break;
      case 1:
        if (!formData.idType) newErrors.idType = "ID type is required";
        if (
          (formData.idType === "NIN" ||
            formData.idType === "Driver’s License") &&
          !formData.idNumber
        )
          newErrors.idNumber = "ID number is required";
        break;
      case 2:
        if (!formData.idFront) newErrors.idFront = "Front of ID is required";
        break;
      case 3:
        if (!formData.idBack) newErrors.idBack = "Back of ID is required";
        break;
      case 4:
        if (!formData.proofType) newErrors.proofType = "Proof type required";
        if (!formData.utilityBill)
          newErrors.utilityBill = "Upload a document";
        break;
      case 5:
        if (!formData.businessAccount) newErrors.businessAccount = "Please select if you have a business";
        if (formData.businessAccount === "yes") {
          if (!formData.businessName) newErrors.businessName = "Business name is required";
          if (!formData.cacCertificate) newErrors.cacCertificate = "CAC Certificate required";
          if (!formData.registrationApplication) newErrors.registrationApplication = "Registration document required";
        }
        break;
      case 6:
        if (!formData.selfie) newErrors.selfie = "Selfie required";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ File handler for all file uploads (except selfie, handled inside StepSelfie)
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxSizeMB = 10;
    if (file.size / 1024 / 1024 > maxSizeMB) {
      toast.error("File too large (max 10MB)");
      return;
    }

    let isImage = file.type.startsWith("image/");
    let allowed = false;

    if (step === 2 || step === 3) {
      if (isImage) allowed = true;
      else toast.error("Only image files are allowed for ID uploads");
    } else if (step === 4) {
      if (isImage || file.type === "application/pdf") allowed = true;
      else toast.error("Only PDF or image files are allowed");
    }

    if (!allowed) return;

    try {
      let finalFile = file;
      if (isImage) {
        finalFile = await imageCompression(file, {
          maxSizeMB: 1,
          maxWidthOrHeight: 1024,
          useWebWorker: true,
        });
      }
      const field =
        step === 2
          ? "idFront"
          : step === 3
          ? "idBack"
          : step === 4
          ? "utilityBill"
          : null;
      if (field)
        setFormData((prev) => ({
          ...prev,
          [field]: finalFile,
        }));
      toast.success("File added successfully ✅");
    } catch {
      toast.error("File upload failed");
    }
  };

  // ✅ Submit form
  const submitForm = async () => {
    setTermsError(false);

    if (!termsAccepted) {
      setTermsError(true);
      toast.error("Please accept the terms and conditions before submitting");
      termsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!validateStep()) return;

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val) data.append(key, val as any);
      });

      const res = await fetch("/api/kyc", { method: "POST", body: data });
      const result = await res.json();
      if (!res.ok) throw new Error(result?.message || "Submission failed");

      toast.success("🎉 KYC submitted! We’ll review within 24 hours.");
      setShowConfetti(true);
      setStep(0);
    } catch (err: any) {
      toast.error(err.message || "Submission error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Step icons
  const renderIcon = () => {
    const iconProps = { size: 48, strokeWidth: 1.6 };
    const icons = [
      UserCircle,
      IdCard,
      CreditCard,
      ArrowLeftRight,
      FileText,
      FolderOpenDot,
      CameraIcon,
    ];
    const Icon = icons[step];
    return Icon ? <Icon {...iconProps} /> : null;
  };

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white flex flex-col items-center p-4">
      <br />
      <div className="pt-6 pb-2 flex flex-col items-center">
        <Image
          src={logo}
          alt="Blakdhut Logo"
          width={110}
          height={110}
          className="rounded-2xl"
        />
      </div>

      {/* Steps Container */}
      <div className="w-full max-w-lg bg-[#12161c]/95 border border-[#1f2937] rounded-2xl shadow-2xl p-6 mt-4">
        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-4">
          {steps.map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === step ? "bg-[#f0b90b]" : "bg-[#27313d]"
              }`}
              animate={{ scale: i === step ? 1.3 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <h2 className="text-center text-xl font-bold mb-2">KYC Verification</h2>
        <p className="text-center text-sm text-gray-400 mb-5">
          Step {step + 1} of {steps.length}: {steps[step]}
        </p>

        {/* Step Renderer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={steps[step]}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center justify-center gap-4 text-center"
          >
            <div className="flex items-center justify-center w-28 h-28 rounded-2xl bg-[#1b2430] text-[#f0b90b] border border-[#27313d]">
              {renderIcon()}
            </div>

            {step === 0 && (
              <StepBasicInfo
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
                countryOptions={countryOptions}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                loadingCountries={loadingCountries}
                isValidEmail={isValidEmail}
                sourceOfFundsOptions={sourceOfFundsOptions}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            )}
            {step === 1 && (
              <StepIDType
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                setErrors={setErrors}
              />
            )}
            {step === 2 && (
              <StepUploadFront
                fileInputRef={fileInputRef}
                formData={formData}
                errors={errors}
                renderFilePreview={renderFilePreview}
              />
            )}
            {step === 3 && (
              <StepUploadBack
                fileInputRef={fileInputRef}
                formData={formData}
                errors={errors}
                renderFilePreview={renderFilePreview}
              />
            )}
            {step === 4 && (
              <StepProofOfAddress
                fileInputRef={fileInputRef}
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                renderFilePreview={renderFilePreview}
                utilityOptions={utilityOptions}
              />
            )}
            {step === 5 && (
              <StepSupportingDocument
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                renderFilePreview={renderFilePreview}
              />
            )}
            {step === 6 && (
              <StepSelfie
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                renderFilePreview={renderFilePreview}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || loading}
            className="px-4 py-2 bg-[#1b2430] border border-[#27313d] rounded disabled:opacity-50"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={() => validateStep() && setStep((s) => s + 1)}
              disabled={loading}
              className="px-4 py-2 bg-[#f0b90b] text-black rounded font-semibold hover:brightness-110"
            >
              Next
            </button>
          ) : (
            <button
              onClick={submitForm}
              disabled={loading}
              className="px-4 py-2 bg-green-600 rounded font-semibold hover:bg-green-500 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          )}
        </div>
      </div>

      {/* Terms Section */}
      <div ref={termsSectionRef} className="mt-8 w-full max-w-lg">
        <TermsSection
  termsAccepted={termsAccepted}
  setTermsAccepted={(accepted: boolean) => setTermsAccepted(accepted)}
/>

        {termsError && (
          <p className="text-red-500 text-sm mt-2 text-center">
            Please accept the terms and conditions to proceed
          </p>
        )}
      </div>

      {/* Confetti Success */}
      {showConfetti && (
        <ConfettiModal
          windowSize={windowSize}
          setShowConfetti={setShowConfetti}
        />
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}