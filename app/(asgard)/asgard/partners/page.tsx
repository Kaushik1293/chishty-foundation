"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
  togglePartnerActiveStatus,
  PartnerRecord,
} from "@/app/(asgard)/asgard/partners/actions";
import PartnersHeader from "@/src/components/asgard/partners/PartnersHeader";
import PartnersTable from "@/src/components/asgard/partners/PartnersTable";
import PartnerFormModal from "@/src/components/asgard/partners/PartnerFormModal";
import PartnerDetailModal from "@/src/components/asgard/partners/PartnerDetailModal";
import PartnerDeleteModal from "@/src/components/asgard/partners/PartnerDeleteModal";

export default function PartnersCrudPage() {
  const [partners, setPartners] = useState<PartnerRecord[]>([]);
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
  const [activePartner, setActivePartner] = useState<PartnerRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Exact Supabase Table Fields Form State
  const [formData, setFormData] = useState<Partial<PartnerRecord>>({
    name: "",
    logo_url: "",
    website_url: "",
    display_order: 0,
    is_active: true,
  });

  // Fetch Partners from Supabase
  const loadPartners = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await getPartners();
      setPartners(data);
    } catch (err: any) {
      console.error("Failed to load partners from Supabase:", err);
      setErrorMsg(err?.message || "Failed to load partners from Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPartners();
  }, []);

  // Filtered Partners
  const filteredPartners = useMemo(() => {
    return partners.filter((ptr) => {
      const nameMatch = ptr.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const websiteMatch = ptr.website_url?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const matchesSearch = searchTerm === "" || nameMatch || websiteMatch;

      const matchesStatus =
        selectedStatusFilter === "All"
          ? true
          : selectedStatusFilter === "Active"
          ? ptr.is_active === true
          : ptr.is_active === false;

      return matchesSearch && matchesStatus;
    });
  }, [partners, searchTerm, selectedStatusFilter]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setActivePartner(null);
    
    // Calculate next display order (highest existing + 1)
    const highestOrder = partners.length > 0 
      ? Math.max(...partners.map(p => p.display_order || 0)) 
      : 0;

    setFormData({
      name: "",
      logo_url: "",
      website_url: "",
      display_order: highestOrder > 0 ? highestOrder + 1 : 1,
      is_active: true,
    });
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (ptr: PartnerRecord) => {
    setIsEditing(true);
    setActivePartner(ptr);
    setFormData({
      name: ptr.name || "",
      logo_url: ptr.logo_url || "",
      website_url: ptr.website_url || "",
      display_order: ptr.display_order ?? 0,
      is_active: ptr.is_active ?? true,
    });
    setIsFormModalOpen(true);
  };

  // Open Detail Modal
  const handleOpenDetail = (ptr: PartnerRecord) => {
    setActivePartner(ptr);
    setIsDetailModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (ptr: PartnerRecord) => {
    setActivePartner(ptr);
    setIsDeleteModalOpen(true);
  };

  // Toggle Active Status directly in table
  const handleToggleActive = async (ptr: PartnerRecord) => {
    if (!ptr.id) return;
    const newStatus = !ptr.is_active;

    // Optimistic UI Update
    setPartners((prev) =>
      prev.map((p) => (p.id === ptr.id ? { ...p, is_active: newStatus } : p))
    );

    const res = await togglePartnerActiveStatus(ptr.id, ptr.is_active);
    if (!res.success) {
      // Revert on error
      setPartners((prev) =>
        prev.map((p) => (p.id === ptr.id ? { ...p, is_active: ptr.is_active } : p))
      );
      alert(`Error toggling active status: ${res.error}`);
    }
  };

  // Submit Form (Create / Edit in Supabase)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) {
      alert("Please enter Partner Name.");
      return;
    }

    setIsSubmitting(true);

    if (isEditing && activePartner?.id) {
      const res = await updatePartner(activePartner.id, {
        name: formData.name,
        logo_url: formData.logo_url || null,
        website_url: formData.website_url || null,
        display_order: Number(formData.display_order) || 0,
        is_active: formData.is_active ?? true,
      });

      setIsSubmitting(false);

      if (res.success && res.data) {
        setIsFormModalOpen(false);
        loadPartners();
      } else {
        alert(`Error updating partner: ${res.error}`);
      }
    } else {
      const res = await createPartner({
        name: formData.name,
        logo_url: formData.logo_url || null,
        website_url: formData.website_url || null,
        display_order: Number(formData.display_order) || 0,
        is_active: formData.is_active ?? true,
      });

      setIsSubmitting(false);

      if (res.success && res.data) {
        setIsFormModalOpen(false);
        loadPartners();
      } else {
        alert(`Error creating partner: ${res.error}`);
      }
    }
  };

  // Delete Confirm in Supabase
  const handleDeleteConfirm = async () => {
    if (!activePartner?.id) return;

    setIsSubmitting(true);
    const res = await deletePartner(activePartner.id);
    setIsSubmitting(false);

    if (res.success) {
      setIsDeleteModalOpen(false);
      setActivePartner(null);
      loadPartners();
    } else {
      alert(`Error deleting partner: ${res.error}`);
    }
  };

  return (
    <div className="space-y-8 font-satoshi">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {errorMsg}
        </div>
      )}

      <PartnersHeader
        partnersCount={partners.length}
        activeCount={partners.filter((p) => p.is_active).length}
        inactiveCount={partners.filter((p) => !p.is_active).length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
        isLoading={isLoading}
        loadPartners={loadPartners}
        handleOpenCreate={handleOpenCreate}
      />

      <PartnersTable
        partners={partners}
        filteredPartners={filteredPartners}
        isLoading={isLoading}
        handleToggleActive={handleToggleActive}
        handleOpenDetail={handleOpenDetail}
        handleOpenEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
      />

      <PartnerFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        handleFormSubmit={handleFormSubmit}
      />

      <PartnerDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        activePartner={activePartner}
      />

      <PartnerDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        activePartner={activePartner}
        isSubmitting={isSubmitting}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
