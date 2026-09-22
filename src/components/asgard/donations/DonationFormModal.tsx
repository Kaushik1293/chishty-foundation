"use client";

import React from "react";
import { Loader2, Plus, IndianRupee } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { DonationRecord } from "@/app/(asgard)/asgard/donations/actions";
import { DONATION_CATEGORIES } from "@/src/components/donation/DonationFormSection";

interface DonationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: Partial<DonationRecord>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<DonationRecord>>>;
  isSubmitting: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function DonationFormModal({
  isOpen,
  onClose,
  formData,
  setFormData,
  isSubmitting,
  handleFormSubmit,
}: DonationFormModalProps) {
  const paymentMethods = [
    "Offline / Cash",
    "Bank Transfer / NEFT / RTGS",
    "Cheque / DD",
    "UPI",
    "Debit/Credit Card",
    "PayPal",
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Offline Donation"
      subtitle="Manually add cash, cheque, bank transfer, or direct contributions into Asgard"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4 font-satoshi text-dark-green">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Donor Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Donor Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.full_name || ""}
              onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
              placeholder="e.g. Syed Mohammad Chishty"
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email || ""}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="e.g. donor@example.com"
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Phone Number *
            </label>
            <input
              type="text"
              required
              value={formData.phone || ""}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="e.g. +91 98291 00000"
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow"
            />
          </div>

          {/* Amount (₹) */}
          <div>
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Amount (₹ INR) *
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark-yellow font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="1"
                step="any"
                required
                value={formData.amount || ""}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })}
                placeholder="5000"
                className="w-full pl-8 pr-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs font-bold text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow"
              />
            </div>
          </div>

          {/* Cause / Category */}
          <div>
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Cause / Category *
            </label>
            <select
              value={formData.category || "Education"}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow cursor-pointer"
            >
              {DONATION_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Payment Method *
            </label>
            <select
              value={formData.payment_method || "Offline / Cash"}
              onChange={(e) => setFormData({ ...formData, payment_method: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow cursor-pointer"
            >
              {paymentMethods.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Status *
            </label>
            <select
              value={formData.status || "completed"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "completed" | "pending" | "failed" | "refunded",
                })
              }
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow cursor-pointer"
            >
              <option value="completed">Completed / Verified</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* City */}
          <div>
            <label className="block text-xs font-semibold text-dark-green mb-1">
              City
            </label>
            <input
              type="text"
              value={formData.city || ""}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="e.g. Ajmer"
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow"
            />
          </div>

          {/* Country */}
          <div>
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Country
            </label>
            <input
              type="text"
              value={formData.country || "India"}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              placeholder="e.g. India"
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow"
            />
          </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Address / Location (Optional)
            </label>
            <input
              type="text"
              value={formData.address || ""}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Street or organization address"
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow"
            />
          </div>

          {/* Notes */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Admin Notes / Remarks
            </label>
            <textarea
              rows={2}
              value={formData.notes || ""}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Received via cheque #449210 or special campaign mention"
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-stroke">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-dark-green/10 hover:bg-dark-green/15 text-dark-green font-semibold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-linear-to-r from-dark-yellow to-rust-orange text-white font-bold text-xs shadow-md hover:brightness-110 transition-all cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Entry...</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Save Donation</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
