"use client";

import React, { useState, useRef, useEffect, JSX } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import Confetti from "react-confetti";
import imageCompression from "browser-image-compression";
import dynamic from "next/dynamic";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Camera,
  UserCircle,
  CreditCard,
  ArrowLeftRight,
  FileText,
  Camera as CameraIcon,
  IdCard,
  X,
  Upload,
  ShieldCheck,
  Clock,
  Lock,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";

const Select = dynamic(() => import("react-select"), { ssr: false });

const logo = "/blakdhut.jpg";

const steps = [
  "Basic Info",
  "ID Type",
  "Upload ID (Front)",
  "Upload ID (Back)",
  "Proof of Address",
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

type KYCFormData = {
  fullName: string;
  email: string;
  occupation: string;
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
};

export default function VerifyPage() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showConfetti, setShowConfetti] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const [showSelfieModal, setShowSelfieModal] = useState(false);

  const [termsAccepted, setTermsAccepted] = useState(false);

  const [formData, setFormData] = useState<KYCFormData>({
    fullName: "",
    email: "",
    occupation: "",
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
  });

  // --- Helpers ---
  const isValidEmail = (value: string) => {
    // Robust RFC5322-ish but not over-strict: allows subdomains and modern TLDs
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return re.test(value.trim());
  };

  useEffect(() => {
    const updateSize = () =>
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        const data = await res.json();
        if (!Array.isArray(data)) throw new Error("Invalid country data");

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
      } catch (err) {
        console.error("❌ Country fetch error:", err);
        toast.error("Failed to load countries");
      } finally {
        setLoadingCountries(false);
      }
    };

    fetchCountries();
  }, []);

  const renderError = (name: string) =>
    errors[name] ? (
      <p className="text-xs text-red-400 text-left -mt-1">{errors[name]}</p>
    ) : null;

  const renderIcon = () => {
    const iconProps = { size: 48, strokeWidth: 1.6 };
    switch (step) {
      case 0:
        return <UserCircle {...iconProps} />;
      case 1:
        return <IdCard {...iconProps} />;
      case 2:
        return <CreditCard {...iconProps} />;
      case 3:
        return <ArrowLeftRight {...iconProps} />;
      case 4:
        return <FileText {...iconProps} />;
      case 5:
        return <CameraIcon {...iconProps} />;
      default:
        return null;
    }
  };

  const renderFilePreview = (file: File | null) =>
    file ? (
      <motion.img
        key={file.name}
        src={URL.createObjectURL(file)}
        alt="Preview"
        className="w-full max-w-xs h-32 object-cover rounded-lg mt-3 border border-[#27313d]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      />
    ) : null;

  const validateStep = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    switch (step) {
      case 0:
        if (!formData.fullName) newErrors.fullName = "Full name is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!isValidEmail(formData.email))
          newErrors.email = "Enter a valid email address";
        if (!formData.occupation)
          newErrors.occupation = "Occupation is required";
        if (!formData.phone) newErrors.phone = "Phone number is required";
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.dateOfBirth)
          newErrors.dateOfBirth = "Date of birth is required";
        break;
      case 1:
        if (!formData.idType) newErrors.idType = "ID type is required";
        if (
          (formData.idType === "NIN" || formData.idType === "Driver’s License") &&
          !formData.idNumber
        ) {
          newErrors.idNumber = "ID number is required";
        }
        break;
      case 2:
        if (!formData.idFront) newErrors.idFront = "Front of ID is required";
        break;
      case 3:
        if (!formData.idBack) newErrors.idBack = "Back of ID is required";
        break;
      case 4:
        if (!formData.proofType) newErrors.proofType = "Select a proof type";
        if (!formData.utilityBill) newErrors.utilityBill = "Upload a document";
        break;
      case 5:
        if (!formData.selfie) newErrors.selfie = "Selfie is required";
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "email" && value) {
      if (!isValidEmail(value)) {
        setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
      }
    }
  };
        const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (step === 5 && !file.type.startsWith("image/")) {
      toast.error("Only live camera images are allowed");
      return;
    }

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      let field: keyof KYCFormData | null = null;
      if (step === 2) field = "idFront";
      if (step === 3) field = "idBack";
      if (step === 4) field = "utilityBill";
      if (step === 5) field = "selfie";

      if (field) {
        setFormData((prev) => ({ ...prev, [field]: compressedFile }));
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    } catch {
      toast.error("Failed to compress image");
    }
  };

  const handleSelfie = (type: "camera" | "upload") => {
    if (!fileInputRef.current) return;
    fileInputRef.current.setAttribute("accept", "image/*");
    if (type === "camera") {
      fileInputRef.current.setAttribute("capture", "user");
    } else {
      fileInputRef.current.removeAttribute("capture");
    }
    fileInputRef.current.click();
    setShowSelfieModal(false);
  };

  const next = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prev = () => {
    if (step > 0) setStep((prev) => prev - 1);
  };

  const submitForm = async () => {
    if (!validateStep()) return;
    try {
      setLoading(true);
      const data = new FormData();

      data.append("fullName", formData.fullName);
      data.append("email", formData.email);
      data.append("occupation", formData.occupation);
      data.append("dateOfBirth", formData.dateOfBirth);
      data.append("phone", formData.phone);
      data.append("address", formData.address);
      data.append("country", formData.country);
      data.append("idType", formData.idType);
      data.append("idNumber", formData.idNumber);
      data.append("proofType", formData.proofType);
      if (formData.idFront) data.append("nationalIdFront", formData.idFront);
      if (formData.idBack) data.append("nationalIdBack", formData.idBack);
      if (formData.utilityBill) data.append("utilityBill", formData.utilityBill);
      if (formData.selfie) data.append("selfie", formData.selfie);

      const res = await fetch("/api/kyc", { method: "POST", body: data });
      let result: any;
      try {
        result = await res.json();
      } catch {
        throw new Error("Invalid response from server");
      }
      if (!res.ok) {
        if (res.status === 413)
          throw new Error("File too large. Please upload a smaller image.");
        throw new Error(result?.message || "KYC submission failed");
      }

      // ✔️ Updated success message (email + spam + 24h)
      toast.success(
        "🎉 KYC submitted! Please check your email (and Spam folder). We’ll review within 24 hours."
      );
      setShowConfetti(true);
      setStep(0);
      setFormData({
        fullName: "",
        email: "",
        occupation: "",
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
      });
    } catch (err: any) {
      console.error("KYC Submit Error:", err);
      toast.error(err.message || "❌ Failed to submit KYC. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Tailwind helper class for inputs in dark theme
  const inputClass =
    "input w-full bg-[#12161c] text-white placeholder:text-gray-400 border border-[#27313d] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/30";

  return (
    <div className="min-h-screen w-full bg-[#0b0e11] text-white p-4 flex flex-col items-center">
      {/* Header */}
      <div className="pt-6 pb-2 flex flex-col items-center">
        <div className="rounded-2xl p-1 bg-[#0b0e11]">
          <Image
            src={logo}
            alt="Blakdhut Logo"
            width={110}
            height={110}
            className="mt-4 mb-2 object-cover rounded-2xl"
          />
        </div>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-lg bg-[#12161c]/95 backdrop-blur-xl border border-[#1f2937] rounded-2xl shadow-2xl p-6 mt-4">
        {/* Step Dots */}
        <div className="flex justify-center gap-2 mb-4">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === step ? "bg-[#f0b90b]" : "bg-[#27313d]"
              }`}
              animate={{ scale: index === step ? 1.3 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        <h2 className="text-center text-xl mb-2 font-bold">KYC Verification</h2>
        <p className="text-center text-sm mb-5 text-gray-400">
          Step {step + 1} of {steps.length}: {steps[step]}
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={steps[step]}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex flex-col items-center justify-center text-center gap-4"
          >
            {/* Icon */}
            <motion.div
              initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              exit={{ scale: 0.8, rotate: 10, opacity: 0 }}
              transition={{ type: "spring", stiffness: 180, damping: 14 }}
              className="flex items-center justify-center w-28 h-28 rounded-2xl bg-[#1b2430] text-[#f0b90b] border border-[#27313d]"
            >
              {renderIcon()}
            </motion.div>

            {/* STEP 0: Basic Info */}
            {step === 0 && (
              <div className="w-full flex flex-col gap-3 text-left">
                <div>
                  <input
                    name="fullName"
                    placeholder="Full Name"
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                  {renderError("fullName")}
                </div>

                <div>
                  <input
                    name="email"
                    placeholder="Email Address"
                    onChange={handleInputChange}
                    onBlur={(e) => {
                      const v = e.target.value;
                      if (v && !isValidEmail(v)) {
                        setErrors((prev) => ({
                          ...prev,
                          email: "Enter a valid email address",
                        }));
                      }
                    }}
                    className={inputClass}
                  />
                  {renderError("email")}
                </div>

                <div>
                  <input
                    name="occupation"
                    placeholder="Occupation"
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                  {renderError("occupation")}
                </div>
                <div>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      setFormData((prev) => ({
                        ...prev,
                        dateOfBirth: date ? date.toString() : "",
                      }));
                      setErrors((prev) => ({ ...prev, dateOfBirth: "" }));
                    }}
                    placeholderText="Select Date of Birth"
                    className={`${inputClass} !bg-[#12161c]`}
                    dateFormat="dd/MM/yyyy"
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={80}
                  />
                  {renderError("dateOfBirth")}
                </div>
                <div>
                    {/* ✅ Phone input visibility fix: show +234 beside flag, full typing support */}
                    <PhoneInput
                      country="ng"
                      value={formData.phone}
                      onChange={(val) => setFormData((prev) => ({ ...prev, phone: val }))} // no manual '+'
                      countryCodeEditable={false}
                      enableSearch={true}
                      placeholder="+234 801 234 5678"

                      // Tailwind + inline style for dark mode & padding
                      containerClass="!w-full"
                      inputClass="!bg-[#12161c] !text-white !border !border-[#27313d] !w-full !py-2 !rounded-md !pl-[78px]"
                      buttonClass="!bg-[#12161c] !border-[#27313d] !w-[68px]"
                      dropdownClass="!bg-[#12161c] !text-white"
                      searchClass="!bg-[#12161c] !text-white"
                      inputStyle={{
                        background: "#12161c",
                        color: "#fff",
                        border: "1px solid #27313d",
                        borderRadius: "0.375rem",
                        height: "42px",
                        paddingLeft: "78px", // ensures +234 is visible beside flag
                        fontSize: "15px",
                        lineHeight: "1.25rem",
                      }}
                      buttonStyle={{
                        background: "#12161c",
                        borderColor: "#27313d",
                        width: "68px",
                      }}
                      dropdownStyle={{
                        background: "#12161c",
                        color: "#ffffff",
                        border: "1px solid #27313d",
                      }}
                    />
                    {renderError("phone")}
                  </div>
                <div>
                  <input
                    name="address"
                    placeholder="Address"
                    onChange={handleInputChange}
                    className={inputClass}
                  />
                  {renderError("address")}
                </div>

                <div>
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    placeholder={
                      loadingCountries ? "Loading countries..." : "Select Country"
                    }
                    isSearchable
                    isLoading={loadingCountries}
                    onChange={(option: any) => {
                      setSelectedCountry(option);
                      setFormData((prev) => ({
                        ...prev,
                        country: option?.value || "",
                      }));
                      setErrors((prev) => ({ ...prev, country: "" }));
                    }}
                    className="text-black w-full"
                    styles={{
                      control: (base) => ({
                        ...base,
                        backgroundColor: "#12161c",
                        borderColor: "#27313d",
                        color: "white",
                        minHeight: "45px",
                      }),
                      singleValue: (base) => ({ ...base, color: "white" }),
                      menu: (base) => ({
                        ...base,
                        backgroundColor: "#12161c",
                        color: "white",
                        border: "1px solid #27313d",
                      }),
                      option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isSelected
                          ? "#f0b90b"
                          : state.isFocused
                          ? "#1b2430"
                          : "#12161c",
                        color: state.isSelected ? "#000" : "#fff",
                      }),
                      input: (base) => ({ ...base, color: "white" }),
                      placeholder: (base) => ({ ...base, color: "#9aa7b2" }),
                      dropdownIndicator: (base) => ({ ...base, color: "#9aa7b2" }),
                      indicatorSeparator: () => ({ display: "none" }),
                    }}
                  />
                  {renderError("country")}
                </div>
              </div>
            )}

            {/* STEP 1: ID Type */}
            {step === 1 && (
              <div className="w-full flex flex-col gap-3 text-left">
                <div>
                  <select
                    name="idType"
                    value={formData.idType}
                    onChange={(e) => {
                      const value = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        idType: value,
                        idNumber:
                          value === "NIN" || value === "Driver’s License"
                            ? prev.idNumber
                            : "",
                      }));
                      setErrors((prev) => ({ ...prev, idType: "" }));
                    }}
                    className={inputClass}
                  >
                    <option value="">Select ID Type</option>
                    <option value="NIN">NIN</option>
                    <option value="Driver’s License">Driver’s License</option>
                    <option value="Voter’s Card">Voter’s Card</option>
                    <option value="International Passport">
                      International Passport
                    </option>
                  </select>
                  {renderError("idType")}
                </div>

                {(formData.idType === "NIN" ||
                  formData.idType === "Driver’s License") && (
                  <div>
                    <input
                      name="idNumber"
                      placeholder="ID Number"
                      onChange={handleInputChange}
                      value={formData.idNumber}
                      className={inputClass}
                    />
                    {renderError("idNumber")}
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: Upload ID Front */}
            {step === 2 && (
              <div className="w-full flex flex-col items-center">
                <button
                  onClick={() => {
                    fileInputRef.current?.removeAttribute("capture");
                    fileInputRef.current?.setAttribute("accept", "image/*");
                    fileInputRef.current?.click();
                  }}
                  className="bg-[#f0b90b] text-black w-full py-4 rounded-xl text-lg font-semibold mt-2 hover:brightness-110"
                >
                  Upload Document (Front)
                </button>
                {renderError("idFront")}
                {renderFilePreview(formData.idFront)}
              </div>
            )}

            {/* STEP 3: Upload ID Back */}
            {step === 3 && (
              <div className="w-full flex flex-col items-center">
                <button
                  onClick={() => {
                    fileInputRef.current?.removeAttribute("capture");
                    fileInputRef.current?.setAttribute("accept", "image/*");
                    fileInputRef.current?.click();
                  }}
                  className="bg-[#f0b90b] text-black w-full py-4 rounded-xl text-lg font-semibold mt-2 hover:brightness-110"
                >
                  Upload Document (Back)
                </button>
                {renderError("idBack")}
                {renderFilePreview(formData.idBack)}
              </div>
            )}

            {/* STEP 4: Proof of Address */}
            {step === 4 && (
              <div className="w-full flex flex-col gap-3 items-center">
                <div className="w-full">
                  <select
                    name="proofType"
                    value={formData.proofType}
                    onChange={handleInputChange}
                    className={inputClass}
                  >
                    <option value="">Select Utility Bill Type</option>
                    {utilityOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {renderError("proofType")}
                </div>
                <button
                  onClick={() => {
                    fileInputRef.current?.removeAttribute("capture");
                    fileInputRef.current?.setAttribute("accept", "image/*");
                    fileInputRef.current?.click();
                  }}
                  className="bg-[#f0b90b] text-black w-full py-4 rounded-xl text-lg font-semibold mt-2 hover:brightness-110"
                >
                  Upload Document
                </button>
                {renderError("utilityBill")}
                {renderFilePreview(formData.utilityBill)}
              </div>
            )}

            {/* STEP 5: Selfie */}
            {step === 5 && (
              <div className="w-full text-left">
                <div className="bg-[#1b2430] rounded-lg p-3 text-sm text-gray-300 leading-relaxed border border-[#27313d]">
                  📸 <strong>Selfie Verification Instructions</strong>
                  <ul className="list-disc ml-5 mt-2 space-y-1">
                    <li>Ensure your face is clearly visible and centered.</li>
                    <li>Use a bright, well-lit environment (avoid backlight).</li>
                    <li>Remove hats/sunglasses and face coverings.</li>
                    <li>Hold your phone steady and look straight ahead.</li>
                    <li>Turn your head slightly left and right when prompted.</li>
                  </ul>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3">
                  <button
                    onClick={() => setShowSelfieModal(true)}
                    className="bg-[#f0b90b] text-black w-full py-4 rounded-xl text-lg font-semibold hover:brightness-110"
                  >
                    Take or Upload Selfie
                  </button>
                </div>

                {renderError("selfie")}
                <div className="flex justify-center">
                  {renderFilePreview(formData.selfie)}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={prev}
            disabled={step === 0 || loading}
            className="px-4 py-2 bg-[#1b2430] border border-[#27313d] rounded hover:bg-[#202a36] disabled:opacity-50"
          >
            Back
          </button>
          {step < steps.length - 1 ? (
            <button
              onClick={next}
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
      {/* ✅ Terms & Conditions moved to a separate full card (Option A) */}
      <div className="w-full max-w-lg bg-[#12161c]/95 backdrop-blur-xl border border-[#1f2937] rounded-2xl shadow-2xl p-6 mt-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5" size={20} />
          <div className="flex-1">
            <h4 className="font-semibold">Terms & Conditions</h4>
            <p className="text-sm text-gray-300 mt-1 leading-relaxed">
              By continuing your verification, you agree to our processing of your
              information for KYC purposes in line with our policy. You can review
              the full document before accepting.
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-3">
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#f0b90b] hover:underline text-sm"
              >
                Read Terms <ExternalLink size={14} />
              </a>

              <button
                type="button"
                onClick={() => {
                  setTermsAccepted(true);
                  toast.success("Terms accepted");
                }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md border ${
                  termsAccepted
                    ? "bg-[#1f2a36] border-[#2e3a47] text-green-400"
                    : "bg-[#1b2430] border-[#27313d] text-gray-100 hover:bg-[#202a36]"
                }`}
              >
                {termsAccepted ? <CheckCircle2 size={16} /> : null}
                {termsAccepted ? "Accepted" : "Accept & Continue"}
              </button>
            </div>
          </div>
        </div>

        {/* info badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-5 text-sm">
          <div className="flex items-center gap-2 rounded-md bg-[#0f141a] border border-[#27313d] px-3 py-2">
            <Lock size={16} className="text-[#f0b90b]" />
            <span>Bank-grade encryption</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-[#0f141a] border border-[#27313d] px-3 py-2">
            <ShieldCheck size={16} className="text-[#f0b90b]" />
            <span>Manual review process</span>
          </div>
          <div className="flex items-center gap-2 rounded-md bg-[#0f141a] border border-[#27313d] px-3 py-2">
            <Clock size={16} className="text-[#f0b90b]" />
            <span>Updates via email</span>
          </div>
        </div>
      </div>

      {/* Confetti Modal */}
      {showConfetti && (
        <>
          <Confetti width={windowSize.width} height={windowSize.height} />
          <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-lg z-50">
            <div className="bg-[#12161c] p-6 rounded-2xl text-center shadow-xl max-w-sm border border-[#27313d]">
              <div className="text-5xl mb-3">✅</div>
              <h3 className="text-lg font-bold">KYC Submitted!</h3>
              <p className="text-gray-300 mt-2 leading-relaxed">
                We’ve received your KYC submission.{" "}
                <strong>
                  Please check your email for a confirmation. If you don’t see it,
                  check your <u>Spam/Junk</u> folder. We typically review within 24 hours.
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
      )}

      {/* Selfie Modal */}
      {showSelfieModal && (
        <div className="fixed inset-0 flex items-end justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="w-full max-w-md bg-[#12161c] rounded-t-2xl p-4 shadow-2xl border border-[#27313d]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold">Choose Option</h3>
              <button
                onClick={() => setShowSelfieModal(false)}
                className="rounded-full p-1 hover:bg-white/10"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              <button
                onClick={() => handleSelfie("camera")}
                className="w-full flex items-center justify-center gap-2 bg-[#f0b90b] text-black py-3 rounded-xl text-lg font-semibold hover:brightness-110"
              >
                <Camera size={20} /> Take Selfie (Camera)
              </button>

              <button
                onClick={() => handleSelfie("upload")}
                className="w-full flex items-center justify-center gap-2 bg-[#1b2430] text-white py-3 rounded-xl text-lg font-semibold border border-[#27313d] hover:bg-[#202a36]"
              >
                <Upload size={20} /> Upload from Device
              </button>
            </div>

            <p className="text-[12px] text-gray-400 mt-3 text-center">
              If your browser does not support camera capture, use “Upload from
              Device”.
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
