"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Users,
  Building,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Sparkles,
  AlertTriangle,
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import Modal from "@/src/components/asgard/Modal";

interface PartnerItem {
  id: string;
  name: string;
  category: "Corporate" | "NGO & Humanitarian" | "Educational" | "Donor";
  website: string;
  email: string;
  phone: string;
  logoUrl: string;
  status: "Active" | "Inactive" | "Featured";
  contactPerson: string;
  summary: string;
}

const initialPartners: PartnerItem[] = [
  {
    id: "ptr-101",
    name: "Global Hope Relief Network",
    category: "NGO & Humanitarian",
    website: "https://globalhope.org",
    email: "contact@globalhope.org",
    phone: "+1 (555) 234-5678",
    logoUrl:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
    status: "Featured",
    contactPerson: "Dr. Sarah Jenkins",
    summary:
      "International humanitarian alliance collaborating on disaster emergency relief and food security campaigns.",
  },
  {
    id: "ptr-102",
    name: "Crescent Capital Enterprises",
    category: "Corporate",
    website: "https://crescentcap.com",
    email: "csr@crescentcap.com",
    phone: "+91 98200 11223",
    logoUrl:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
    status: "Active",
    contactPerson: "Tariq Mahmood",
    summary:
      "Corporate Social Responsibility (CSR) sponsor funding primary school construction and digital lab initiatives.",
  },
  {
    id: "ptr-103",
    name: "Delhi Educational Trust",
    category: "Educational",
    website: "https://delhiedutrust.org",
    email: "info@delhiedutrust.org",
    phone: "+91 11 2345 6789",
    logoUrl:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=200&q=80",
    status: "Active",
    contactPerson: "Prof. Rajesh Kumar",
    summary:
      "Academic partner providing teacher training, curriculum materials, and youth mentorship.",
  },
  {
    id: "ptr-104",
    name: "Apex Philanthropy Fund",
    category: "Donor",
    website: "https://apexphilanthropy.org",
    email: "grants@apexphilanthropy.org",
    phone: "+44 20 7946 0912",
    logoUrl:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=200&q=80",
    status: "Inactive",
    contactPerson: "Elena Rostova",
    summary:
      "Global philanthropic trust supporting healthcare accessibility and women vocational training programs.",
  },
];

