"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
  toggleMediaActiveStatus,
  MediaRecord,
} from "@/app/(asgard)/asgard/media/actions";
import MediaHeader from "@/src/components/asgard/media/MediaHeader";
import MediaTable from "@/src/components/asgard/media/MediaTable";
import MediaFormModal from "@/src/components/asgard/media/MediaFormModal";
import MediaDetailModal from "@/src/components/asgard/media/MediaDetailModal";
import MediaDeleteModal from "@/src/components/asgard/media/MediaDeleteModal";

export default function MediaCrudPage() {
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Active item for Edit / View / Delete
  const [activeMedia, setActiveMedia] = useState<MediaRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Exact Supabase Table Fields Form State
  const [formData, setFormData] = useState<Partial<MediaRecord>>({
    image_url: "",
    title: "",
    alt_text: "",
    caption: "",
    display_order: 0,
    is_active: true,
  });

  // Fetch Media from Supabase
  const loadMedia = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await getMedia();
      setMedia(data);
    } catch (err: any) {
      console.error("Failed to load media from Supabase:", err);
      setErrorMsg(err?.message || "Failed to load media from Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  // Filtered Media
  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const captionMatch = item.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const altMatch = item.alt_text?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const matchesSearch = searchTerm === "" || titleMatch || captionMatch || altMatch;

      const matchesStatus =
        selectedStatusFilter === "All"
          ? true
          : selectedStatusFilter === "Active"
          ? item.is_active === true
          : item.is_active === false;

      return matchesSearch && matchesStatus;
    });
  }, [media, searchTerm, selectedStatusFilter]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setActiveMedia(null);

    // Calculate next display order (highest existing + 1)
    const highestOrder = media.length > 0
      ? Math.max(...media.map((m) => m.display_order || 0))
      : 0;

    setFormData({
      image_url: "",
      title: "",
      alt_text: "",
      caption: "",
      display_order: highestOrder > 0 ? highestOrder + 1 : 1,
      is_active: true,
    });
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (item: MediaRecord) => {
    setIsEditing(true);
    setActiveMedia(item);
    setFormData({
      image_url: item.image_url || "",
      title: item.title || "",
      alt_text: item.alt_text || "",
      caption: item.caption || "",
      display_order: item.display_order ?? 0,
      is_active: item.is_active ?? true,
    });
    setIsFormModalOpen(true);
  };

  // Open Detail Modal
  const handleOpenDetail = (item: MediaRecord) => {
    setActiveMedia(item);
    setIsDetailModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (item: MediaRecord) => {
    setActiveMedia(item);
    setIsDeleteModalOpen(true);
  };

  // Toggle Active Status directly in table
  const handleToggleActive = async (item: MediaRecord) => {
    if (!item.id) return;
    const newStatus = !item.is_active;

    // Optimistic UI Update
    setMedia((prev) =>
      prev.map((m) => (m.id === item.id ? { ...m, is_active: newStatus } : m))
    );

    const res = await toggleMediaActiveStatus(item.id, item.is_active);
    if (!res.success) {
      // Revert on error
      setMedia((prev) =>
        prev.map((m) => (m.id === item.id ? { ...m, is_active: item.is_active } : m))
      );
      alert(`Error toggling active status: ${res.error}`);
    }
  };

  // Submit Form (Create / Edit in Supabase)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url?.trim()) {
      alert("Please upload or provide an image for the media asset.");
      return;
    }

    setIsSubmitting(true);

    if (isEditing && activeMedia?.id) {
      const res = await updateMedia(activeMedia.id, {
        image_url: formData.image_url.trim(),
        title: formData.title?.trim() || null,
        alt_text: formData.alt_text?.trim() || null,
        caption: formData.caption?.trim() || null,
        display_order: Number(formData.display_order) || 0,
        is_active: formData.is_active ?? true,
      });

      setIsSubmitting(false);

      if (res.success && res.data) {
        setIsFormModalOpen(false);
        loadMedia();
      } else {
        alert(`Error updating media: ${res.error}`);
      }
    } else {
      const res = await createMedia({
        image_url: formData.image_url.trim(),
        title: formData.title?.trim() || null,
        alt_text: formData.alt_text?.trim() || null,
        caption: formData.caption?.trim() || null,
        display_order: Number(formData.display_order) || 0,
        is_active: formData.is_active ?? true,
      });

      setIsSubmitting(false);

      if (res.success && res.data) {
        setIsFormModalOpen(false);
        loadMedia();
      } else {
        alert(`Error creating media: ${res.error}`);
      }
    }
  };

  // Delete Confirm in Supabase
  const handleDeleteConfirm = async () => {
    if (!activeMedia?.id) return;

    setIsSubmitting(true);
    const res = await deleteMedia(activeMedia.id);
    setIsSubmitting(false);

    if (res.success) {
      setIsDeleteModalOpen(false);
      setActiveMedia(null);
      loadMedia();
    } else {
      alert(`Error deleting media: ${res.error}`);
    }
  };

  return (
    <div className="space-y-8 font-satoshi">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {errorMsg}
        </div>
      )}

      <MediaHeader
        mediaCount={media.length}
        activeCount={media.filter((m) => m.is_active).length}
        inactiveCount={media.filter((m) => !m.is_active).length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
        isLoading={isLoading}
        loadMedia={loadMedia}
        handleOpenCreate={handleOpenCreate}
      />

      <MediaTable
        media={media}
        filteredMedia={filteredMedia}
        isLoading={isLoading}
        handleToggleActive={handleToggleActive}
        handleOpenDetail={handleOpenDetail}
        handleOpenEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
      />

      <MediaFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        handleFormSubmit={handleFormSubmit}
      />

      <MediaDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        activeMedia={activeMedia}
      />

      <MediaDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        activeMedia={activeMedia}
        isDeleting={isSubmitting}
        handleDelete={handleDeleteConfirm}
      />
    </div>
  );
}
