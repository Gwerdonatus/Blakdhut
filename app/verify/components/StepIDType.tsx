"use client";
import React from "react";

export default function StepIDType({ formData, setFormData, errors, setErrors }: any) {
  const inputClass =
    "w-full bg-[#12161c] text-white placeholder:text-gray-400 border border-[#27313d] rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/30";
  const renderError = (n: string) =>
    errors[n] ? <p className="text-xs text-red-400">{errors[n]}</p> : null;

  return (
    <div className="w-full flex flex-col gap-3 text-left">
      <select
        name="idType"
        value={formData.idType}
        onChange={(e) => {
          const value = e.target.value;
          setFormData((prev: any) => ({
            ...prev,
            idType: value,
            idNumber:
              value === "NIN" || value === "Driver’s License"
                ? prev.idNumber
                : "",
          }));
          setErrors((prev: any) => ({ ...prev, idType: "" }));
        }}
        className={inputClass}
      >
        <option value="">Select ID Type</option>
        <option value="NIN">NIN</option>
        <option value="Driver’s License">Driver’s License</option>
        <option value="Voter’s Card">Voter’s Card</option>
        <option value="International Passport">International Passport</option>
      </select>
      {renderError("idType")}

      {(formData.idType === "NIN" || formData.idType === "Driver’s License") && (
        <>
          <input
            name="idNumber"
            placeholder="ID Number"
            onChange={(e) =>
              setFormData((prev: any) => ({
                ...prev,
                idNumber: e.target.value,
              }))
            }
            value={formData.idNumber}
            className={inputClass}
          />
          {renderError("idNumber")}
        </>
      )}
    </div>
  );
}
