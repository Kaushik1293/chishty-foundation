"use client";

import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle2, Clock, AlertCircle, RotateCcw } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { DonationRecord } from "@/app/(asgard)/asgard/donations/actions";

interface DonationStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: DonationRecord | null;
  isSubmitting: boolean;
  handleStatusUpdate: (id: string, status: "success" | "completed" | "pending" | "failed" | "cancelled" | "refunded" | string, admin_notes?: string) => Promise<void>;
}

export default function DonationStatusModal({
  isOpen,
  onClose,
  donation,
  isSubmitting,
  handleStatusUpdate,
}: DonationStatusModalProps) {
  const [status, setStatus] = useState<"success" | "completed" | "pending" | "failed" | "cancelled" | "refunded" | string>("success");
  const [adminNotes, setAdminNotes] = useState<string>("");

  useEffect(() => {
    if (donation) {
      setStatus(donation.payment_status || "success");
      setAdminNotes(donation.admin_notes || "");
    }
  }, [donation]);

  if (!donation) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donation.id) return;
    handleStatusUpdate(donation.id, status, adminNotes);
  };

  const statusOptions: { value: "success" | "pending" | "failed" | "cancelled" | "refunded"; label: string; desc: string; icon: any; color: string }[] = [
    {
      value: "success",
      label: "Success / Verified",
      desc: "Payment has been received and confirmed successfully",
      icon: CheckCircle2,
      color: "text-emerald-700 bg-emerald-50 border-emerald-300",
    },
    {
      value: "pending",
      label: "Pending",
      desc: "Payment is pending verification, settlement, or manual check",
      icon: Clock,
      color: "text-amber-700 bg-amber-50 border-amber-300",
    },
    {
      value: "cancelled",
      label: "Cancelled",
      desc: "User closed checkout or donation attempt was cancelled",
      icon: RotateCcw,
      color: "text-stone-700 bg-stone-50 border-stone-300",
    },
    {
      value: "failed",
      label: "Failed",
      desc: "Transaction was declined or failed at gateway",
      icon: AlertCircle,
      color: "text-red-700 bg-red-50 border-red-300",
    },
    {
      value: "refunded",
      label: "Refunded",
      desc: "Contribution was reversed or returned to the donor",
      icon: RotateCcw,
      color: "text-slate-700 bg-slate-50 border-slate-300",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Donation Status"
      subtitle={`Donor: ${donation.donor_name || "Anonymous"} • Amount: ₹${Number(donation.amount || 0).toLocaleString("en-IN")}`}
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4 font-satoshi text-dark-green">
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70">
            Select Status
          </label>
          <div className="space-y-2">
            {statusOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = status === opt.value;
              return (
                <div
                  key={opt.value}
                  onClick={() => setStatus(opt.value)}
                  className={`p-3 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                    isSelected
                      ? `${opt.color} ring-2 ring-dark-yellow shadow-xs`
                      : "bg-white border-stroke hover:bg-beige/60"
                  }`}
                >
                  <Icon className="w-4 h-4 mt-0.5 shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-xs">{opt.label}</p>
                    <p className="text-[11px] text-dark-green/60 mt-0.5">{opt.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-dark-green/70 mb-1">
            Notes / Update Reason (Optional)
          </label>
          <textarea
            rows={2}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Add internal remarks about status change..."
            className="w-full px-3.5 py-2.5 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 focus:outline-none focus:border-dark-yellow resize-none"
          />
        </div>

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
                <span>Updating...</span>
              </>
            ) : (
              <span>Save Status</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
