import React from "react";
import Modal from "@/src/components/asgard/Modal";
import { CauseRecord } from "@/app/(asgard)/asgard/causes/actions";
import { Image as ImageIcon } from "lucide-react";

interface CauseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCause: CauseRecord | null;
}

export default function CauseDetailModal({
  isOpen,
  onClose,
  activeCause,
}: CauseDetailModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={"Cause Spotlight"}
      subtitle="Detailed cause record overview"
    >
      {activeCause && (
        <div className="space-y-5 font-satoshi">
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-beige border border-stroke">
            {activeCause.image ? (
              <img
                src={activeCause.image}
                alt="Cause preview"
                className="w-full h-48 object-cover rounded-xl border border-stroke shadow-sm"
              />
            ) : (
              <div className="w-full h-48 rounded-xl bg-dark-green/5 text-dark-green/40 flex flex-col items-center justify-center font-bold text-lg border border-stroke">
                <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                <span className="text-sm">No Image</span>
              </div>
            )}

            <div>
              <p className="text-xs text-dark-green/60 mb-2">
                ID: {activeCause.id}
              </p>
              <h3 className="text-sm font-medium text-dark-green">
                {activeCause.description || <span className="italic opacity-50">No description provided</span>}
              </h3>
              <div className="mt-3">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    activeCause.is_active
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-slate-100 text-slate-800 border-slate-300"
                  }`}
                >
                  {activeCause.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[11px] text-dark-green/60">Display Order</p>
              <p className="font-mono font-bold text-dark-green mt-0.5">
                {activeCause.display_order ?? 0}
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-dark-green text-white text-xs font-semibold"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
