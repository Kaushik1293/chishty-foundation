import React from "react";
import { ExternalLink } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { PartnerRecord } from "@/app/(asgard)/asgard/partners/actions";

interface PartnerDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activePartner: PartnerRecord | null;
}

export default function PartnerDetailModal({
  isOpen,
  onClose,
  activePartner,
}: PartnerDetailModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activePartner?.name || "Partner Spotlight"}
      subtitle="Detailed partner record overview"
    >
      {activePartner && (
        <div className="space-y-5 font-satoshi">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-beige border border-stroke">
            {activePartner.logo_url ? (
              <img
                src={activePartner.logo_url}
                alt={activePartner.name || "Partner"}
                className="w-16 h-16 object-contain bg-white rounded-xl p-2 border border-stroke shadow-sm"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-dark-green text-white flex items-center justify-center font-bold text-lg">
                {activePartner.name?.slice(0, 2).toUpperCase() || "PT"}
              </div>
            )}

            <div>
              <h3 className="text-base font-bold text-dark-green">
                {activePartner.name}
              </h3>
              <p className="text-xs text-dark-green/60">
                ID: {activePartner.id}
              </p>
              <span
                className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                  activePartner.is_active
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : "bg-slate-100 text-slate-800 border-slate-300"
                }`}
              >
                {activePartner.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[11px] text-dark-green/60">Website URL</p>
              {activePartner.website_url ? (
                <a
                  href={activePartner.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-dark-yellow hover:underline flex items-center gap-1 mt-0.5"
                >
                  <span>{activePartner.website_url}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <p className="font-semibold text-dark-green/40 mt-0.5">Not provided</p>
              )}
            </div>

            <div>
              <p className="text-[11px] text-dark-green/60">Display Order</p>
              <p className="font-mono font-bold text-dark-green mt-0.5">
                {activePartner.display_order ?? 0}
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
