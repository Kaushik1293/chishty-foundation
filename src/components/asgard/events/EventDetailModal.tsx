import React from "react";
import { Star } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import { Event as SupabaseEvent } from "@/app/(web)/action";

interface EventDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeEvent: SupabaseEvent | null;
}

export default function EventDetailModal({
  isOpen,
  onClose,
  activeEvent,
}: EventDetailModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={activeEvent?.title || "Event Spotlight"}
      subtitle="Detailed event record overview"
    >
      {activeEvent && (
        <div className="space-y-5 font-satoshi">
          {activeEvent.banner_image && (
            <div className="relative h-48 rounded-2xl overflow-hidden border border-stroke">
              <img
                src={activeEvent.banner_image}
                alt={activeEvent.title || "Event"}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border bg-white/90 ${activeEvent.is_active
                  ? "text-emerald-700 border-emerald-300"
                  : "text-slate-700 border-slate-300"
                  }`}
              >
                {activeEvent.is_active ? "Active" : "Draft"}
              </span>
            </div>
          )}

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {activeEvent.slug && (
                <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-dark-green/10 border border-stroke text-dark-green">
                  slug: {activeEvent.slug}
                </span>
              )}
              {activeEvent.is_featured && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-semibold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>Featured</span>
                </span>
              )}
            </div>

            {activeEvent.short_description && (
              <p className="text-xs font-semibold text-dark-yellow">
                {activeEvent.short_description}
              </p>
            )}

            <p className="text-xs text-dark-green/80 leading-relaxed">
              {activeEvent.description || "No detailed description provided."}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 border-t border-stroke text-xs">
              <div>
                <p className="text-[11px] text-dark-green/60">Event Date</p>
                <p className="font-bold text-dark-green mt-0.5">
                  {activeEvent.event_date || "Not specified"}
                </p>
              </div>

              <div>
                <p className="text-[11px] text-dark-green/60">Icon</p>
                <div className="mt-1">
                  {activeEvent.icon ? (
                    <img
                      src={activeEvent.icon}
                      alt="Event Icon"
                      className="w-10 h-10 object-contain rounded-lg p-1.5"
                      style={{ backgroundColor: '#b8893c' }}
                    />
                  ) : (
                    <span className="text-dark-green/40 font-semibold mt-0.5 inline-block">Not provided</span>
                  )}
                </div>
              </div>
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
