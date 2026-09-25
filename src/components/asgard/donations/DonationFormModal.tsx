"use client";

import React from "react";
import { Loader2, Plus, Save, Lock, ShieldAlert } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { DonationRecord } from "@/app/(asgard)/asgard/donations/actions";
import { DONATION_CATEGORIES } from "@/src/components/donation/DonationFormSection";

interface DonationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  formData: Partial<DonationRecord>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<DonationRecord>>>;
  isSubmitting: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function DonationFormModal({
  isOpen,
  onClose,
  isEditing,
  formData,
  setFormData,
  isSubmitting,
  handleFormSubmit,
}: DonationFormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Donation Details" : "Add Donation"}
      subtitle={
        isEditing
          ? "Update donor information and administrative remarks"
          : "Record a manual / administrative donation entry (defaults to pending)"
      }
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4 font-satoshi text-dark-green">
        {isEditing && (
          <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-center gap-2.5 text-xs text-amber-800">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Payment Integrity:</strong> Payment status, amount, and transaction IDs cannot be altered here as they are secured by the payment gateway flow.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Donor Full Name */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Donor Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.donor_name || ""}
              onChange={(e) => setFormData({ ...formData, donor_name: e.target.value })}
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
              value={formData.donor_email || ""}
              onChange={(e) => setFormData({ ...formData, donor_email: e.target.value })}
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
              value={formData.donor_phone || ""}
              onChange={(e) => setFormData({ ...formData, donor_phone: e.target.value })}
              placeholder="e.g. +91 98291 00000"
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow"
            />
          </div>

          {/* Amount (₹) - Only editable on CREATE */}
          {!isEditing ? (
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
                  onChange={(e) =>
                    setFormData({ ...formData, amount: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="5000"
                  className="w-full pl-8 pr-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs font-bold text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow"
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold text-dark-green/60 mb-1">
                Amount (Locked)
              </label>
              <div className="px-3.5 py-2.5 bg-stone-100 border border-stroke rounded-xl text-xs font-bold text-dark-green">
                ₹{Number(formData.amount || 0).toLocaleString("en-IN")} {formData.currency || "INR"}
              </div>
            </div>
          )}

          {/* Cause / Category */}
          <div>
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Donation Type / Cause *
            </label>
            <select
              value={formData.donation_type || "General"}
              onChange={(e) => setFormData({ ...formData, donation_type: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow cursor-pointer"
            >
              {DONATION_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Is Anonymous Checkbox */}
          <div className="sm:col-span-2 flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="is_anonymous_checkbox"
              checked={Boolean(formData.is_anonymous)}
              onChange={(e) => setFormData({ ...formData, is_anonymous: e.target.checked })}
              className="w-4 h-4 rounded text-dark-yellow accent-dark-yellow border-stroke focus:ring-0 cursor-pointer"
            />
            <label
              htmlFor="is_anonymous_checkbox"
              className="text-xs font-semibold text-dark-green cursor-pointer"
            >
              Mark as Anonymous Donation (Donor name hidden in public listings)
            </label>
          </div>

          {/* Message / Address */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Address / Message / City (Optional)
            </label>
            <input
              type="text"
              value={formData.message || ""}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="e.g. Ajmer, Rajasthan or donor wishes"
              className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow"
            />
          </div>

          {/* Admin Notes */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-dark-green mb-1">
              Admin Notes / Remarks (Internal)
            </label>
            <textarea
              rows={2}
              value={formData.admin_notes || ""}
              onChange={(e) => setFormData({ ...formData, admin_notes: e.target.value })}
              placeholder="Internal remarks regarding this donation..."
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
                <span>{isEditing ? "Saving Changes..." : "Creating Entry..."}</span>
              </>
            ) : isEditing ? (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add Donation</span>
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
