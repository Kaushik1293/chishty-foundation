import React, { useState } from "react";
import { Loader2, UploadCloud, FileText, X } from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import ImageUploader from "@/src/components/asgard/ImageUploader";
import { InsightRecord } from "@/app/(asgard)/asgard/insights/actions";
import { uploadFile } from "@/app/(asgard)/asgard/upload";

interface InsightFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  formData: Partial<InsightRecord>;
  setFormData: (data: Partial<InsightRecord>) => void;
  isSubmitting: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function InsightFormModal({
  isOpen,
  onClose,
  isEditing,
  formData,
  setFormData,
  isSubmitting,
  handleFormSubmit,
}: InsightFormModalProps) {
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setIsUploadingDoc(true);
      try {
        const data = new FormData();
        data.append("file", file);
        data.append("bucket", "insights");
        const res = await uploadFile(data, "insights");
        if (res.success && res.url) {
          setFormData({ ...formData, document_url: res.url });
        } else {
          alert(res.error || "Failed to upload document to Supabase storage");
        }
      } catch (err: any) {
        alert("Error uploading document: " + err.message);
      } finally {
        setIsUploadingDoc(false);
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Insight" : "Create New Insight"}
      subtitle="Fill in the insight publication information for Chishty Foundation"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleFormSubmit} className="space-y-4 font-satoshi">
        {/* Title Field */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-dark-green">
            Insight Title *
          </label>
          <input
            type="text"
            required
            value={formData.title || ""}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="e.g. Sufi Traditions and Interfaith Harmony"
            className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Category & Display Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Category
            </label>
            <input
              type="text"
              value={formData.category || ""}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              placeholder="e.g. Research, Article, Report, Publication"
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

        {/* Description */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-dark-green">
            Description / Summary
          </label>
          <textarea
            rows={3}
            value={formData.description || ""}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Summary or detailed insight excerpt..."
            className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow resize-none"
          />
        </div>

        {/* Image Upload */}
        <ImageUploader
          label="Featured Image"
          value={formData.image_url || ""}
          onChange={(url) => setFormData({ ...formData, image_url: url })}
          placeholder="Upload insight featured image..."
          bucket="insights"
        />

        {/* Document URL / Upload */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-dark-green">
            Document Attachment / Link (PDF, Word, or Web link)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.document_url || ""}
              onChange={(e) =>
                setFormData({ ...formData, document_url: e.target.value })
              }
              placeholder="https://... or upload a document"
              className="flex-1 px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
            />
            <label className="px-4 py-2.5 bg-beige hover:bg-dark-yellow/20 border border-stroke rounded-xl text-xs font-semibold text-dark-green flex items-center gap-1.5 cursor-pointer transition-colors shrink-0">
              {isUploadingDoc ? (
                <Loader2 className="w-4 h-4 animate-spin text-dark-yellow" />
              ) : (
                <UploadCloud className="w-4 h-4 text-dark-yellow" />
              )}
              <span>Upload Doc</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.epub,.txt"
                onChange={handleDocUpload}
                disabled={isUploadingDoc}
                className="hidden"
              />
            </label>
          </div>
          {formData.document_url && (
            <div className="p-2 rounded-xl bg-beige/50 border border-stroke flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-dark-yellow shrink-0" />
                <span className="truncate text-dark-green/80 font-mono text-[11px]">
                  {formData.document_url}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, document_url: "" })}
                className="p-1 rounded text-red-500 hover:bg-red-50"
                title="Remove attachment"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
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
            <span>Active / Published Insight</span>
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
              <span>{isEditing ? "Update Insight" : "Create Insight"}</span>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
