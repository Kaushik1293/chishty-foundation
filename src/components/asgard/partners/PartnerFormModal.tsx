import React from "react";
import { Loader2 } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import ImageUploader from "@/src/components/asgard/ImageUploader";
import { PartnerRecord } from "@/app/(asgard)/asgard/partners/actions";

interface PartnerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  formData: Partial<PartnerRecord>;
  setFormData: (data: Partial<PartnerRecord>) => void;
  isSubmitting: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function PartnerFormModal({
  isOpen,
  onClose,
  isEditing,
  formData,
  setFormData,
  isSubmitting,
  handleFormSubmit,
}: PartnerFormModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Partner" : "Create New Partner"}
      subtitle="Fill in the partner organization information for Chishty Foundation"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4 font-satoshi">
        {/* Partner Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-dark-green">
            Partner Name *
          </label>
          <input
            type="text"
            required
            value={formData.name || ""}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            placeholder="e.g. Crescent Capital Enterprises"
            className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Logo URL (Drag & Drop) */}
        <ImageUploader
          label="Logo Image"
          value={formData.logo_url || ""}
          onChange={(url) => setFormData({ ...formData, logo_url: url })}
          placeholder="Upload partner logo..."
        />

        {/* Website URL & Display Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Website URL
            </label>
            <input
              type="url"
              value={formData.website_url || ""}
              onChange={(e) =>
                setFormData({ ...formData, website_url: e.target.value })
              }
              placeholder="https://example.com"
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
            <span>Active Partner</span>
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
              <span>{isEditing ? "Update Partner" : "Create Partner"}</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
