import React from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { CauseRecord } from "@/app/(asgard)/asgard/causes/actions";

interface CauseDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCause: CauseRecord | null;
  isDeleting: boolean;
  handleDelete: () => void;
}

export default function CauseDeleteModal({
  isOpen,
  onClose,
  activeCause,
  isDeleting,
  handleDelete,
}: CauseDeleteModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Cause"
      subtitle="This action cannot be undone"
    >
      <div className="space-y-4 font-satoshi">
        <div className="p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3 text-red-800">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-semibold mb-1">
              Are you sure you want to delete this cause?
            </p>
            <p className="opacity-90 leading-relaxed">
              This will permanently remove the cause from the database and it will no longer appear on the public website.
            </p>
          </div>
        </div>

        {activeCause && (
          <div className="p-3 bg-white border border-stroke rounded-xl flex items-center gap-3">
            {activeCause.image ? (
               <img
               src={activeCause.image}
               alt="Cause"
               className="w-12 h-10 object-cover rounded-md border border-stroke bg-gray-50"
             />
            ) : (
              <div className="w-12 h-10 bg-dark-green/5 flex flex-col items-center justify-center rounded-md border border-stroke">
                <span className="text-[8px] font-bold text-dark-green/40">NO IMG</span>
              </div>
            )}
           
            <div>
              <p className="text-sm font-semibold text-dark-green line-clamp-1">
                {activeCause.description || "No description"}
              </p>
              <p className="text-[10px] text-dark-green/50">ID: {activeCause.id}</p>
            </div>
          </div>
        )}

        <div className="pt-2 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-stroke text-xs font-semibold text-dark-green hover:bg-dark-green/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <span>Yes, Delete Cause</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
