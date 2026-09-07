import React from "react";
import { Loader2 } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import ImageUploader from "@/src/components/asgard/ImageUploader";
import { MediaRecord } from "@/app/(asgard)/asgard/media/actions";

interface MediaFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  formData: Partial<MediaRecord>;
  setFormData: (data: Partial<MediaRecord>) => void;
  isSubmitting: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function MediaFormModal({
  isOpen,
  onClose,
  isEditing,
  formData,
  setFormData,
  isSubmitting,
  handleFormSubmit,
}: MediaFormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Media Asset" : "Upload New Media"}
      subtitle="Fill in photo and media details for Chishty Foundation gallery"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4 font-satoshi">
        {/* Image Uploader */}
        <ImageUploader
          label="Media File / Photo *"
          value={formData.image_url || ""}
          onChange={(url) => setFormData({ ...formData, image_url: url })}
          placeholder="Drag and drop or browse photo to upload..."
          bucket="media"
        />

        {/* Title */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-dark-green">
            Title
          </label>
          <input
            type="text"
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g. World Sufi Forum Inauguration"
            className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Alt Text & Display Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Alt Text (for accessibility & SEO)
            </label>
            <input
              type="text"
              value={formData.alt_text || ""}
              onChange={(e) =>
                setFormData({ ...formData, alt_text: e.target.value })
              }
              placeholder="e.g. Delegates gathering at Ajmer Sharif"
              className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Display Order
            </label>
            <input
              type="number"
              value={formData.display_order ?? 0}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  display_order: parseInt(e.target.value) || 0,
                })
              }
              placeholder="10, 20, 30..."
              className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow font-mono"
            />
          </div>
        </div>

        {/* Caption */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-dark-green">
            Caption / Description
          </label>
          <textarea
            rows={2}
            value={formData.caption || ""}
            onChange={(e) =>
              setFormData({ ...formData, caption: e.target.value })
            }
            placeholder="A brief caption describing the moment or project..."
            className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow resize-none"
          />
        </div>

        {/* Active Status Checkbox */}
        <div className="p-3 rounded-xl bg-beige border border-stroke flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-dark-green">
            <input
              type="checkbox"
              checked={formData.is_active ?? true}
              onChange={(e) =>
                setFormData({ ...formData, is_active: e.target.checked })
              }
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <span>Active / Visible in Gallery</span>
          </label>
        </div>

        {/* Action Buttons */}
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
              <span>{isEditing ? "Update Media" : "Save Media"}</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
