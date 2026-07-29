"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Users,
  Globe,
  ExternalLink,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  ArrowUpDown,
} from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import {
  getPartners,
  createPartner,
  updatePartner,
  deletePartner,
  togglePartnerActiveStatus,
  PartnerRecord,
} from "@/app/(asgard)/asgard/partners/actions";

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
    setFormData({
      name: "",
      logo_url: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80",
      website_url: "",
      display_order: (partners.length + 1) * 10,
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
      {/* Header Summary & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-satoshi text-dark-green">
            Partners Manager
          </h2>
          <p className="text-sm text-dark-green/75 font-normal mt-0.5">
            Create, view, update, and manage foundation partner organizations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadPartners}
            className="p-2.5 rounded-xl bg-white border border-stroke text-dark-green hover:bg-dark-green/5 transition-colors cursor-pointer"
            title="Refresh partners"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-dark-yellow" : ""}`} />
          </button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenCreate}
            className="px-5 py-3 rounded-xl bg-linear-to-r from-dark-yellow to-rust-orange text-white font-semibold text-xs shadow-lg shadow-dark-yellow/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Partner</span>
          </motion.button>
        </div>
      </div>

      {/* Metrics Header Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-dark-green/60 uppercase">
            Total Partners
          </p>
          <p className="text-2xl font-bold font-satoshi text-dark-green mt-0.5">
            {partners.length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-emerald-700 uppercase">
            Active Partners
          </p>
          <p className="text-2xl font-bold font-satoshi text-emerald-700 mt-0.5">
            {partners.filter((p) => p.is_active).length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-slate-600 uppercase">
            Inactive Partners
          </p>
          <p className="text-2xl font-bold font-satoshi text-slate-600 mt-0.5">
            {partners.filter((p) => !p.is_active).length}
          </p>
        </div>
      </div>

      {/* Controls Bar: Search & Status Filter */}
      <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-dark-green/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by partner name, website..."
            className="w-full pl-10 pr-4 py-2 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder-dark-green/40 focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-dark-yellow" />
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
              className="py-2 px-3 bg-beige border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Inactive">Inactive Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Partners Table */}
      <div className="bg-white border border-stroke rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige border-b border-stroke text-[11px] font-semibold text-dark-green/70 uppercase tracking-wider">
                <th className="py-3.5 px-4">Partner Logo & Name</th>
                <th className="py-3.5 px-4">Website URL</th>
                <th className="py-3.5 px-4">Display Order</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stroke/60 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-dark-green/50">
                    <Loader2 className="w-7 h-7 mx-auto mb-2 animate-spin text-dark-yellow" />
                    <p className="font-semibold text-xs">Loading partners from Supabase...</p>
                  </td>
                </tr>
              ) : filteredPartners.length > 0 ? (
                filteredPartners.map((ptr) => (
                  <motion.tr
                    key={ptr.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-beige/60 transition-colors group"
                  >
                    {/* Logo & Name */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {ptr.logo_url ? (
                          <img
                            src={ptr.logo_url}
                            alt={ptr.name || "Partner"}
                            className="w-10 h-10 rounded-xl object-contain border border-stroke p-1 bg-white shrink-0"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-dark-green/10 text-dark-green flex items-center justify-center shrink-0 border border-stroke font-bold">
                            {ptr.name ? ptr.name.slice(0, 2).toUpperCase() : "PT"}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-dark-green group-hover:text-dark-yellow transition-colors">
                            {ptr.name || "Unnamed Partner"}
                          </p>
                          <p className="text-[10px] text-dark-green/50">ID: {ptr.id}</p>
                        </div>
                      </div>
                    </td>

                    {/* Website URL */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {ptr.website_url ? (
                        <a
                          href={ptr.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-dark-yellow hover:underline text-xs font-medium"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span className="max-w-[200px] truncate">{ptr.website_url}</span>
                          <ExternalLink className="w-3 h-3 text-dark-green/40" />
                        </a>
                      ) : (
                        <span className="text-dark-green/40 text-[11px]">—</span>
                      )}
                    </td>

                    {/* Display Order */}
                    <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-dark-green">
                      <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-dark-green/5 border border-stroke">
                        <ArrowUpDown className="w-3 h-3 text-dark-yellow" />
                        <span>{ptr.display_order ?? 0}</span>
                      </div>
                    </td>

                    {/* Active Status Toggle */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(ptr)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                          ptr.is_active
                            ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                            : "bg-slate-500/15 text-slate-700 border-slate-500/30"
                        }`}
                        title="Click to toggle Active status"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{ptr.is_active ? "Active" : "Inactive"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(ptr)}
                          className="p-1.5 rounded-lg text-dark-green/70 hover:text-dark-green hover:bg-dark-green/10 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(ptr)}
                          className="p-1.5 rounded-lg text-dark-yellow hover:bg-dark-yellow/10 transition-colors"
                          title="Edit Partner"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(ptr)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Partner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-dark-green/50">
                    <Users className="w-8 h-8 mx-auto mb-2 text-dark-green/30" />
                    <p className="font-semibold">No partners found</p>
                    <p className="text-xs">
                      Click <strong>"Create New Partner"</strong> to add your first partner record!
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Pagination Bar */}
        <div className="p-4 bg-beige border-t border-stroke flex items-center justify-between text-xs text-dark-green/70">
          <span>
            Showing <strong>{filteredPartners.length}</strong> of{" "}
            <strong>{partners.length}</strong> partners
          </span>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="p-1.5 rounded-lg border border-stroke bg-white opacity-50 cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-semibold">Page 1 of 1</span>
            <button
              disabled
              className="p-1.5 rounded-lg border border-stroke bg-white opacity-50 cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* CREATE / EDIT PARTNER FORM MODAL - EXACT SUPABASE FIELDS */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
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

          {/* Logo URL */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Logo Image URL
            </label>
            <input
              type="url"
              value={formData.logo_url || ""}
              onChange={(e) =>
                setFormData({ ...formData, logo_url: e.target.value })
              }
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
            />
            {formData.logo_url && (
              <div className="mt-2 p-2 rounded-xl border border-stroke flex items-center gap-3 bg-beige/50">
                <img
                  src={formData.logo_url}
                  alt="Logo Preview"
                  className="w-12 h-12 object-contain bg-white rounded-lg p-1 border border-stroke"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span className="text-[11px] text-dark-green/70">Logo Image Live Preview</span>
              </div>
            )}
          </div>

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
              onClick={() => setIsFormModalOpen(false)}
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

      {/* VIEW PARTNER DETAILS MODAL */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={activePartner?.name || "Partner Spotlight"}
        subtitle="Detailed partner record overview"
      >
        {activePartner && (
          <div className="space-y-5 font-satoshi">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-beige border border-stroke">
              {activePartner.logo_url ? (
                <img
                  src={activePartner.logo_url}
                  alt={activePartner.name || "Partner"}
                  className="w-16 h-16 object-contain bg-white rounded-xl p-2 border border-stroke shadow-sm"
                />
              ) : (
                <div className="w-16 h-16 rounded-xl bg-dark-green text-white flex items-center justify-center font-bold text-lg">
                  {activePartner.name?.slice(0, 2).toUpperCase() || "PT"}
                </div>
              )}

              <div>
                <h3 className="text-base font-bold text-dark-green">
                  {activePartner.name}
                </h3>
                <p className="text-xs text-dark-green/60">
                  ID: {activePartner.id}
                </p>
                <span
                  className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                    activePartner.is_active
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-slate-100 text-slate-800 border-slate-300"
                  }`}
                >
                  {activePartner.is_active ? "Active" : "Inactive"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-[11px] text-dark-green/60">Website URL</p>
                {activePartner.website_url ? (
                  <a
                    href={activePartner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-dark-yellow hover:underline flex items-center gap-1 mt-0.5"
                  >
                    <span>{activePartner.website_url}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <p className="font-semibold text-dark-green/40 mt-0.5">Not provided</p>
                )}
              </div>

              <div>
                <p className="text-[11px] text-dark-green/60">Display Order</p>
                <p className="font-mono font-bold text-dark-green mt-0.5">
                  {activePartner.display_order ?? 0}
                </p>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-dark-green text-white text-xs font-semibold"
              >
                Close Preview
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirm Delete Partner"
        subtitle="This will permanently delete the partner record."
      >
        <div className="space-y-4 font-satoshi">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Are you sure you want to delete this partner?</p>
              <p className="mt-1">
                You are about to remove <strong>"{activePartner?.name}"</strong> (ID: {activePartner?.id}) from the system.
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-stroke">
            <button
              onClick={() => setIsDeleteModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-stroke text-xs font-semibold text-dark-green"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>Deleting...</span>
                </>
              ) : (
                <span>Delete Partner</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
