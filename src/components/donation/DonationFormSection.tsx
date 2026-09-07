"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import qrCodeImg from "../../assets/images/donation-qr.png";
import { useRazorpayCheckout } from "@/lib/razorpay";

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

export interface CountryInfo {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
  minLen: number;
  maxLen: number;
  placeholder: string;
}

export const COUNTRIES: CountryInfo[] = [
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳", minLen: 10, maxLen: 10, placeholder: "98291 00000" },
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸", minLen: 10, maxLen: 10, placeholder: "202 555 0123" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧", minLen: 10, maxLen: 11, placeholder: "7911 123456" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971", flag: "🇦🇪", minLen: 9, maxLen: 9, placeholder: "50 123 4567" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966", flag: "🇸🇦", minLen: 9, maxLen: 9, placeholder: "50 123 4567" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦", minLen: 10, maxLen: 10, placeholder: "416 555 0123" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺", minLen: 9, maxLen: 10, placeholder: "412 345 678" },
  { code: "QA", name: "Qatar", dialCode: "+974", flag: "🇶🇦", minLen: 8, maxLen: 8, placeholder: "3312 3456" },
  { code: "KW", name: "Kuwait", dialCode: "+965", flag: "🇰🇼", minLen: 8, maxLen: 8, placeholder: "9123 4567" },
  { code: "OM", name: "Oman", dialCode: "+968", flag: "🇴🇲", minLen: 8, maxLen: 8, placeholder: "9123 4567" },
  { code: "BH", name: "Bahrain", dialCode: "+973", flag: "🇧🇭", minLen: 8, maxLen: 8, placeholder: "3600 1234" },
  { code: "SG", name: "Singapore", dialCode: "+65", flag: "🇸🇬", minLen: 8, maxLen: 8, placeholder: "8123 4567" },
  { code: "MY", name: "Malaysia", dialCode: "+60", flag: "🇲🇾", minLen: 9, maxLen: 10, placeholder: "12 345 6789" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪", minLen: 10, maxLen: 11, placeholder: "151 23456789" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷", minLen: 9, maxLen: 9, placeholder: "6 12 34 56 78" },
  { code: "TR", name: "Turkey", dialCode: "+90", flag: "🇹🇷", minLen: 10, maxLen: 10, placeholder: "532 123 4567" },
  { code: "ZA", name: "South Africa", dialCode: "+27", flag: "🇿🇦", minLen: 9, maxLen: 9, placeholder: "71 123 4567" },
  { code: "NZ", name: "New Zealand", dialCode: "+64", flag: "🇳🇿", minLen: 8, maxLen: 10, placeholder: "21 123 4567" },
  { code: "NL", name: "Netherlands", dialCode: "+31", flag: "🇳🇱", minLen: 9, maxLen: 9, placeholder: "6 12345678" },
  { code: "CH", name: "Switzerland", dialCode: "+41", flag: "🇨🇭", minLen: 9, maxLen: 9, placeholder: "78 123 45 67" },
  { code: "SE", name: "Sweden", dialCode: "+46", flag: "🇸🇪", minLen: 9, maxLen: 9, placeholder: "70 123 45 67" },
  { code: "NO", name: "Norway", dialCode: "+47", flag: "🇳🇴", minLen: 8, maxLen: 8, placeholder: "412 34 567" },
  { code: "DK", name: "Denmark", dialCode: "+45", flag: "🇩🇰", minLen: 8, maxLen: 8, placeholder: "20 12 34 56" },
  { code: "IT", name: "Italy", dialCode: "+39", flag: "🇮🇹", minLen: 9, maxLen: 10, placeholder: "312 345 6789" },
  { code: "ES", name: "Spain", dialCode: "+34", flag: "🇪🇸", minLen: 9, maxLen: 9, placeholder: "612 34 56 78" },
  { code: "IE", name: "Ireland", dialCode: "+353", flag: "🇮🇪", minLen: 9, maxLen: 9, placeholder: "83 123 4567" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵", minLen: 10, maxLen: 10, placeholder: "90 1234 5678" },
  { code: "BD", name: "Bangladesh", dialCode: "+880", flag: "🇧🇩", minLen: 10, maxLen: 10, placeholder: "1712 345678" },
  { code: "PK", name: "Pakistan", dialCode: "+92", flag: "🇵🇰", minLen: 10, maxLen: 10, placeholder: "300 1234567" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94", flag: "🇱🇰", minLen: 9, maxLen: 9, placeholder: "71 234 5678" },
  { code: "NP", name: "Nepal", dialCode: "+977", flag: "🇳🇵", minLen: 10, maxLen: 10, placeholder: "984 1234567" },
  { code: "ID", name: "Indonesia", dialCode: "+62", flag: "🇮🇩", minLen: 9, maxLen: 12, placeholder: "812 3456 7890" },
  { code: "EG", name: "Egypt", dialCode: "+20", flag: "🇪🇬", minLen: 10, maxLen: 10, placeholder: "100 123 4567" },
  { code: "JO", name: "Jordan", dialCode: "+962", flag: "🇯🇴", minLen: 9, maxLen: 9, placeholder: "7 9012 3456" },
  { code: "LB", name: "Lebanon", dialCode: "+961", flag: "🇱🇧", minLen: 7, maxLen: 8, placeholder: "70 123 456" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪", minLen: 9, maxLen: 9, placeholder: "712 345678" },
  { code: "NG", name: "Nigeria", dialCode: "+234", flag: "🇳🇬", minLen: 10, maxLen: 10, placeholder: "802 123 4567" },
  { code: "TZ", name: "Tanzania", dialCode: "+255", flag: "🇹🇿", minLen: 9, maxLen: 9, placeholder: "712 345 678" },
  { code: "UG", name: "Uganda", dialCode: "+256", flag: "🇺🇬", minLen: 9, maxLen: 9, placeholder: "712 345678" },
  { code: "MU", name: "Mauritius", dialCode: "+230", flag: "🇲🇺", minLen: 8, maxLen: 8, placeholder: "5123 4567" },
  { code: "MV", name: "Maldives", dialCode: "+960", flag: "🇲🇻", minLen: 7, maxLen: 7, placeholder: "712 3456" },
  { code: "TH", name: "Thailand", dialCode: "+66", flag: "🇹🇭", minLen: 9, maxLen: 9, placeholder: "81 234 5678" },
  { code: "PH", name: "Philippines", dialCode: "+63", flag: "🇵🇭", minLen: 10, maxLen: 10, placeholder: "917 123 4567" },
  { code: "VN", name: "Vietnam", dialCode: "+84", flag: "🇻🇳", minLen: 9, maxLen: 10, placeholder: "91 234 5678" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷", minLen: 10, maxLen: 11, placeholder: "11 91234 5678" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽", minLen: 10, maxLen: 10, placeholder: "55 1234 5678" },
  { code: "RU", name: "Russia", dialCode: "+7", flag: "🇷🇺", minLen: 10, maxLen: 10, placeholder: "912 345 67 89" },
  { code: "CN", name: "China", dialCode: "+86", flag: "🇨🇳", minLen: 11, maxLen: 11, placeholder: "138 0013 8000" },
  { code: "KR", name: "South Korea", dialCode: "+82", flag: "🇰🇷", minLen: 9, maxLen: 10, placeholder: "10 1234 5678" },
];

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

const CountryFlag = ({ code, name, className = "w-5 h-3.5" }: { code: string; name: string; className?: string }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
    srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
    alt={name}
    loading="lazy"
    className={`inline-block object-cover rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-black/10 shrink-0 ${className}`}
  />
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
  const { openCheckout } = useRazorpayCheckout();

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

  const [selectedCountry, setSelectedCountry] = useState<CountryInfo>(COUNTRIES[0]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  const [selectedPreset, setSelectedPreset] = useState<number | "custom">(1000);
  const [errors, setErrors] = useState<Partial<Record<keyof DonationFormData | "form", string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [paymentDetails, setPaymentDetails] = useState<{
    paymentId?: string;
    orderId?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Close country dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false);
      }
    };
    if (isCountryDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCountryDropdownOpen]);

  const filteredCountries = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.dialCode.includes(countrySearch) ||
      c.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleSelectCountry = (country: CountryInfo) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
    setCountrySearch("");
    // Automatically sync country field if default or empty
    setFormData((prev) => ({
      ...prev,
      country: country.name,
    }));
  };

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

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "").slice(0, selectedCountry.maxLen);
    setFormData((prev) => ({ ...prev, phone: rawVal }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
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

    const cleanPhone = formData.phone.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required";
    } else if (cleanPhone.length < selectedCountry.minLen) {
      newErrors.phone =
        selectedCountry.minLen === selectedCountry.maxLen
          ? `${selectedCountry.name} phone number must be ${selectedCountry.minLen} digits`
          : `${selectedCountry.name} phone number must be between ${selectedCountry.minLen} and ${selectedCountry.maxLen} digits`;
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
      let paymentId: string | undefined;
      let orderId: string | undefined;
      let signature: string | undefined;

      // Online payment via Razorpay
      if (formData.paymentMethod === "Debit/Credit Card" || formData.paymentMethod === "UPI") {
        // 1. Create Razorpay Order on server (via Supabase Edge Function)
        const { createRazorpayOrder, verifyRazorpayPayment } = await import("@/app/(web)/action");
        const orderRes = await createRazorpayOrder({
          amount: parseFloat(formData.amount),
          notes: {
            category: formData.category,
            donor_name: formData.fullName.trim(),
            donor_email: formData.email.trim(),
          },
        });

        if (!orderRes.success || !orderRes.order) {
          throw new Error(orderRes.error || "Failed to initialize payment order with Razorpay.");
        }

        const serverOrder = orderRes.order;
        const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

        if (!razorpayKey) {
          throw new Error("Razorpay Key ID was not returned by the server or environment.");
        }

        // 2. Open Razorpay Checkout modal
        try {
          const rawDigits = formData.phone.replace(/\D/g, "");
          const formattedDialPhone = `${selectedCountry.dialCode}${rawDigits}`;
          const fullPhoneWithCode = `${selectedCountry.dialCode} ${formData.phone}`.trim();

          const response = await openCheckout({
            key: razorpayKey,
            amount: serverOrder.amount,
            currency: serverOrder.currency,
            name: "Chishty Foundation",
            description: `Donation for ${formData.category}`,
            order_id: serverOrder.id,
            prefill: {
              name: formData.fullName.trim(),
              email: formData.email.trim(),
              contact: formattedDialPhone,
            },
            theme: { color: "#BD8C3B" },
          });

          paymentId = response.razorpay_payment_id;
          orderId = response.razorpay_order_id || serverOrder.id;
          signature = response.razorpay_signature;

          // 3. Verify Payment signature on backend via Supabase Edge Function
          if (signature && orderId) {
            const verifyRes = await verifyRazorpayPayment({
              razorpay_order_id: orderId,
              razorpay_payment_id: paymentId,
              razorpay_signature: signature,
            });

            if (!verifyRes.success) {
              console.warn("Signature verification warning:", verifyRes.error);
            }
          }

          setPaymentDetails({ paymentId, orderId });
        } catch (checkoutErr: any) {
          if (checkoutErr?.message?.includes("cancelled")) {
            setIsSubmitting(false);
            return; // User cancelled the payment modal
          }
          throw checkoutErr;
        }
      }

      // 4. Record donation in database
      const fullPhone = `${selectedCountry.dialCode} ${formData.phone}`.trim();
      const { submitDonationIntent } = await import("@/app/(web)/action");
      await submitDonationIntent({
        category: formData.category,
        amount: parseFloat(formData.amount),
        full_name: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: fullPhone,
        address: formData.address.trim() || undefined,
        city: formData.city.trim() || undefined,
        country: formData.country.trim() || selectedCountry.name,
        payment_method: formData.paymentMethod,
        payment_id: paymentId,
        razorpay_order_id: orderId,
        razorpay_signature: signature,
        status: paymentId ? "completed" : "pending",
      });

      setSubmissionStatus("success");
    } catch (err: any) {
      setSubmissionStatus("error");
      setErrorMessage(err.message || "An unexpected error occurred during processing. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrintReceipt = () => {
    const printWindow = window.open("", "_blank", "width=750,height=850");
    const formattedAmount = parseFloat(formData.amount || "0").toLocaleString("en-IN");
    const currentDate = new Date().toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    if (!printWindow) {
      window.print();
      return;
    }

    printWindow.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Donation Receipt - Chishty Foundation</title>
  <style>
    @page { size: portrait; margin: 12mm; }
    * { box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
      margin: 0;
      padding: 10px;
      background: #ffffff;
      color: #0A3231;
    }
    .receipt {
      max-width: 580px;
      margin: 0 auto;
      background: #FAF6EE;
      border: 1.5px solid #EADBBE;
      border-radius: 16px;
      padding: 26px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1.5px solid #EADBBE;
      padding-bottom: 12px;
      margin-bottom: 16px;
    }
    .title {
      font-size: 19px;
      font-weight: 800;
      color: #0A3231;
    }
    .subtitle {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #777;
      margin-bottom: 2px;
      font-weight: 700;
    }
    .badge {
      background: #D1FAE5;
      color: #065F46;
      padding: 5px 12px;
      border-radius: 9999px;
      font-size: 11px;
      font-weight: 700;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      font-size: 13px;
    }
    .cell {
      display: flex;
      flex-direction: column;
    }
    .label {
      font-size: 10px;
      color: #777;
      margin-bottom: 2px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .val {
      font-weight: 600;
      color: #0A3231;
    }
    .amount {
      font-size: 20px;
      font-weight: 800;
      color: #BD8C3B;
    }
    .payment-box {
      grid-column: span 2;
      background: #FFFFFF;
      padding: 9px 12px;
      border-radius: 8px;
      border: 1px solid #EADBBE;
    }
    .mono {
      font-family: monospace;
      font-size: 12px;
    }
    .footer {
      margin-top: 18px;
      padding-top: 12px;
      border-top: 1px solid #EADBBE;
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #666;
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <div>
        <div class="subtitle">Official Donation Receipt</div>
        <div class="title">CHISHTY FOUNDATION</div>
      </div>
      <div class="badge">Payment Confirmed</div>
    </div>
    <div class="grid">
      <div class="cell">
        <span class="label">Donation Amount</span>
        <span class="val amount">₹${formattedAmount}</span>
      </div>
      <div class="cell">
        <span class="label">Cause / Program</span>
        <span class="val">${formData.category}</span>
      </div>
      ${paymentDetails?.paymentId ? `
      <div class="payment-box cell">
        <span class="label">Payment ID (Razorpay)</span>
        <span class="val mono">${paymentDetails.paymentId}</span>
      </div>
      ` : ""}
      <div class="cell">
        <span class="label">Donor Name</span>
        <span class="val">${formData.fullName || "—"}</span>
      </div>
      <div class="cell">
        <span class="label">Email</span>
        <span class="val" style="word-break: break-all;">${formData.email || "—"}</span>
      </div>
      <div class="cell">
        <span class="label">Phone</span>
        <span class="val">${formData.phone || "—"}</span>
      </div>
      <div class="cell">
        <span class="label">Payment Mode</span>
        <span class="val">${formData.paymentMethod}</span>
      </div>
      <div class="cell">
        <span class="label">Date</span>
        <span class="val">${currentDate}</span>
      </div>
    </div>
    <div class="footer">
      <span>Section 80G Tax Exemption Eligible</span>
      <span>Ajmer Sharif, Rajasthan, India</span>
    </div>
  </div>
  <script>
    window.onload = function() {
      window.focus();
      window.print();
      window.onafterprint = function() { window.close(); };
    };
  </script>
</body>
</html>`);
    printWindow.document.close();
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
          {/* Main Donation Form / Thank You Screen */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="bg-white rounded-4xl shadow-[0_10px_40px_-16px_rgba(0,0,0,0.08)] px-7 md:px-10 py-9 border border-[#F1E3D7]"
          >
            <AnimatePresence mode="wait">
              {submissionStatus === "success" ? (
                <motion.div
                  key="thank-you"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="py-4 text-center"
                >
                  {/* Success Badge */}
                  <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center text-emerald-600 mb-5 shadow-sm">
                    <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <span className="text-dark-yellow text-xs font-bold uppercase tracking-widest block mb-1">
                    Payment Confirmed
                  </span>
                  <h3 className="font-cormorant font-bold text-3xl sm:text-4xl text-dark-green mb-3">
                    Thank You for Your Generous Giving!
                  </h3>

                  <p className="text-dark-green/75 max-w-lg mx-auto text-sm sm:text-base mb-6 leading-relaxed">
                    Dear <span className="font-semibold text-dark-green">{formData.fullName}</span>, your contribution has been successfully received. May your kindness bring abundance and blessings.
                  </p>

                  {/* Formal Receipt Summary Box */}
                  <div id="donation-receipt" className="bg-[#FAF6EE] border border-[#EADBBE] rounded-3xl p-6 text-left max-w-lg mx-auto mb-6 shadow-sm">
                    <div className="flex justify-between items-center pb-4 mb-4 border-b border-[#EADBBE]">
                      <div>
                        <span className="text-[11px] font-semibold text-dark-green/60 uppercase tracking-wider block">
                          Official Donation Receipt
                        </span>
                        <strong className="text-dark-green font-bold text-base">CHISHTY FOUNDATION</strong>
                      </div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Payment Confirmed
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div>
                        <span className="text-dark-green/60 block text-[11px]">Donation Amount</span>
                        <strong className="text-dark-yellow font-bold text-lg">
                          ₹{parseFloat(formData.amount || "0").toLocaleString("en-IN")}
                        </strong>
                      </div>

                      <div>
                        <span className="text-dark-green/60 block text-[11px]">Cause / Program</span>
                        <strong className="text-dark-green font-semibold">{formData.category}</strong>
                      </div>

                      {paymentDetails?.paymentId && (
                        <div className="col-span-2 bg-white/80 p-2.5 rounded-xl border border-[#EADBBE]">
                          <span className="text-dark-green/60 block text-[11px]">Payment ID (Razorpay)</span>
                          <div className="flex justify-between items-center">
                            <strong className="font-mono text-dark-green text-xs break-all">
                              {paymentDetails.paymentId}
                            </strong>
                            <button
                              type="button"
                              onClick={() => handleCopy(paymentDetails.paymentId!, "pay-id")}
                              className="text-dark-yellow hover:text-dark-green text-xs font-semibold ml-2 cursor-pointer flex items-center gap-1"
                            >
                              {copiedKey === "pay-id" ? "Copied!" : "Copy"}
                            </button>
                          </div>
                        </div>
                      )}

                      <div>
                        <span className="text-dark-green/60 block text-[11px]">Donor Name</span>
                        <span className="font-medium text-dark-green">{formData.fullName || "—"}</span>
                      </div>

                      <div>
                        <span className="text-dark-green/60 block text-[11px]">Email</span>
                        <span className="font-medium text-dark-green break-all">{formData.email || "—"}</span>
                      </div>

                      <div>
                        <span className="text-dark-green/60 block text-[11px]">Phone</span>
                        <span className="font-medium text-dark-green">{formData.phone || "—"}</span>
                      </div>

                      <div>
                        <span className="text-dark-green/60 block text-[11px]">Payment Mode</span>
                        <span className="font-medium text-dark-green">{formData.paymentMethod}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#EADBBE] flex items-center justify-between text-[11px] text-dark-green/70">
                      <span>Section 80G Tax Exemption Eligible</span>
                      <span>Ajmer Sharif, Rajasthan, India</span>
                    </div>
                  </div>

                  <p className="text-dark-green/60 text-xs mb-6 max-w-md mx-auto">
                    A formal donation receipt has been dispatched to <strong>{formData.email}</strong>.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handlePrintReceipt}
                      className="rounded-full bg-dark-yellow text-white px-6 py-3 text-sm font-semibold hover:bg-dark-yellow/90 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="6 9 6 2 18 2 18 9" />
                        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                        <rect x="6" y="14" width="12" height="8" />
                      </svg>
                      Print / Save Receipt
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmissionStatus("idle");
                        setPaymentDetails(null);
                        setSelectedPreset(1000);
                        setFormData({
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
                      }}
                      className="rounded-full bg-dark-green text-white px-6 py-3 text-sm font-semibold hover:bg-dark-green/90 transition-all cursor-pointer"
                    >
                      Make Another Donation
                    </button>
                  </div>
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
                      className="rounded-full bg-dark-green text-white px-6 py-2.5 text-sm font-medium hover:bg-dark-green/90 transition-colors cursor-pointer"
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
                <motion.form
                  key="donation-form"
                  variants={EASE_STAGGER}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -10 }}
                  onSubmit={handleSubmit}
                  noValidate
                >
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
                          className={`py-2.5 rounded-xl border text-sm font-bold transition-all duration-200 ${selectedPreset === amt
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
                        className={`${inputBaseClasses} pl-8 font-semibold ${errors.amount ? "border-red-400" : "border-transparent"
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
                      <div className="relative flex items-stretch">
                        {/* Country Picker Trigger (Real Flag Image) */}
                        <button
                          type="button"
                          onClick={() => setIsCountryDropdownOpen((prev) => !prev)}
                          className="flex items-center gap-2 pl-3 pr-2 py-3 bg-[#F4EDE2] hover:bg-[#EDE3D3] rounded-l-xl border-y border-l border-r border-[#E8DFC9] text-dark-green transition-colors cursor-pointer shrink-0"
                          title={`${selectedCountry.name} (${selectedCountry.dialCode})`}
                        >
                          <CountryFlag code={selectedCountry.code} name={selectedCountry.name} className="w-6 h-4" />
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className={`transition-transform duration-200 text-dark-green/60 ${
                              isCountryDropdownOpen ? "rotate-180" : ""
                            }`}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>

                        {/* Local Phone Number Input */}
                        <input
                          type="tel"
                          inputMode="numeric"
                          maxLength={selectedCountry.maxLen}
                          placeholder={selectedCountry.placeholder}
                          value={formData.phone}
                          onChange={handlePhoneChange}
                          className={`${inputBaseClasses} rounded-l-none pl-3 ${
                            errors.phone ? "border-red-400" : "border-transparent"
                          }`}
                        />

                        {/* Searchable Country Dropdown Modal */}
                        {isCountryDropdownOpen && (
                          <div
                            ref={countryDropdownRef}
                            className="absolute top-full left-0 mt-1.5 w-72 sm:w-80 max-h-72 bg-white rounded-2xl shadow-2xl border border-[#E8DFC9] z-50 overflow-hidden flex flex-col"
                          >
                            <div className="p-2.5 border-b border-[#F1E3D7] bg-[#FAF6EE]">
                              <input
                                type="text"
                                placeholder="Search country or code..."
                                value={countrySearch}
                                onChange={(e) => setCountrySearch(e.target.value)}
                                className="w-full bg-white rounded-lg px-3 py-1.5 text-xs text-dark-green placeholder:text-dark-green/40 outline-none border border-[#E8DFC9] focus:border-dark-yellow"
                                autoFocus
                              />
                            </div>
                            <div className="overflow-y-auto max-h-56 p-1 divide-y divide-[#FAF6EE]">
                              {filteredCountries.map((country) => (
                                <button
                                  key={country.code}
                                  type="button"
                                  onClick={() => handleSelectCountry(country)}
                                  className={`w-full flex items-center justify-between px-3 py-2 text-xs rounded-lg transition-colors text-left cursor-pointer ${
                                    selectedCountry.code === country.code
                                      ? "bg-dark-yellow/15 text-dark-green font-bold"
                                      : "hover:bg-[#FAF6EE] text-dark-green"
                                  }`}
                                >
                                  <span className="flex items-center gap-2.5 truncate">
                                    <CountryFlag code={country.code} name={country.name} className="w-5 h-3.5" />
                                    <span className="truncate">{country.name}</span>
                                  </span>
                                  <span className="font-mono text-dark-yellow font-semibold ml-2 shrink-0">
                                    {country.dialCode}
                                  </span>
                                </button>
                              ))}
                              {filteredCountries.length === 0 && (
                                <div className="p-4 text-center text-xs text-dark-green/60">No country found</div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
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
                </motion.form>
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
                <div className="bg-white p-3.5 rounded-2xl shadow-xl mb-4 max-w-[210px] w-full flex items-center justify-center">
                  <Image
                    src={qrCodeImg}
                    alt="Chishty Foundation UPI QR Code"
                    width={200}
                    height={200}
                    className="w-full h-auto object-contain rounded-xl"
                    priority
                  />
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
