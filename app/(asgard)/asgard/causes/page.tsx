"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  getCauses,
  createCause,
  updateCause,
  deleteCause,
  toggleCauseActiveStatus,
  CauseRecord,
} from "@/app/(asgard)/asgard/causes/actions";
import CausesHeader from "@/src/components/asgard/causes/CausesHeader";
import CausesTable from "@/src/components/asgard/causes/CausesTable";
import CauseFormModal from "@/src/components/asgard/causes/CauseFormModal";
import CauseDetailModal from "@/src/components/asgard/causes/CauseDetailModal";
import CauseDeleteModal from "@/src/components/asgard/causes/CauseDeleteModal";

export default function CausesCrudPage() {
  const [causes, setCauses] = useState<CauseRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Active item for Edit / View / Delete
  const [activeCause, setActiveCause] = useState<CauseRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Exact Supabase Table Fields Form State
  const [formData, setFormData] = useState<Partial<CauseRecord>>({
    description: "",
    image: "",
    display_order: 0,
    is_active: true,
  });

  // Fetch Causes from Supabase
  const loadCauses = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await getCauses();
      setCauses(data);
    } catch (err: any) {
      console.error("Failed to load causes from Supabase:", err);
      setErrorMsg(err?.message || "Failed to load causes from Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCauses();
  }, []);

  // Filtered Causes
  const filteredCauses = useMemo(() => {
    return causes.filter((cause) => {
      const descMatch = cause.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const matchesSearch = searchTerm === "" || descMatch;

      const matchesStatus =
        selectedStatusFilter === "all"
          ? true
          : selectedStatusFilter === "active"
          ? cause.is_active === true
          : cause.is_active === false;

      return matchesSearch && matchesStatus;
    });
  }, [causes, searchTerm, selectedStatusFilter]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setActiveCause(null);
    
    // Calculate next display order (highest existing + 1)
    const highestOrder = causes.length > 0 
      ? Math.max(...causes.map(c => c.display_order || 0)) 
      : 0;

    setFormData({
      description: "",
      image: "",
      display_order: highestOrder > 0 ? highestOrder + 1 : 1,
      is_active: true,
    });
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (cause: CauseRecord) => {
    setIsEditing(true);
    setActiveCause(cause);
    setFormData({
      description: cause.description || "",
      image: cause.image || "",
      display_order: cause.display_order ?? 0,
      is_active: cause.is_active ?? true,
    });
    setIsFormModalOpen(true);
  };

  // Open Detail Modal
  const handleOpenDetail = (cause: CauseRecord) => {
    setActiveCause(cause);
    setIsDetailModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (cause: CauseRecord) => {
    setActiveCause(cause);
    setIsDeleteModalOpen(true);
  };

  // Toggle Active Status directly in table
  const handleToggleActive = async (cause: CauseRecord) => {
    if (!cause.id) return;
    const newStatus = !cause.is_active;

    // Optimistic UI Update
    setCauses((prev) =>
      prev.map((c) => (c.id === cause.id ? { ...c, is_active: newStatus } : c))
    );

    const res = await toggleCauseActiveStatus(cause.id, cause.is_active);
    if (!res.success) {
      // Revert on error
      setCauses((prev) =>
        prev.map((c) => (c.id === cause.id ? { ...c, is_active: cause.is_active } : c))
      );
      alert(`Error toggling active status: ${res.error}`);
    }
  };

  // Submit Form (Create / Edit in Supabase)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description) {
      alert("Please enter Cause Description.");
      return;
    }

    setIsSubmitting(true);

    if (isEditing && activeCause?.id) {
      const res = await updateCause(activeCause.id, {
        description: formData.description,
        image: formData.image || null,
        display_order: Number(formData.display_order) || 0,
        is_active: formData.is_active ?? true,
      });

      setIsSubmitting(false);

      if (res.success && res.data) {
        setIsFormModalOpen(false);
        loadCauses();
      } else {
        alert(`Error updating cause: ${res.error}`);
      }
    } else {
      const res = await createCause({
        description: formData.description,
        image: formData.image || null,
        display_order: Number(formData.display_order) || 0,
        is_active: formData.is_active ?? true,
      });

      setIsSubmitting(false);

      if (res.success && res.data) {
        setIsFormModalOpen(false);
        loadCauses();
      } else {
        alert(`Error creating cause: ${res.error}`);
      }
    }
  };

  // Delete Confirm in Supabase
  const handleDeleteConfirm = async () => {
    if (!activeCause?.id) return;

    setIsSubmitting(true);
    const res = await deleteCause(activeCause.id);
    setIsSubmitting(false);

    if (res.success) {
      setIsDeleteModalOpen(false);
      setActiveCause(null);
      loadCauses();
    } else {
      alert(`Error deleting cause: ${res.error}`);
    }
  };

  return (
    <div className="space-y-8 font-satoshi">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {errorMsg}
        </div>
      )}

      <CausesHeader
        causesCount={causes.length}
        activeCount={causes.filter((c) => c.is_active).length}
        inactiveCount={causes.filter((c) => !c.is_active).length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
        isLoading={isLoading}
        loadCauses={loadCauses}
        handleOpenCreate={handleOpenCreate}
      />

      <CausesTable
        causes={causes}
        filteredCauses={filteredCauses}
        isLoading={isLoading}
        handleToggleActive={handleToggleActive}
        handleOpenDetail={handleOpenDetail}
        handleOpenEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
      />

      <CauseFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        handleFormSubmit={handleFormSubmit}
      />

      <CauseDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        activeCause={activeCause}
      />

      <CauseDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        activeCause={activeCause}
        isDeleting={isSubmitting}
        handleDelete={handleDeleteConfirm}
      />
    </div>
  );
}
