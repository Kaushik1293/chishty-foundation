import React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { PartnerRecord } from "@/app/(asgard)/asgard/partners/actions";

interface PartnerDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePartner: PartnerRecord | null;
  isSubmitting: boolean;
  handleDeleteConfirm: () => void;
}

export default function PartnerDeleteModal({
  isOpen,
  onClose,
  activePartner,
  isSubmitting,
  handleDeleteConfirm,
}: PartnerDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Delete Partner"
      subtitle="This will permanently delete the partner record."
    >
      <div className="space-y-4 font-satoshi">
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Are you sure you want to delete this partner?</p>
            <p className="mt-1">
              You are about to remove <strong>"{activePartner?.name}"</strong> (ID: {activePartner?.id}) from the system.
            </p>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-end gap-3 border-t border-stroke">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-stroke text-xs font-semibold text-dark-green"
          >
            Cancel
          </button>
          <button
            onClick={handleDeleteConfirm}
            disabled={isSubmitting}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-white" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Partner</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