export default function PartnersCrudPage() {
  const [partners, setPartners] = useState<PartnerItem[]>(initialPartners);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Active item
  const [activePartner, setActivePartner] = useState<PartnerItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<PartnerItem>>({
    name: "",
    category: "Corporate",
    website: "",
    email: "",
    phone: "",
    logoUrl: "",
    status: "Active",
    contactPerson: "",
    summary: "",
  });

  // Category Badge Colors
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Corporate":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "NGO & Humanitarian":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Educational":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "Donor":
        return "bg-amber-100 text-amber-800 border-amber-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Status Badge Colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Featured":
        return "bg-amber-500/15 text-amber-800 border-amber-500/30";
      case "Active":
        return "bg-emerald-500/15 text-emerald-700 border-emerald-500/30";
      case "Inactive":
        return "bg-slate-500/15 text-slate-700 border-slate-500/30";
      default:
        return "bg-gray-500/15 text-gray-700 border-gray-500/30";
    }
  };

  // Filtered Partners
  const filteredPartners = useMemo(() => {
    return partners.filter((ptr) => {
      const matchesSearch =
        ptr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ptr.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ptr.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ptr.summary.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || ptr.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "All" || ptr.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [partners, searchTerm, selectedCategory, selectedStatus]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setActivePartner(null);
    setFormData({
      name: "",
      category: "Corporate",
      website: "https://",
      email: "",
      phone: "",
      logoUrl:
        "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=200&q=80",
      status: "Active",
      contactPerson: "",
      summary: "",
    });
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (ptr: PartnerItem) => {
    setIsEditing(true);
    setActivePartner(ptr);
    setFormData({ ...ptr });
    setIsFormModalOpen(true);
  };

  // Open Detail Modal
  const handleOpenDetail = (ptr: PartnerItem) => {
    setActivePartner(ptr);
    setIsDetailModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (ptr: PartnerItem) => {
    setActivePartner(ptr);
    setIsDeleteModalOpen(true);
  };

  // Status Quick Toggle
  const handleToggleStatus = (id: string) => {
    setPartners((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const nextStatus: PartnerItem["status"] =
            p.status === "Active" ? "Inactive" : "Active";
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  // Handle Form Submit
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contactPerson) {
      alert("Please fill in Organization Name and Contact Person.");
      return;
    }

    if (isEditing && activePartner) {
      setPartners((prev) =>
        prev.map((p) =>
          p.id === activePartner.id ? ({ ...p, ...formData } as PartnerItem) : p
        )
      );
    } else {
      const newPartner: PartnerItem = {
        id: `ptr-${Date.now().toString().slice(-4)}`,
        name: formData.name || "New Partner Org",
        category: (formData.category || "Corporate") as PartnerItem["category"],
        website: formData.website || "https://example.org",
        email: formData.email || "info@partner.org",
        phone: formData.phone || "+1 800 000 0000",
        logoUrl:
          formData.logoUrl ||
          "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=200&q=80",
        status: (formData.status || "Active") as PartnerItem["status"],
        contactPerson: formData.contactPerson || "Contact Representative",
        summary: formData.summary || "Partner description.",
      };
      setPartners((prev) => [newPartner, ...prev]);
    }

    setIsFormModalOpen(false);
  };

  // Delete Confirm
  const handleDeleteConfirm = () => {
    if (activePartner) {
      setPartners((prev) => prev.filter((p) => p.id !== activePartner.id));
    }
    setIsDeleteModalOpen(false);
    setActivePartner(null);
  };

  return (
    <div className="space-y-8 font-satoshi">
      {/* Header Summary & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-cormorant text-dark-green">
            Partners Manager
          </h2>
          <p className="text-xs text-dark-green/60">
            Manage corporate sponsors, NGO allies, educational institutions, and global donors.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpenCreate}
          className="px-5 py-3 rounded-xl bg-linear-to-r from-dark-yellow to-rust-orange text-white font-semibold text-xs shadow-lg shadow-dark-yellow/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Partner</span>
        </motion.button>
      </div>

      {/* Metrics Header Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-dark-green/60 uppercase">
            Total Partners
          </p>
          <p className="text-2xl font-bold font-cormorant text-dark-green mt-0.5">
            {partners.length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-emerald-700 uppercase">
            Active Allies
          </p>
          <p className="text-2xl font-bold font-cormorant text-emerald-700 mt-0.5">
            {partners.filter((p) => p.status === "Active" || p.status === "Featured").length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-blue-700 uppercase">
            Corporate Sponsors
          </p>
          <p className="text-2xl font-bold font-cormorant text-blue-700 mt-0.5">
            {partners.filter((p) => p.category === "Corporate").length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-amber-700 uppercase">
            Featured Partners
          </p>
          <p className="text-2xl font-bold font-cormorant text-amber-700 mt-0.5">
            {partners.filter((p) => p.status === "Featured").length}
          </p>
        </div>
      </div>

      {/* Controls Bar: Search & Filters */}
      <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-dark-green/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search partners by name or contact..."
            className="w-full pl-10 pr-4 py-2 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder-dark-green/40 focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-dark-yellow" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-3 bg-beige border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
            >
              <option value="All">All Categories</option>
              <option value="Corporate">Corporate</option>
              <option value="NGO & Humanitarian">NGO & Humanitarian</option>
              <option value="Educational">Educational</option>
              <option value="Donor">Donor</option>
            </select>
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="py-2 px-3 bg-beige border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Featured">Featured</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Partners Data Table */}
      <div className="bg-white border border-stroke rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige border-b border-stroke text-[11px] font-semibold text-dark-green/70 uppercase tracking-wider">
                <th className="py-3.5 px-4">Organization & Logo</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Contact Info</th>
                <th className="py-3.5 px-4">Website</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stroke/60 text-xs">
              {filteredPartners.length > 0 ? (
                filteredPartners.map((ptr) => (
                  <motion.tr
                    key={ptr.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-beige/60 transition-colors group"
                  >
                    {/* Logo & Name */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={ptr.logoUrl}
                          alt={ptr.name}
                          className="w-11 h-11 rounded-full object-cover border border-stroke shrink-0 p-0.5 bg-white"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-dark-green truncate group-hover:text-dark-yellow transition-colors">
                            {ptr.name}
                          </p>
                          <p className="text-[11px] text-dark-green/60 line-clamp-1 mt-0.5">
                            {ptr.summary}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getCategoryBadge(
                          ptr.category
                        )}`}
                      >
                        {ptr.category}
                      </span>
                    </td>

                    {/* Contact Person & Email */}
                    <td className="py-4 px-4 whitespace-nowrap space-y-1">
                      <p className="font-semibold text-dark-green">
                        {ptr.contactPerson}
                      </p>
                      <div className="flex items-center gap-1.5 text-dark-green/60 text-[11px]">
                        <Mail className="w-3.5 h-3.5 text-dark-yellow" />
                        <span>{ptr.email}</span>
                      </div>
                    </td>

                    {/* Website Link */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <a
                        href={ptr.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-dark-yellow font-semibold hover:underline"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[140px]">
                          {ptr.website.replace("https://", "")}
                        </span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    </td>

                    {/* Status & Quick Toggle */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(ptr.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${getStatusBadge(
                          ptr.status
                        )} hover:scale-105`}
                        title="Click to toggle Active / Inactive status"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{ptr.status}</span>
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
                  <td colSpan={6} className="py-12 text-center text-dark-green/50">
                    <Users className="w-8 h-8 mx-auto mb-2 text-dark-green/30" />
                    <p className="font-semibold">No partners found</p>
                    <p className="text-xs">
                      Try adjusting your search query or category filter.
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

      {/* CREATE / EDIT PARTNER FORM MODAL */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={isEditing ? "Edit Partner Info" : "Register New Partner"}
        subtitle="Add partner organization details to the Chishty Foundation directory"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 font-satoshi">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Organization Name *
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Category *
              </label>
              <select
                value={formData.category || "Corporate"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as PartnerItem["category"],
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              >
                <option value="Corporate">Corporate</option>
                <option value="NGO & Humanitarian">NGO & Humanitarian</option>
                <option value="Educational">Educational</option>
                <option value="Donor">Donor</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Status *
              </label>
              <select
                value={formData.status || "Active"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as PartnerItem["status"],
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              >
                <option value="Active">Active</option>
                <option value="Featured">Featured</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Contact Representative *
              </label>
              <input
                type="text"
                required
                value={formData.contactPerson || ""}
                onChange={(e) =>
                  setFormData({ ...formData, contactPerson: e.target.value })
                }
                placeholder="e.g. Dr. Sarah Jenkins"
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="contact@partner.org"
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Website URL
              </label>
              <input
                type="url"
                value={formData.website || ""}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                placeholder="https://asgard/partner.org"
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Phone Number
              </label>
              <input
                type="text"
                value={formData.phone || ""}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+1 (555) 000-0000"
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Logo Image URL
            </label>
            <input
              type="url"
              value={formData.logoUrl || ""}
              onChange={(e) =>
                setFormData({ ...formData, logoUrl: e.target.value })
              }
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
            />
            {formData.logoUrl && (
              <div className="mt-2 flex items-center gap-3 p-2 rounded-xl border border-stroke bg-beige">
                <img
                  src={formData.logoUrl}
                  alt="Logo preview"
                  className="w-12 h-12 rounded-full object-cover border border-stroke bg-white p-0.5"
                />
                <span className="text-xs text-dark-green/70 font-medium">
                  Logo Live Preview
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Partnership Summary / Objectives
            </label>
            <textarea
              rows={3}
              value={formData.summary || ""}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
              placeholder="Summarize the core collaboration and initiatives..."
              className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
            />
          </div>

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
              className="px-5 py-2.5 rounded-xl bg-dark-green hover:bg-dark-green/90 text-white font-semibold text-xs transition-colors cursor-pointer shadow-md"
            >
              {isEditing ? "Save Changes" : "Register Partner"}
            </button>
          </div>
        </form>
      </Modal>

      {/* VIEW PARTNER DETAILS MODAL */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={activePartner?.name || "Partner Overview"}
        subtitle="Partner organization spotlight"
      >
        {activePartner && (
          <div className="space-y-5 font-satoshi">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-dark-green text-white">
              <img
                src={activePartner.logoUrl}
                alt={activePartner.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-dark-yellow bg-white p-0.5 shrink-0"
              />
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-xl font-bold font-cormorant text-white truncate">
                    {activePartner.name}
                  </h4>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getStatusBadge(
                      activePartner.status
                    )}`}
                  >
                    {activePartner.status}
                  </span>
                </div>
                <p className="text-xs text-[#FFD56C] font-mono">
                  {activePartner.category}
                </p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <p className="text-dark-green/80 leading-relaxed">
                {activePartner.summary}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-stroke">
                <div>
                  <p className="text-[11px] text-dark-green/60">Representative</p>
                  <p className="font-bold text-dark-green mt-0.5">
                    {activePartner.contactPerson}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-dark-green/60">Contact Details</p>
                  <p className="font-medium text-dark-green mt-0.5">
                    {activePartner.email} • {activePartner.phone}
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-stroke">
              <a
                href={activePartner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-dark-yellow font-bold hover:underline"
              >
                <span>Visit Official Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-dark-green text-[#FFFFFF] text-xs font-semibold"
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
        subtitle="This action cannot be undone."
      >
        <div className="space-y-4 font-satoshi">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Are you sure you want to remove this partner?</p>
              <p className="mt-1">
                You are about to remove <strong>"{activePartner?.name}"</strong> from the directory.
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
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-md"
            >
              Delete Partner
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
