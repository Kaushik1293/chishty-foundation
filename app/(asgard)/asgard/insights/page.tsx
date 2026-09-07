"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  getInsights,
  createInsight,
  updateInsight,
  deleteInsight,
  toggleInsightActiveStatus,
  InsightRecord,
} from "@/app/(asgard)/asgard/insights/actions";
import InsightsHeader from "@/src/components/asgard/insights/InsightsHeader";
import InsightsTable from "@/src/components/asgard/insights/InsightsTable";
import InsightFormModal from "@/src/components/asgard/insights/InsightFormModal";
import InsightDetailModal from "@/src/components/asgard/insights/InsightDetailModal";
import InsightDeleteModal from "@/src/components/asgard/insights/InsightDeleteModal";

export default function InsightsCrudPage() {
  const [insights, setInsights] = useState<InsightRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Active item for Edit / View / Delete
  const [activeInsight, setActiveInsight] = useState<InsightRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Exact Supabase Table Fields Form State
  const [formData, setFormData] = useState<Partial<InsightRecord>>({
    title: "",
    description: "",
    image_url: "",
    document_url: "",
    category: "",
    display_order: 0,
    is_active: true,
  });

  // Fetch Insights from Supabase
  const loadInsights = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await getInsights();
      setInsights(data);
    } catch (err: any) {
      console.error("Failed to load insights from Supabase:", err);
      setErrorMsg(err?.message || "Failed to load insights from Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadInsights();
  }, []);

  // Distinct Categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    insights.forEach((i) => {
      if (i.category && i.category.trim()) {
        set.add(i.category.trim());
      }
    });
    return Array.from(set);
  }, [insights]);

  // Filtered Insights
  const filteredInsights = useMemo(() => {
    return insights.filter((insight) => {
      const titleMatch = insight.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const descMatch = insight.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const catMatch = insight.category?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const matchesSearch = searchTerm === "" || titleMatch || descMatch || catMatch;

      const matchesCategory =
        selectedCategoryFilter === "All" ||
        insight.category === selectedCategoryFilter;

      const matchesStatus =
        selectedStatusFilter === "All"
          ? true
          : selectedStatusFilter === "Active"
          ? insight.is_active === true
          : insight.is_active === false;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [insights, searchTerm, selectedStatusFilter, selectedCategoryFilter]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setActiveInsight(null);

    // Calculate next display order (highest existing + 1)
    const highestOrder = insights.length > 0
      ? Math.max(...insights.map((i) => i.display_order || 0))
      : 0;

    setFormData({
      title: "",
      description: "",
      image_url: "",
      document_url: "",
      category: "",
      display_order: highestOrder > 0 ? highestOrder + 1 : 1,
      is_active: true,
    });
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (insight: InsightRecord) => {
    setIsEditing(true);
    setActiveInsight(insight);
    setFormData({
      title: insight.title || "",
      description: insight.description || "",
      image_url: insight.image_url || "",
      document_url: insight.document_url || "",
      category: insight.category || "",
      display_order: insight.display_order ?? 0,
      is_active: insight.is_active ?? true,
    });
    setIsFormModalOpen(true);
  };

  // Open Detail Modal
  const handleOpenDetail = (insight: InsightRecord) => {
    setActiveInsight(insight);
    setIsDetailModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (insight: InsightRecord) => {
    setActiveInsight(insight);
    setIsDeleteModalOpen(true);
  };

  // Toggle Active Status directly in table
  const handleToggleActive = async (insight: InsightRecord) => {
    if (!insight.id) return;
    const newStatus = !insight.is_active;

    // Optimistic UI Update
    setInsights((prev) =>
      prev.map((i) => (i.id === insight.id ? { ...i, is_active: newStatus } : i))
    );

    const res = await toggleInsightActiveStatus(insight.id, insight.is_active);
    if (!res.success) {
      // Revert on error
      setInsights((prev) =>
        prev.map((i) => (i.id === insight.id ? { ...i, is_active: insight.is_active } : i))
      );
      alert(`Error toggling active status: ${res.error}`);
    }
  };

  // Submit Form (Create / Edit in Supabase)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      alert("Please enter Insight Title.");
      return;
    }

    setIsSubmitting(true);

    if (isEditing && activeInsight?.id) {
      const res = await updateInsight(activeInsight.id, {
        title: formData.title.trim(),
        description: formData.description?.trim() || null,
        image_url: formData.image_url || null,
        document_url: formData.document_url?.trim() || null,
        category: formData.category?.trim() || null,
        display_order: Number(formData.display_order) || 0,
        is_active: formData.is_active ?? true,
      });

      setIsSubmitting(false);

      if (res.success && res.data) {
        setIsFormModalOpen(false);
        loadInsights();
      } else {
        alert(`Error updating insight: ${res.error}`);
      }
    } else {
      const res = await createInsight({
        title: formData.title.trim(),
        description: formData.description?.trim() || null,
        image_url: formData.image_url || null,
        document_url: formData.document_url?.trim() || null,
        category: formData.category?.trim() || null,
        display_order: Number(formData.display_order) || 0,
        is_active: formData.is_active ?? true,
      });

      setIsSubmitting(false);

      if (res.success && res.data) {
        setIsFormModalOpen(false);
        loadInsights();
      } else {
        alert(`Error creating insight: ${res.error}`);
      }
    }
  };

  // Delete Confirm in Supabase
  const handleDeleteConfirm = async () => {
    if (!activeInsight?.id) return;

    setIsSubmitting(true);
    const res = await deleteInsight(activeInsight.id);
    setIsSubmitting(false);

    if (res.success) {
      setIsDeleteModalOpen(false);
      setActiveInsight(null);
      loadInsights();
    } else {
      alert(`Error deleting insight: ${res.error}`);
    }
  };

  return (
    <div className="space-y-8 font-satoshi">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {errorMsg}
        </div>
      )}

      <InsightsHeader
        insightsCount={insights.length}
        activeCount={insights.filter((i) => i.is_active).length}
        inactiveCount={insights.filter((i) => !i.is_active).length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
        selectedCategoryFilter={selectedCategoryFilter}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
        categories={categories}
        isLoading={isLoading}
        loadInsights={loadInsights}
        handleOpenCreate={handleOpenCreate}
      />

      <InsightsTable
        insights={insights}
        filteredInsights={filteredInsights}
        isLoading={isLoading}
        handleToggleActive={handleToggleActive}
        handleOpenDetail={handleOpenDetail}
        handleOpenEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
      />

      <InsightFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        handleFormSubmit={handleFormSubmit}
      />

      <InsightDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        activeInsight={activeInsight}
      />

      <InsightDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        activeInsight={activeInsight}
        isDeleting={isSubmitting}
        handleDelete={handleDeleteConfirm}
      />
    </div>
  );
}
