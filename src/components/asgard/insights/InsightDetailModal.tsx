import React from "react";
import { Image as ImageIcon, FileText, ExternalLink, BookOpen, Calendar, Clock } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { InsightRecord } from "@/app/(asgard)/asgard/insights/actions";
import { formatDateDDMMYYYY } from "@/src/utils/formatDate";

interface InsightDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeInsight: InsightRecord | null;
}

export default function InsightDetailModal({
  isOpen,
  onClose,
  activeInsight,
}: InsightDetailModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activeInsight?.title || "Insight Spotlight"}
      subtitle="Detailed insight record overview"
    >
      {activeInsight && (
        <div className="space-y-5 font-satoshi">
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-beige border border-stroke">
            {activeInsight.image_url ? (
              <img
                src={activeInsight.image_url}
                alt={activeInsight.title || "Insight preview"}
                className="w-full h-52 object-cover rounded-xl border border-stroke shadow-sm"
              />
            ) : (
              <div className="w-full h-40 rounded-xl bg-dark-green/5 text-dark-green/40 flex flex-col items-center justify-center font-bold text-lg border border-stroke">
                <ImageIcon className="w-10 h-10 mb-2 opacity-50" />
                <span className="text-sm">No Featured Image</span>
              </div>
            )}

            <div>
              <div className="flex items-center gap-2 mb-2">
                {activeInsight.category && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-dark-yellow/20 text-dark-green border border-dark-yellow/30">
                    <BookOpen className="w-3 h-3 text-dark-yellow" />
                    <span>{activeInsight.category}</span>
                  </span>
                )}
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    activeInsight.is_active
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-slate-100 text-slate-800 border-slate-300"
                  }`}
                >
                  {activeInsight.is_active ? "Active" : "Inactive"}
                </span>
              </div>

              <h3 className="text-base font-bold text-dark-green">
                {activeInsight.title || <span className="italic opacity-50">Untitled Insight</span>}
              </h3>

              <p className="text-xs text-dark-green/80 mt-2 leading-relaxed whitespace-pre-wrap">
                {activeInsight.description || <span className="italic opacity-50">No description provided</span>}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[11px] text-dark-green/60">Document / Attachment</p>
              {activeInsight.document_url ? (
                <a
                  href={activeInsight.document_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-dark-yellow hover:underline flex items-center gap-1 mt-0.5"
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate max-w-[200px]">{activeInsight.document_url}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              ) : (
                <p className="font-semibold text-dark-green/40 mt-0.5">Not provided</p>
              )}
            </div>

            <div>
              <p className="text-[11px] text-dark-green/60">Display Order</p>
              <p className="font-mono font-bold text-dark-green mt-0.5">
                {activeInsight.display_order ?? 0}
              </p>
            </div>

            {activeInsight.created_at && (
              <div>
                <p className="text-[11px] text-dark-green/60">Created Date</p>
                <p className="font-semibold text-dark-green mt-0.5 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-dark-yellow" />
                  <span>{formatDateDDMMYYYY(activeInsight.created_at)}</span>
                </p>
              </div>
            )}

            <div>
              <p className="text-[11px] text-dark-green/60">Insight UUID</p>
              <p className="font-mono text-[10px] text-dark-green/60 mt-0.5 truncate">
                {activeInsight.id}
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
