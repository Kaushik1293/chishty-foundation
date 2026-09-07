import React from "react";
import { Image as ImageIcon, Calendar } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { MediaRecord } from "@/app/(asgard)/asgard/media/actions";
import { formatDateDDMMYYYY } from "@/src/utils/formatDate";

interface MediaDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeMedia: MediaRecord | null;
}

export default function MediaDetailModal({
  isOpen,
  onClose,
  activeMedia,
}: MediaDetailModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activeMedia?.title || "Media Spotlight"}
      subtitle="Detailed media asset overview"
      maxWidth="max-w-2xl"
    >
      {activeMedia && (
        <div className="space-y-5 font-satoshi">
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-beige border border-stroke">
            {activeMedia.image_url ? (
              <img
                src={activeMedia.image_url}
                alt={activeMedia.alt_text || activeMedia.title || "Media"}
                className="w-full h-64 object-contain bg-white rounded-xl border border-stroke p-2 shadow-sm"
              />
            ) : (
              <div className="w-full h-48 rounded-xl bg-dark-green/5 text-dark-green/40 flex flex-col items-center justify-center font-bold text-lg border border-stroke">
                <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                <span className="text-sm">No Image Attached</span>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    activeMedia.is_active
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-slate-100 text-slate-800 border-slate-300"
                  }`}
                >
                  {activeMedia.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <h3 className="text-base font-bold text-dark-green">
                {activeMedia.title || <span className="italic opacity-50">Untitled Media Asset</span>}
              </h3>

              {activeMedia.caption && (
                <p className="text-xs text-dark-green/80 mt-1.5 leading-relaxed">
                  {activeMedia.caption}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[11px] text-dark-green/60">Alt Text</p>
              <p className="font-semibold text-dark-green mt-0.5">
                {activeMedia.alt_text || <span className="text-dark-green/40 italic">Not set</span>}
              </p>
            </div>

            <div>
              <p className="text-[11px] text-dark-green/60">Display Order</p>
              <p className="font-mono font-bold text-dark-green mt-0.5">
                {activeMedia.display_order ?? 0}
              </p>
            </div>

            {activeMedia.created_at && (
              <div>
                <p className="text-[11px] text-dark-green/60">Created Date</p>
                <p className="font-semibold text-dark-green mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-dark-yellow" />
                  <span>{formatDateDDMMYYYY(activeMedia.created_at)}</span>
                </p>
              </div>
            )}

            <div>
              <p className="text-[11px] text-dark-green/60">Asset UUID</p>
              <p className="font-mono text-[10px] text-dark-green/60 mt-0.5 truncate">
                {activeMedia.id}
              </p>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-dark-green text-white text-xs font-semibold hover:bg-dark-green/90 transition-colors"
            >
              Close Preview
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}
