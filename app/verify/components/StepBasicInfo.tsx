"use client";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Ensure this stays imported
import PhoneInput from "react-phone-input-2";
import dynamic from "next/dynamic";

const Select = dynamic(() => import("react-select"), { ssr: false });

export default function StepBasicInfo({
  formData,
  setFormData,
  errors,
  setErrors,
  countryOptions,
  selectedCountry,
  setSelectedCountry,
  loadingCountries,
  isValidEmail,
  sourceOfFundsOptions,
  selectedDate,
  setSelectedDate,
}: any) {
  const inputClass =
    "w-full bg-[#12161c] text-white placeholder:text-gray-400 border border-[#27313d] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/30";

  const renderError = (name: string) =>
    errors[name] ? (
      <p className="text-xs text-red-400 text-left -mt-1">{errors[name]}</p>
    ) : null;

  return (
    <div className="w-full flex flex-col gap-3 text-left">
      {/* Full Name */}
      <input
        name="fullName"
        placeholder="Full Name"
        onChange={(e) =>
          setFormData((prev: any) => ({ ...prev, fullName: e.target.value }))
        }
        className={inputClass}
      />
      {renderError("fullName")}

      {/* Email */}
      <input
        name="email"
        placeholder="Email Address"
        onChange={(e) =>
          setFormData((prev: any) => ({ ...prev, email: e.target.value }))
        }
        onBlur={(e) => {
          const v = e.target.value;
          if (v && !isValidEmail(v)) {
            setErrors((prev: any) => ({
              ...prev,
              email: "Enter a valid email address",
            }));
          }
        }}
        className={inputClass}
      />
      {renderError("email")}

      {/* Occupation */}
      <input
        name="occupation"
        placeholder="Occupation"
        onChange={(e) =>
          setFormData((prev: any) => ({ ...prev, occupation: e.target.value }))
        }
        className={inputClass}
      />
      {renderError("occupation")}

      {/* Source of Funds */}
      <select
        name="sourceOfFunds"
        value={formData.sourceOfFunds}
        onChange={(e) =>
          setFormData((prev: any) => ({
            ...prev,
            sourceOfFunds: e.target.value,
          }))
        }
        className={inputClass}
      >
        <option value="">Select Source of Funds</option>
        {sourceOfFundsOptions.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {renderError("sourceOfFunds")}

      {/* Telegram Username */}
      <input
        name="telegramUsername"
        placeholder="@Telegram Username"
        value={formData.telegramUsername}
        onChange={(e) => {
          const v = e.target.value.startsWith("@")
            ? e.target.value
            : "@" + e.target.value;
          setFormData((prev: any) => ({ ...prev, telegramUsername: v }));
          setErrors((prev: any) => ({ ...prev, telegramUsername: "" }));
        }}
        className={inputClass}
      />
      {renderError("telegramUsername")}

      {/* Modern Date of Birth Picker */}
      <div className="relative">
        <label className="block text-gray-300 text-sm mb-1 ml-1">
          Date of Birth
        </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date: any) => {
            setSelectedDate(date);
            setFormData((prev: any) => ({
              ...prev,
              dateOfBirth: date ? date.toISOString().split("T")[0] : "",
            }));
            setErrors((prev: any) => ({ ...prev, dateOfBirth: "" }));
          }}
          placeholderText="Select Date of Birth"
          className={`${inputClass} !bg-[#12161c] cursor-pointer text-white`}
          dateFormat="dd MMM yyyy"
          showYearDropdown
          showMonthDropdown
          dropdownMode="select"
          yearDropdownItemNumber={80}
          calendarClassName="!bg-[#12161c] !text-white !border !border-[#27313d] !rounded-lg !shadow-xl"
          dayClassName={() =>
            "text-white hover:bg-[#f0b90b]/30 rounded-full cursor-pointer"
          }
          popperClassName="!z-50"
        />
        {renderError("dateOfBirth")}
      </div>

      {/* Phone Input — with flag + full country dropdown */}
      <PhoneInput
        country={"ng"}
        value={formData.phone}
        onChange={(val: string) =>
          setFormData((prev: any) => ({ ...prev, phone: val }))
        }
        enableSearch={true}
        countryCodeEditable={true}
        placeholder="+234 801 234 5678"
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
          paddingLeft: "78px",
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

      {/* Address */}
      <input
        name="address"
        placeholder="Address"
        onChange={(e) =>
          setFormData((prev: any) => ({ ...prev, address: e.target.value }))
        }
        className={inputClass}
      />
      {renderError("address")}

      {/* Country Selector */}
      <Select
        options={countryOptions}
        value={selectedCountry}
        placeholder={
          loadingCountries ? "Loading countries..." : "Select Country"
        }
        isLoading={loadingCountries}
        onChange={(option: any) => {
          setSelectedCountry(option);
          setFormData((prev: any) => ({
            ...prev,
            country: option?.value || "",
          }));
          setErrors((prev: any) => ({ ...prev, country: "" }));
        }}
        className="text-black w-full"
      />
      {renderError("country")}
    </div>
  );
}
