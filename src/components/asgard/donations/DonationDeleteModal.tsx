"use client";

import React from "react";
import { AlertTriangle, Loader2, Trash2 } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { DonationRecord } from "@/app/(asgard)/asgard/donations/actions";

interface DonationDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: DonationRecord | null;
  isDeleting: boolean;
  handleDelete: () => void;
}

export default function DonationDeleteModal({
  isOpen,
  onClose,
  donation,
  isDeleting,
  handleDelete,
}: DonationDeleteModalProps) {
  if (!donation) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Donation?"
      subtitle="Are you sure you want to delete this donation?"
      maxWidth="max-w-md"
    >
      <div className="space-y-4 font-satoshi text-dark-green">
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="text-xs text-red-700">
            <p className="font-bold">Permanent Deletion</p>
            <p className="mt-1">
              Are you sure you want to delete this donation record? This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="p-3 bg-beige/60 rounded-xl border border-stroke text-xs space-y-1">
          <p>
            <strong className="text-dark-green">Donor:</strong>{" "}
            {donation.donor_name || (donation.is_anonymous ? "Anonymous Donor" : "—")}
          </p>
          <p>
            <strong className="text-dark-green">Amount:</strong> ₹{Number(donation.amount || 0).toLocaleString("en-IN")}
          </p>
          <p>
            <strong className="text-dark-green">Donation Type:</strong> {donation.donation_type}
          </p>
          {donation.transaction_id && (
            <p>
              <strong className="text-dark-green">Txn ID:</strong>{" "}
              <span className="font-mono text-[11px]">{donation.transaction_id}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-stroke">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-dark-green/10 hover:bg-dark-green/15 text-dark-green font-semibold text-xs transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete</span>
              </>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
