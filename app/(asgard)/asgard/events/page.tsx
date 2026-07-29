"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  MapPin,
  Tag,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Image as ImageIcon,
  AlertTriangle,
  Users,
  Target,
  ChevronLeft,
  ChevronRight,
  Star,
  ToggleLeft,
  ToggleRight,
  Globe,
  Heart,
  Award,
  Loader2,
  RefreshCw,
} from "lucide-react";
import Modal from "@/src/components/asgard/Modal";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleEventActiveStatus,
  toggleEventFeaturedStatus,
  Event as SupabaseEvent,
} from "@/app/(web)/action";

const ICON_OPTIONS = [
  { label: "Calendar", value: "calendar", icon: Calendar },
  { label: "Sparkles", value: "sparkles", icon: Sparkles },
  { label: "Heart", value: "heart", icon: Heart },
  { label: "Users", value: "users", icon: Users },
  { label: "Award", value: "award", icon: Award },
  { label: "Globe", value: "globe", icon: Globe },
];

export default function EventsCrudPage() {
  const [events, setEvents] = useState<SupabaseEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");
  const [selectedFeaturedFilter, setSelectedFeaturedFilter] = useState<string>("All");

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Active item
  const [activeEvent, setActiveEvent] = useState<SupabaseEvent | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Exact Supabase Form Fields State
  const [formData, setFormData] = useState<Partial<SupabaseEvent>>({
    title: "",
    slug: "",
    short_description: "",
    description: "",
    banner_image: "",
    icon: "calendar",
    event_date: "",
    is_featured: false,
    is_active: true,
  });

  // Fetch Events from Supabase
  const loadEvents = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err: any) {
      console.error("Failed to load events from Supabase:", err);
      setErrorMsg(err?.message || "Failed to load events from Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const titleMatch = evt.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const descMatch = evt.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const shortDescMatch = evt.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const slugMatch = evt.slug?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const matchesSearch = searchTerm === "" || titleMatch || descMatch || shortDescMatch || slugMatch;

      const matchesStatus =
        selectedStatusFilter === "All"
          ? true
          : selectedStatusFilter === "Active"
            ? evt.is_active === true
            : evt.is_active === false;

      const matchesFeatured =
        selectedFeaturedFilter === "All"
          ? true
          : selectedFeaturedFilter === "Featured"
            ? evt.is_featured === true
            : evt.is_featured === false;

      return matchesSearch && matchesStatus && matchesFeatured;
    });
  }, [events, searchTerm, selectedStatusFilter, selectedFeaturedFilter]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setActiveEvent(null);
    setFormData({
      title: "",
      slug: "",
      short_description: "",
      description: "",
      banner_image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
      icon: "calendar",
      event_date: new Date().toISOString().split("T")[0],
      is_featured: false,
      is_active: true,
    });
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (evt: SupabaseEvent) => {
    setIsEditing(true);
    setActiveEvent(evt);
    setFormData({
      title: evt.title || "",
      slug: evt.slug || "",
      short_description: evt.short_description || "",
      description: evt.description || "",
      banner_image: evt.banner_image || "",
      icon: evt.icon || "calendar",
      event_date: evt.event_date || "",
      is_featured: evt.is_featured ?? false,
      is_active: evt.is_active ?? true,
    });
    setIsFormModalOpen(true);
  };

  // Open Detail Modal
  const handleOpenDetail = (evt: SupabaseEvent) => {
    setActiveEvent(evt);
    setIsDetailModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (evt: SupabaseEvent) => {
    setActiveEvent(evt);
    setIsDeleteModalOpen(true);
  };

  // Toggle Active Status in Supabase
  const handleToggleActive = async (evt: SupabaseEvent) => {
    if (!evt.id) return;
    const newStatus = !evt.is_active;

    // Optimistic UI Update
    setEvents((prev) =>
      prev.map((e) => (e.id === evt.id ? { ...e, is_active: newStatus } : e))
    );

    const res = await toggleEventActiveStatus(evt.id, evt.is_active);
    if (!res.success) {
      // Revert if error
      setEvents((prev) =>
        prev.map((e) => (e.id === evt.id ? { ...e, is_active: evt.is_active } : e))
      );
      alert(`Error toggling active status: ${res.error}`);
    }
  };

  // Toggle Featured Status in Supabase
  const handleToggleFeatured = async (evt: SupabaseEvent) => {
    if (!evt.id) return;
    const newFeatured = !evt.is_featured;

    // Optimistic UI Update
    setEvents((prev) =>
      prev.map((e) => (e.id === evt.id ? { ...e, is_featured: newFeatured } : e))
    );

    const res = await toggleEventFeaturedStatus(evt.id, evt.is_featured);
    if (!res.success) {
      // Revert
      setEvents((prev) =>
        prev.map((e) => (e.id === evt.id ? { ...e, is_featured: evt.is_featured } : e))
      );
      alert(`Error toggling featured status: ${res.error}`);
    }
  };

  // Submit Form (Create / Edit in Supabase)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) {
      alert("Please enter an Event Title.");
      return;
    }

    setIsSubmitting(true);

    if (isEditing && activeEvent?.id) {
      const res = await updateEvent(activeEvent.id, {
        title: formData.title,
        slug: formData.slug || null,
        short_description: formData.short_description || null,
        description: formData.description || null,
        banner_image: formData.banner_image || null,
        icon: formData.icon || null,
        event_date: formData.event_date || null,
        is_featured: formData.is_featured ?? false,
        is_active: formData.is_active ?? true,
      });

      setIsSubmitting(false);

      if (res.success && res.data) {
        setIsFormModalOpen(false);
        loadEvents();
      } else {
        alert(`Error updating event: ${res.error}`);
      }
    } else {
      const res = await createEvent({
        title: formData.title,
        slug: formData.slug || null,
        short_description: formData.short_description || null,
        description: formData.description || null,
        banner_image: formData.banner_image || null,
        icon: formData.icon || null,
        event_date: formData.event_date || null,
        is_featured: formData.is_featured ?? false,
        is_active: formData.is_active ?? true,
      });

      setIsSubmitting(false);

      if (res.success && res.data) {
        setIsFormModalOpen(false);
        loadEvents();
      } else {
        alert(`Error creating event: ${res.error}`);
      }
    }
  };

  // Delete Confirm in Supabase
  const handleDeleteConfirm = async () => {
    if (!activeEvent?.id) return;

    setIsSubmitting(true);
    const res = await deleteEvent(activeEvent.id);
    setIsSubmitting(false);

    if (res.success) {
      setIsDeleteModalOpen(false);
      setActiveEvent(null);
      loadEvents();
    } else {
      alert(`Error deleting event: ${res.error}`);
    }
  };

  return (
    <div className="space-y-8 font-satoshi">
      {/* Header Summary & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-satoshi text-dark-green">
            Events Manager
          </h2>
          <p className="text-sm text-dark-green/75 font-normal mt-0.5">
            Create, edit, toggle, and manage foundation events.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadEvents}
            className="p-2.5 rounded-xl bg-white border border-stroke text-dark-green hover:bg-dark-green/5 transition-colors cursor-pointer"
            title="Refresh events"
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
            <span>Create New Event</span>
          </motion.button>
        </div>
      </div>

      {/* Metrics Header Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-dark-green/60 uppercase">
            Total Events
          </p>
          <p className="text-2xl font-bold font-satoshi text-dark-green mt-0.5">
            {events.length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-emerald-700 uppercase">
            Active / Published
          </p>
          <p className="text-2xl font-bold font-satoshi text-emerald-700 mt-0.5">
            {events.filter((e) => e.is_active).length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-amber-700 uppercase">
            Featured Events
          </p>
          <p className="text-2xl font-bold font-satoshi text-amber-700 mt-0.5">
            {events.filter((e) => e.is_featured).length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-slate-600 uppercase">
            Draft / Inactive
          </p>
          <p className="text-2xl font-bold font-satoshi text-slate-600 mt-0.5">
            {events.filter((e) => !e.is_active).length}
          </p>
        </div>
      </div>

      {/* Controls Bar: Search & Filter Dropdowns */}
      <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-dark-green/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, slug, description..."
            className="w-full pl-10 pr-4 py-2 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder-dark-green/40 focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
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

          <select
            value={selectedFeaturedFilter}
            onChange={(e) => setSelectedFeaturedFilter(e.target.value)}
            className="py-2 px-3 bg-beige border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
          >
            <option value="All">All Events</option>
            <option value="Featured">Featured Only</option>
            <option value="Non-Featured">Non-Featured</option>
          </select>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white border border-stroke rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige border-b border-stroke text-[11px] font-semibold text-dark-green/70 uppercase tracking-wider">
                <th className="py-3.5 px-4">Event Banner & Title</th>
                <th className="py-3.5 px-4">Slug</th>
                <th className="py-3.5 px-4">Event Date</th>
                <th className="py-3.5 px-4">Featured</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stroke/60 text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-dark-green/50">
                    <Loader2 className="w-7 h-7 mx-auto mb-2 animate-spin text-dark-yellow" />
                    <p className="font-semibold text-xs">Loading events from Supabase...</p>
                  </td>
                </tr>
              ) : filteredEvents.length > 0 ? (
                filteredEvents.map((evt) => (
                  <motion.tr
                    key={evt.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-beige/60 transition-colors group"
                  >
                    {/* Banner & Title */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        {evt.banner_image ? (
                          <img
                            src={evt.banner_image}
                            alt={evt.title || "Event"}
                            className="w-14 h-12 rounded-xl object-cover border border-stroke shrink-0 bg-dark-green/5"
                          />
                        ) : (
                          <div className="w-14 h-12 rounded-xl bg-dark-green/10 text-dark-green flex items-center justify-center shrink-0 border border-stroke">
                            <Calendar className="w-5 h-5 text-dark-yellow" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-bold text-dark-green truncate group-hover:text-dark-yellow transition-colors">
                              {evt.title || "Untitled Event"}
                            </p>
                            {evt.is_featured && (
                              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] text-dark-green/60 line-clamp-1 mt-0.5">
                            {evt.short_description || evt.description || "No description"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Slug */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-dark-green/5 border border-stroke text-dark-green/80">
                        {evt.slug || "—"}
                      </span>
                    </td>

                    {/* Event Date */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-dark-green font-medium">
                        <Calendar className="w-3.5 h-3.5 text-dark-yellow" />
                        <span>{evt.event_date || "Not set"}</span>
                      </div>
                    </td>

                    {/* Featured Toggle */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleFeatured(evt)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all cursor-pointer ${evt.is_featured
                          ? "bg-amber-500/15 text-amber-800 border-amber-500/40"
                          : "bg-gray-100 text-gray-600 border-gray-300"
                          }`}
                        title="Click to toggle Featured status"
                      >
                        <Star className={`w-3 h-3 ${evt.is_featured ? "fill-amber-500 text-amber-500" : ""}`} />
                        <span>{evt.is_featured ? "Featured" : "Standard"}</span>
                      </button>
                    </td>

                    {/* Active Status Toggle */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleActive(evt)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${evt.is_active
                          ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                          : "bg-slate-500/15 text-slate-700 border-slate-500/30"
                          }`}
                        title="Click to toggle Active / Draft status"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{evt.is_active ? "Active" : "Draft"}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(evt)}
                          className="p-1.5 rounded-lg text-dark-green/70 hover:text-dark-green hover:bg-dark-green/10 transition-colors"
                          title="View Event Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(evt)}
                          className="p-1.5 rounded-lg text-dark-yellow hover:bg-dark-yellow/10 transition-colors"
                          title="Edit Event"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenDelete(evt)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Event"
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
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-dark-green/30" />
                    <p className="font-semibold">No events found</p>
                    <p className="text-xs">
                      Click <strong>"Create New Event"</strong> to add your first event record!
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
            Showing <strong>{filteredEvents.length}</strong> of{" "}
            <strong>{events.length}</strong> events
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

      {/* CREATE / EDIT EVENT FORM MODAL - EXACT SUPABASE FIELDS */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
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

          {/* Banner Image URL & Icon */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Banner Image URL
              </label>
              <input
                type="url"
                value={formData.banner_image || ""}
                onChange={(e) =>
                  setFormData({ ...formData, banner_image: e.target.value })
                }
                placeholder="https://images.unsplash.com/..."
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Icon Identifier
              </label>
              <select
                value={formData.icon || "calendar"}
                onChange={(e) =>
                  setFormData({ ...formData, icon: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              >
                {ICON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Image Live Preview if URL provided */}
          {formData.banner_image && (
            <div className="mt-2 rounded-xl overflow-hidden h-28 border border-stroke relative bg-dark-green/5">
              <img
                src={formData.banner_image}
                alt="Live Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                Live Image Preview
              </span>
            </div>
          )}

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
                <span>{isEditing ? "Update Event" : "Create Event"}</span>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* VIEW EVENT DETAILS MODAL */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={activeEvent?.title || "Event Spotlight"}
        subtitle="Detailed event record overview"
      >
        {activeEvent && (
          <div className="space-y-5 font-satoshi">
            {activeEvent.banner_image && (
              <div className="relative h-48 rounded-2xl overflow-hidden border border-stroke">
                <img
                  src={activeEvent.banner_image}
                  alt={activeEvent.title || "Event"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <span
                  className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border bg-white/90 ${activeEvent.is_active
                    ? "text-emerald-700 border-emerald-300"
                    : "text-slate-700 border-slate-300"
                    }`}
                >
                  {activeEvent.is_active ? "Active" : "Draft"}
                </span>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {activeEvent.slug && (
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded bg-dark-green/10 border border-stroke text-dark-green">
                    slug: {activeEvent.slug}
                  </span>
                )}
                {activeEvent.is_featured && (
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 font-semibold flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <span>Featured</span>
                  </span>
                )}
              </div>

              {activeEvent.short_description && (
                <p className="text-xs font-semibold text-dark-yellow">
                  {activeEvent.short_description}
                </p>
              )}

              <p className="text-xs text-dark-green/80 leading-relaxed">
                {activeEvent.description || "No detailed description provided."}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-stroke text-xs">
                <div>
                  <p className="text-[11px] text-dark-green/60">Event Date</p>
                  <p className="font-bold text-dark-green mt-0.5">
                    {activeEvent.event_date || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-dark-green/60">Icon</p>
                  <p className="font-bold text-dark-green mt-0.5 capitalize">
                    {activeEvent.icon || "calendar"}
                  </p>
                </div>
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
        title="Confirm Delete Event"
        subtitle="This will permanently delete the event record."
      >
        <div className="space-y-4 font-satoshi">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Are you sure you want to delete this event?</p>
              <p className="mt-1">
                You are about to remove <strong>"{activeEvent?.title}"</strong> (ID: {activeEvent?.id}) from the system.
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
                <span>Delete Event</span>
              )}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
