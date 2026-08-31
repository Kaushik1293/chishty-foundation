"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import SectionHeading from "../common/SectionHeading";

const EASE = [0.16, 1, 0.3, 1] as const;

export const DONATION_CATEGORIES = [
  "Education",
  "Healthcare",
  "Women Empowerment",
  "Livelihood & Skills",
  "Environment & Sustainability",
  "Hunger Relief",
  "Other",
] as const;

export type DonationCategory = (typeof DONATION_CATEGORIES)[number];
export type PaymentMethod = "UPI" | "Debit/Credit Card" | "PayPal";

const PRESET_AMOUNTS = [500, 1000, 2500, 5000, 10000];

const EASE_STAGGER: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

interface DonationFormData {
  category: DonationCategory;
  amount: string;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  paymentMethod: PaymentMethod;
}

const DEFAULT_UPI_ID = "chishtyfoundation@boi";

const DonationFormSection = () => {
  const [formData, setFormData] = useState<DonationFormData>({
    category: "Education",
    amount: "1000",
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "India",
    paymentMethod: "UPI",
  });

  const [selectedPreset, setSelectedPreset] = useState<number | "custom">(1000);
  const [errors, setErrors] = useState<Partial<Record<keyof DonationFormData | "form", string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handlePresetSelect = (amt: number) => {
    setSelectedPreset(amt);
    setFormData((prev) => ({ ...prev, amount: amt.toString() }));
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: undefined }));
    }
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSelectedPreset("custom");
    setFormData((prev) => ({ ...prev, amount: val }));
    if (errors.amount) {
      setErrors((prev) => ({ ...prev, amount: undefined }));
    }
  };

  const handleInputChange = (field: keyof DonationFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof DonationFormData, string>> = {};

    const numAmount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = "Please enter a valid donation amount";
    }

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (formData.phone.replace(/\D/g, "").length < 7) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent duplicate submissions

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // Record donation intent via existing Supabase architecture
      const { submitDonationIntent } = await import("@/app/(web)/action");
      await submitDonationIntent({
        category: formData.category,
        amount: parseFloat(formData.amount),
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim() || undefined,
        city: formData.city.trim() || undefined,
        country: formData.country.trim() || undefined,
        payment_method: formData.paymentMethod,
      });

      setSubmissionStatus("success");
    } catch (err: any) {
      setSubmissionStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred during processing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseClasses =
    "w-full rounded-xl bg-[#FBF6F0] border px-4 py-3 font-satoshi text-sm text-dark-green placeholder:text-dark-green/40 outline-none transition-colors duration-300 focus:border-dark-yellow";

  return (
    <section className="relative bg-beige py-16 md:py-24 font-satoshi" id="donation-section">
      <div className="container mx-auto px-5 md:px-0">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionHeading
            align="center"
            eyebrow="SUPPORT OUR CAUSES"
            title={
              <>
                Empower Lives Through <span className="text-dark-yellow">Giving</span>
              </>
            }
            description="Every contribution directly supports our verified programs."
          />
        </div>

        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
          {/* Main Donation Form */}
          <motion.div
            variants={EASE_STAGGER}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="bg-white rounded-4xl shadow-[0_10px_40px_-16px_rgba(0,0,0,0.08)] px-7 md:px-10 py-9 border border-[#F1E3D7]"
          >
            <AnimatePresence mode="wait">
              {submissionStatus === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-10 text-center"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-dark-green/10 flex items-center justify-center text-dark-yellow mb-6">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                      <polyline points="22 4 12 14.01 9 11.01" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <h3 className="font-cormorant font-bold text-3xl text-dark-green mb-3">
                    Donation Request Registered!
                  </h3>

                  <p className="text-dark-green/75 max-w-md mx-auto text-base mb-6 leading-relaxed">
                    Thank you, <span className="font-semibold text-dark-green">{formData.fullName}</span>. Your contribution of{" "}
                    <span className="font-semibold text-dark-yellow">₹{parseFloat(formData.amount).toLocaleString("en-IN")}</span> for{" "}
                    <span className="italic font-medium">{formData.category}</span> is greatly appreciated.
                  </p>

                  <div className="bg-beige border border-[#F2E7D6] rounded-2xl p-5 max-w-md mx-auto text-left text-xs sm:text-sm text-dark-green/80 mb-6 space-y-2">
                    <p className="font-semibold text-dark-green">Completing Your Payment:</p>
                    <p>
                      {formData.paymentMethod === "UPI" && (
                        <>Please scan the QR code or transfer via UPI ID: <strong className="text-dark-green">{DEFAULT_UPI_ID}</strong>.</>
                      )}
                      {formData.paymentMethod === "Debit/Credit Card" && (
                        <>Payment gateway integration is ready. You will be redirected to the secure portal or can transfer directly to our official BOI / ICICI accounts on the right.</>
                      )}
                      {formData.paymentMethod === "PayPal" && (
                        <>For international transfers, please contact <strong className="text-dark-green">services@chishtyfoundation.org</strong> or transfer directly to our official accounts.</>
                      )}
                    </p>
                    <p className="text-dark-green/60 text-[11px] pt-1">
                      A confirmation email has been dispatched to {formData.email}.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmissionStatus("idle");
                      setFormData((prev) => ({ ...prev, fullName: "", email: "", phone: "", address: "", city: "" }));
                    }}
                    className="rounded-full bg-dark-green text-white px-8 py-3 text-sm font-medium hover:bg-dark-green/90 transition-colors"
                  >
                    Make Another Donation
                  </button>
                </motion.div>
              ) : submissionStatus === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-10 text-center"
                >
                  <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-6">
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                  </div>

                  <h3 className="font-cormorant font-bold text-3xl text-red-700 mb-3">
                    Payment Processing Notice
                  </h3>

                  <p className="text-dark-green/75 max-w-md mx-auto text-base mb-6 leading-relaxed">
                    {errorMessage || "We encountered an issue preparing your transaction. You may also transfer directly via our official bank details."}
                  </p>

                  <div className="flex gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => setSubmissionStatus("idle")}
                      className="rounded-full bg-dark-green text-white px-6 py-2.5 text-sm font-medium hover:bg-dark-green/90 transition-colors"
                    >
                      Try Again
                    </button>
                    <a
                      href="#bank-details"
                      className="rounded-full bg-dark-yellow text-white px-6 py-2.5 text-sm font-medium hover:bg-dark-yellow/90 transition-colors"
                    >
                      View Bank Details
                    </a>
                  </div>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  {/* 1. Donation Category Dropdown */}
                  <motion.div variants={fadeUp} className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70 mb-2">
                      Donation Category<span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={handleInputChange("category")}
                      className={`${inputBaseClasses} cursor-pointer`}
                    >
                      {DONATION_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* 2. Donation Amount */}
                  <motion.div variants={fadeUp} className="mb-6">
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70 mb-2">
                      Donation Amount (INR)<span className="text-red-500">*</span>
                    </label>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 mb-3">
                      {PRESET_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => handlePresetSelect(amt)}
                          className={`py-2.5 rounded-xl border text-sm font-bold transition-all duration-200 ${
                            selectedPreset === amt
                              ? "bg-dark-yellow text-white border-dark-yellow shadow-md"
                              : "bg-[#FBF6F0] text-dark-green border-[#E8DFC9] hover:border-dark-yellow"
                          }`}
                        >
                          ₹{amt.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-green/60 font-bold">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Or enter custom amount"
                        value={formData.amount}
                        onChange={handleCustomAmountChange}
                        className={`${inputBaseClasses} pl-8 font-semibold ${
                          errors.amount ? "border-red-400" : "border-transparent"
                        }`}
                      />
                    </div>
                    {errors.amount && (
                      <p className="text-red-500 text-xs mt-1.5">{errors.amount}</p>
                    )}
                  </motion.div>

                  {/* 3. Personal Details: Full Name & Email */}
                  <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70 mb-2">
                        Full Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Haji Syed Salman"
                        value={formData.fullName}
                        onChange={handleInputChange("fullName")}
                        className={`${inputBaseClasses} ${errors.fullName ? "border-red-400" : "border-transparent"}`}
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70 mb-2">
                        Email Address<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleInputChange("email")}
                        className={`${inputBaseClasses} ${errors.email ? "border-red-400" : "border-transparent"}`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>
                  </motion.div>

                  {/* 4. Phone Number & Optional Address */}
                  <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70 mb-2">
                        Phone Number<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98291 XXXXX"
                        value={formData.phone}
                        onChange={handleInputChange("phone")}
                        className={`${inputBaseClasses} ${errors.phone ? "border-red-400" : "border-transparent"}`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70 mb-2">
                        Address <span className="text-dark-green/40 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Street / Locality"
                        value={formData.address}
                        onChange={handleInputChange("address")}
                        className={`${inputBaseClasses} border-transparent`}
                      />
                    </div>
                  </motion.div>

                  {/* 5. City & Country (Optional) */}
                  <motion.div variants={fadeUp} className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70 mb-2">
                        City <span className="text-dark-green/40 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Ajmer"
                        value={formData.city}
                        onChange={handleInputChange("city")}
                        className={`${inputBaseClasses} border-transparent`}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70 mb-2">
                        Country <span className="text-dark-green/40 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. India"
                        value={formData.country}
                        onChange={handleInputChange("country")}
                        className={`${inputBaseClasses} border-transparent`}
                      />
                    </div>
                  </motion.div>

                  {/* 6. Payment Method Selection */}
                  <motion.div variants={fadeUp} className="mb-8">
                    <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70 mb-3">
                      Payment Method<span className="text-red-500">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {(["UPI", "Debit/Credit Card", "PayPal"] as PaymentMethod[]).map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method }))}
                          className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold flex flex-col items-center justify-center gap-1 transition-all ${
                            formData.paymentMethod === method
                              ? "border-dark-green bg-dark-green text-white shadow-sm"
                              : "bg-[#FBF6F0] text-dark-green border-[#E8DFC9] hover:border-dark-yellow"
                          }`}
                        >
                          <span className="font-bold">{method}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>

                  {/* 7. Continue to Payment Button */}
                  <motion.div variants={fadeUp}>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-dark-yellow text-white py-4 font-satoshi font-bold text-base shadow-md hover:bg-dark-yellow/90 hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <SpinnerIcon />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>
                            Continue to Payment
                            {formData.amount && !isNaN(parseFloat(formData.amount)) && parseFloat(formData.amount) > 0
                              ? ` (₹${parseFloat(formData.amount).toLocaleString("en-IN")})`
                              : ""}
                          </span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                  </motion.div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: QR/UPI & Official Bank Transfer Details */}
          <div className="flex flex-col gap-6" id="bank-details">
            {/* QR / UPI Donation Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="bg-dark-green text-white rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-md"
            >
              <div className="relative z-10 flex flex-col items-center text-center">
                <span className="text-light-yellow text-xs font-semibold tracking-widest uppercase mb-1">
                  Scan &amp; Make A Difference Today
                </span>
                <h4 className="font-cormorant font-bold text-2xl text-white mb-4">
                  Quick UPI Scan &amp; Pay
                </h4>

                {/* QR Code Container */}
                <div className="bg-white p-4 rounded-2xl shadow-xl mb-4 max-w-[200px] w-full">
                  <svg className="w-full h-auto" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="200" fill="white" />
                    {/* Top-left position block */}
                    <rect x="20" y="20" width="50" height="50" fill="#0A3231" rx="6" />
                    <rect x="30" y="30" width="30" height="30" fill="white" rx="3" />
                    <rect x="37" y="37" width="16" height="16" fill="#BD8C3B" rx="2" />

                    {/* Top-right position block */}
                    <rect x="130" y="20" width="50" height="50" fill="#0A3231" rx="6" />
                    <rect x="140" y="30" width="30" height="30" fill="white" rx="3" />
                    <rect x="147" y="37" width="16" height="16" fill="#BD8C3B" rx="2" />

                    {/* Bottom-left position block */}
                    <rect x="20" y="130" width="50" height="50" fill="#0A3231" rx="6" />
                    <rect x="30" y="140" width="30" height="30" fill="white" rx="3" />
                    <rect x="37" y="147" width="16" height="16" fill="#BD8C3B" rx="2" />

                    {/* Pattern dots */}
                    <rect x="80" y="20" width="12" height="12" fill="#0A3231" />
                    <rect x="100" y="20" width="12" height="12" fill="#0A3231" />
                    <rect x="80" y="40" width="12" height="12" fill="#BD8C3B" />
                    <rect x="100" y="50" width="12" height="12" fill="#0A3231" />
                    <rect x="80" y="80" width="12" height="12" fill="#0A3231" />
                    <rect x="100" y="80" width="12" height="12" fill="#0A3231" />
                    <rect x="20" y="90" width="12" height="12" fill="#0A3231" />
                    <rect x="40" y="90" width="12" height="12" fill="#BD8C3B" />
                    <rect x="60" y="90" width="12" height="12" fill="#0A3231" />
                    <rect x="130" y="90" width="12" height="12" fill="#0A3231" />
                    <rect x="150" y="90" width="12" height="12" fill="#BD8C3B" />
                    <rect x="170" y="90" width="12" height="12" fill="#0A3231" />
                    <rect x="80" y="110" width="12" height="12" fill="#BD8C3B" />
                    <rect x="100" y="110" width="12" height="12" fill="#0A3231" />
                    <rect x="120" y="110" width="12" height="12" fill="#0A3231" />
                    <rect x="80" y="140" width="12" height="12" fill="#0A3231" />
                    <rect x="100" y="150" width="12" height="12" fill="#BD8C3B" />
                    <rect x="130" y="140" width="12" height="12" fill="#0A3231" />
                    <rect x="160" y="140" width="12" height="12" fill="#0A3231" />
                    <rect x="140" y="160" width="12" height="12" fill="#BD8C3B" />
                    <rect x="170" y="170" width="12" height="12" fill="#0A3231" />
                  </svg>
                </div>

                <p className="text-white/80 text-xs mb-3">
                  Scan via GPay, PhonePe, Paytm, or any BHIM UPI App
                </p>

                <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20 text-xs">
                  <span className="text-white/70">UPI ID:</span>
                  <span className="font-mono text-light-yellow font-bold">{DEFAULT_UPI_ID}</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(DEFAULT_UPI_ID, "upi-id")}
                    className="text-white hover:text-light-yellow ml-1 cursor-pointer flex items-center gap-1 font-semibold"
                    title="Copy UPI ID"
                  >
                    {copiedKey === "upi-id" ? <CheckIcon /> : <CopyIcon />}
                    <span>{copiedKey === "upi-id" ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Primary Account (BOI) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="bg-white rounded-3xl p-6 border border-[#F1E3D7] shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#F2E7D6] pb-3">
                <div>
                  <span className="text-[11px] font-bold text-dark-yellow uppercase tracking-wider">
                    Primary Account
                  </span>
                  <h4 className="font-cormorant font-bold text-xl text-dark-green">
                    Bank of India (BOI) — Ajmer Branch
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-dark-green/10 text-dark-green text-[11px] font-bold">
                  Official
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center bg-beige p-2.5 rounded-xl border border-[#ECE2CB]">
                  <div>
                    <span className="text-dark-green/60 block text-[11px]">Account Name</span>
                    <strong className="text-dark-green font-semibold">CHISHTY FOUNDATION</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("CHISHTY FOUNDATION", "boi-name")}
                    className="flex items-center gap-1 text-dark-yellow hover:text-dark-green font-medium text-xs px-2 py-1 bg-white rounded-lg border border-[#ECE2CB] transition-colors cursor-pointer"
                  >
                    {copiedKey === "boi-name" ? <CheckIcon /> : <CopyIcon />}
                    {copiedKey === "boi-name" ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-beige p-2.5 rounded-xl border border-[#ECE2CB]">
                  <div>
                    <span className="text-dark-green/60 block text-[11px]">Account Number</span>
                    <strong className="text-dark-green font-semibold tracking-wider">666010110001053</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("666010110001053", "boi-acc")}
                    className="flex items-center gap-1 text-dark-yellow hover:text-dark-green font-medium text-xs px-2 py-1 bg-white rounded-lg border border-[#ECE2CB] transition-colors cursor-pointer"
                  >
                    {copiedKey === "boi-acc" ? <CheckIcon /> : <CopyIcon />}
                    {copiedKey === "boi-acc" ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-beige p-2.5 rounded-xl border border-[#ECE2CB]">
                  <div>
                    <span className="text-dark-green/60 block text-[11px]">IFSC Code</span>
                    <strong className="text-dark-green font-semibold tracking-wider">BKID0006660</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("BKID0006660", "boi-ifsc")}
                    className="flex items-center gap-1 text-dark-yellow hover:text-dark-green font-medium text-xs px-2 py-1 bg-white rounded-lg border border-[#ECE2CB] transition-colors cursor-pointer"
                  >
                    {copiedKey === "boi-ifsc" ? <CheckIcon /> : <CopyIcon />}
                    {copiedKey === "boi-ifsc" ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="text-[12px] text-dark-green/70 pt-1">
                  <strong>Branch Code / Address:</strong> Near St. Francis Hospital, Martindal Bridge, Ajmer, Rajasthan – 305001
                </div>
              </div>
            </motion.div>

            {/* Secondary Account (ICICI Bank) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.2 }}
              className="bg-white rounded-3xl p-6 border border-[#F1E3D7] shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#F2E7D6] pb-3">
                <div>
                  <span className="text-[11px] font-bold text-dark-yellow uppercase tracking-wider">
                    Secondary Account
                  </span>
                  <h4 className="font-cormorant font-bold text-xl text-dark-green">
                    ICICI Bank Ltd. — Ajmer
                  </h4>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-dark-green/10 text-dark-green text-[11px] font-bold">
                  Official
                </span>
              </div>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center bg-beige p-2.5 rounded-xl border border-[#ECE2CB]">
                  <div>
                    <span className="text-dark-green/60 block text-[11px]">Account Name</span>
                    <strong className="text-dark-green font-semibold">CHISHTY FOUNDATION</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("CHISHTY FOUNDATION", "icici-name")}
                    className="flex items-center gap-1 text-dark-yellow hover:text-dark-green font-medium text-xs px-2 py-1 bg-white rounded-lg border border-[#ECE2CB] transition-colors cursor-pointer"
                  >
                    {copiedKey === "icici-name" ? <CheckIcon /> : <CopyIcon />}
                    {copiedKey === "icici-name" ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-beige p-2.5 rounded-xl border border-[#ECE2CB]">
                  <div>
                    <span className="text-dark-green/60 block text-[11px]">Account Number</span>
                    <strong className="text-dark-green font-semibold tracking-wider">018501008699</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("018501008699", "icici-acc")}
                    className="flex items-center gap-1 text-dark-yellow hover:text-dark-green font-medium text-xs px-2 py-1 bg-white rounded-lg border border-[#ECE2CB] transition-colors cursor-pointer"
                  >
                    {copiedKey === "icici-acc" ? <CheckIcon /> : <CopyIcon />}
                    {copiedKey === "icici-acc" ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="flex justify-between items-center bg-beige p-2.5 rounded-xl border border-[#ECE2CB]">
                  <div>
                    <span className="text-dark-green/60 block text-[11px]">IFSC Code</span>
                    <strong className="text-dark-green font-semibold tracking-wider">ICIC0000185</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy("ICIC0000185", "icici-ifsc")}
                    className="flex items-center gap-1 text-dark-yellow hover:text-dark-green font-medium text-xs px-2 py-1 bg-white rounded-lg border border-[#ECE2CB] transition-colors cursor-pointer"
                  >
                    {copiedKey === "icici-ifsc" ? <CheckIcon /> : <CopyIcon />}
                    {copiedKey === "icici-ifsc" ? "Copied" : "Copy"}
                  </button>
                </div>

                <div className="text-[12px] text-dark-green/70 pt-1">
                  <strong>Branch Code / Address:</strong> Kutchury Road, Ajmer, Rajasthan
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationFormSection;
