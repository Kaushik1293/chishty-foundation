import React from "react";
import { Loader2 } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import ImageUploader from "@/src/components/asgard/ImageUploader";
import { Event as SupabaseEvent } from "@/app/(web)/action";

interface EventFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  formData: Partial<SupabaseEvent>;
  setFormData: (data: Partial<SupabaseEvent>) => void;
  isSubmitting: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function EventFormModal({
  isOpen,
  onClose,
  isEditing,
  formData,
  setFormData,
  isSubmitting,
  handleFormSubmit,
}: EventFormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Event" : "Create New Event"}
      subtitle="Fill in the event information for Chishty Foundation"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4 font-satoshi">
        {/* Title Field */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-dark-green">
            Event Title *
          </label>
          <input
            type="text"
            required
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g. Annual Education Drive 2026"
            className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Slug & Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              URL Slug
            </label>
            <input
              type="text"
              value={formData.slug || ""}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              placeholder="Auto-generated from title if blank"
              className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green font-mono focus:outline-none focus:border-dark-yellow"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Event Date
            </label>
            <input
              type="date"
              value={formData.event_date || ""}
              onChange={(e) =>
                setFormData({ ...formData, event_date: e.target.value })
              }
              className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
            />
          </div>
        </div>

        {/* Short Description */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-dark-green">
            Short Description
          </label>
          <input
            type="text"
            value={formData.short_description || ""}
            onChange={(e) =>
              setFormData({ ...formData, short_description: e.target.value })
            }
            placeholder="Brief tagline for cards & previews..."
            className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Full Description */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-dark-green">
            Full Description
          </label>
          <textarea
            rows={3}
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Detailed information about the event initiative..."
            className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Banner Image & Icon (Drag & Drop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageUploader
            label="Banner Image"
            value={formData.banner_image || ""}
            onChange={(url) => setFormData({ ...formData, banner_image: url })}
            placeholder="Upload banner image..."
          />

          <ImageUploader
            label="Event Icon"
            value={formData.icon || ""}
            onChange={(url) => setFormData({ ...formData, icon: url })}
            placeholder="Upload event icon..."
            previewBgColor="#b8893c"
          />
        </div>

        {/* Toggles: is_featured & is_active */}
        <div className="p-3 rounded-xl bg-beige border border-stroke flex items-center justify-between gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-dark-green">
            <input
              type="checkbox"
              checked={formData.is_featured || false}
              onChange={(e) =>
                setFormData({ ...formData, is_featured: e.target.checked })
              }
              className="w-4 h-4 rounded text-dark-yellow focus:ring-dark-yellow"
            />
            <span>Featured Event</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-dark-green">
            <input
              type="checkbox"
              checked={formData.is_active ?? true}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>Active / Published</span>
          </label>
        </div>

        {/* Buttons */}
        <div className="pt-4 flex items-center justify-end gap-3 border-t border-stroke">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-stroke text-xs font-semibold text-dark-green hover:bg-dark-green/5 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-5 py-2.5 rounded-xl bg-dark-green hover:bg-dark-green/90 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-dark-yellow" />
                <span>Saving...</span>
              </>
            ) : (
              <span>{isEditing ? "Update Event" : "Create Event"}</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
