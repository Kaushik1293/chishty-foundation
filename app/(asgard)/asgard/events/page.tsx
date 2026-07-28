"use client";

import React, { useState, useMemo } from "react";
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
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import Modal from "@/src/components/asgard/Modal";

interface EventItem {
  id: string;
  title: string;
  category: "Education" | "Healthcare" | "Humanitarian" | "Women Upliftment";
  date: string;
  location: string;
  status: "Published" | "Draft" | "Upcoming" | "Completed";
  bannerUrl: string;
  description: string;
  targetGoal: string;
  participants: number;
}

const initialEvents: EventItem[] = [
  {
    id: "evt-101",
    title: "Annual Education Drive 2026",
    category: "Education",
    date: "2026-08-15",
    location: "New Delhi, India",
    status: "Published",
    bannerUrl:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    description:
      "Providing school supplies, books, and scholarship packages to underprivileged children across rural communities.",
    targetGoal: "$15,000",
    participants: 450,
  },
  {
    id: "evt-102",
    title: "Free Healthcare & Medical Camp",
    category: "Healthcare",
    date: "2026-09-02",
    location: "Ajmer, Rajasthan",
    status: "Upcoming",
    bannerUrl:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    description:
      "Full health checkups, free medicines distribution, and eye screening camps led by volunteer medical specialists.",
    targetGoal: "$20,000",
    participants: 800,
  },
  {
    id: "evt-103",
    title: "Winter Emergency Relief Drive",
    category: "Humanitarian",
    date: "2026-11-20",
    location: "Kashmir Region",
    status: "Draft",
    bannerUrl:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    description:
      "Distributing warm clothing, blankets, and essential winter nutrition packs to vulnerable families.",
    targetGoal: "$30,000",
    participants: 1200,
  },
  {
    id: "evt-104",
    title: "Women Vocational Empowerment Workshop",
    category: "Women Upliftment",
    date: "2026-07-10",
    location: "Jaipur, Rajasthan",
    status: "Completed",
    bannerUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    description:
      "Skill development, tailoring training, and micro-entrepreneurship support for women seeking financial independence.",
    targetGoal: "$10,000",
    participants: 300,
  },
];

export default function EventsCrudPage() {
  const [events, setEvents] = useState<EventItem[]>(initialEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Active item for Edit / View / Delete
  const [activeEvent, setActiveEvent] = useState<EventItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<EventItem>>({
    title: "",
    category: "Education",
    date: "",
    location: "",
    status: "Published",
    bannerUrl: "",
    description: "",
    targetGoal: "",
    participants: 0,
  });

  // Category Badge Colors
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "Education":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "Healthcare":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "Humanitarian":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Women Upliftment":
        return "bg-purple-100 text-purple-800 border-purple-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  // Status Badge Colors
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-emerald-500/15 text-emerald-700 border-emerald-500/30";
      case "Upcoming":
        return "bg-blue-500/15 text-blue-700 border-blue-500/30";
      case "Draft":
        return "bg-amber-500/15 text-amber-700 border-amber-500/30";
      case "Completed":
        return "bg-slate-500/15 text-slate-700 border-slate-500/30";
      default:
        return "bg-gray-500/15 text-gray-700 border-gray-500/30";
    }
  };

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch =
        evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        evt.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || evt.category === selectedCategory;

      const matchesStatus =
        selectedStatus === "All" || evt.status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [events, searchTerm, selectedCategory, selectedStatus]);

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setActiveEvent(null);
    setFormData({
      title: "",
      category: "Education",
      date: new Date().toISOString().split("T")[0],
      location: "",
      status: "Published",
      bannerUrl:
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=800&q=80",
      description: "",
      targetGoal: "$10,000",
      participants: 100,
    });
    setIsFormModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (evt: EventItem) => {
    setIsEditing(true);
    setActiveEvent(evt);
    setFormData({ ...evt });
    setIsFormModalOpen(true);
  };

  // Open Detail Modal
  const handleOpenDetail = (evt: EventItem) => {
    setActiveEvent(evt);
    setIsDetailModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (evt: EventItem) => {
    setActiveEvent(evt);
    setIsDeleteModalOpen(true);
  };

  // Handle Status Toggle (Quick action directly in table)
  const handleToggleStatus = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => {
        if (e.id === id) {
          const nextStatus: EventItem["status"] =
            e.status === "Published" ? "Draft" : "Published";
          return { ...e, status: nextStatus };
        }
        return e;
      })
    );
  };

  // Handle Form Submit (Create or Edit)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date || !formData.location) {
      alert("Please fill in required fields: Title, Date, and Location.");
      return;
    }

    if (isEditing && activeEvent) {
      // Update
      setEvents((prev) =>
        prev.map((evt) =>
          evt.id === activeEvent.id ? ({ ...evt, ...formData } as EventItem) : evt
        )
      );
    } else {
      // Create
      const newEvt: EventItem = {
        id: `evt-${Date.now().toString().slice(-4)}`,
        title: formData.title || "Untitled Event",
        category: (formData.category || "Education") as EventItem["category"],
        date: formData.date || new Date().toISOString().split("T")[0],
        location: formData.location || "TBD",
        status: (formData.status || "Published") as EventItem["status"],
        bannerUrl:
          formData.bannerUrl ||
          "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
        description: formData.description || "No description provided.",
        targetGoal: formData.targetGoal || "$5,000",
        participants: Number(formData.participants) || 50,
      };
      setEvents((prev) => [newEvt, ...prev]);
    }

    setIsFormModalOpen(false);
  };

  // Handle Delete Confirmation
  const handleDeleteConfirm = () => {
    if (activeEvent) {
      setEvents((prev) => prev.filter((e) => e.id !== activeEvent.id));
    }
    setIsDeleteModalOpen(false);
    setActiveEvent(null);
  };

  return (
    <div className="space-y-8 font-satoshi">
      {/* Header Summary & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-cormorant text-dark-green">
            Events Manager
          </h2>
          <p className="text-xs text-dark-green/60">
            Create and maintain Chishty Foundation events, campaigns, and relief drives.
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpenCreate}
          className="px-5 py-3 rounded-xl bg-linear-to-r from-dark-yellow to-rust-orange text-white font-semibold text-xs shadow-lg shadow-dark-yellow/20 flex items-center justify-center gap-2 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Event</span>
        </motion.button>
      </div>

      {/* Metrics Header Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-dark-green/60 uppercase">
            Total Events
          </p>
          <p className="text-2xl font-bold font-cormorant text-dark-green mt-0.5">
            {events.length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-emerald-700 uppercase">
            Published
          </p>
          <p className="text-2xl font-bold font-cormorant text-emerald-700 mt-0.5">
            {events.filter((e) => e.status === "Published").length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-blue-700 uppercase">
            Upcoming
          </p>
          <p className="text-2xl font-bold font-cormorant text-blue-700 mt-0.5">
            {events.filter((e) => e.status === "Upcoming").length}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-amber-700 uppercase">
            Drafts
          </p>
          <p className="text-2xl font-bold font-cormorant text-amber-700 mt-0.5">
            {events.filter((e) => e.status === "Draft").length}
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
            placeholder="Search events by title or location..."
            className="w-full pl-10 pr-4 py-2 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder-dark-green/40 focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-dark-yellow" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-2 px-3 bg-beige border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
            >
              <option value="All">All Categories</option>
              <option value="Education">Education</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Humanitarian">Humanitarian</option>
              <option value="Women Upliftment">Women Upliftment</option>
            </select>
          </div>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="py-2 px-3 bg-beige border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
          >
            <option value="All">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Draft">Draft</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Events Data Table */}
      <div className="bg-white border border-stroke rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-beige border-b border-stroke text-[11px] font-semibold text-dark-green/70 uppercase tracking-wider">
                <th className="py-3.5 px-4">Event Info</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Date & Location</th>
                <th className="py-3.5 px-4">Target / Goal</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-stroke/60 text-xs">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((evt) => (
                  <motion.tr
                    key={evt.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-beige/60 transition-colors group"
                  >
                    {/* Event Info (Banner + Title + Description) */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={evt.bannerUrl}
                          alt={evt.title}
                          className="w-14 h-12 rounded-xl object-cover border border-stroke shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-dark-green truncate group-hover:text-dark-yellow transition-colors">
                            {evt.title}
                          </p>
                          <p className="text-[11px] text-dark-green/60 line-clamp-1 mt-0.5">
                            {evt.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold border ${getCategoryBadge(
                          evt.category
                        )}`}
                      >
                        {evt.category}
                      </span>
                    </td>

                    {/* Date & Location */}
                    <td className="py-4 px-4 whitespace-nowrap space-y-1">
                      <div className="flex items-center gap-1.5 text-dark-green">
                        <Calendar className="w-3.5 h-3.5 text-dark-yellow" />
                        <span className="font-medium">{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-dark-green/60 text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-dark-green/40" />
                        <span>{evt.location}</span>
                      </div>
                    </td>

                    {/* Target / Capacity */}
                    <td className="py-4 px-4 whitespace-nowrap space-y-1">
                      <div className="flex items-center gap-1.5 text-dark-green font-semibold">
                        <Target className="w-3.5 h-3.5 text-dark-yellow" />
                        <span>{evt.targetGoal}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-dark-green/60 text-[11px]">
                        <Users className="w-3.5 h-3.5 text-dark-green/40" />
                        <span>{evt.participants} Capacity</span>
                      </div>
                    </td>

                    {/* Status & Quick Toggle */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(evt.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${getStatusBadge(
                          evt.status
                        )} hover:scale-105`}
                        title="Click to toggle Published / Draft status"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span>{evt.status}</span>
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenDetail(evt)}
                          className="p-1.5 rounded-lg text-dark-green/70 hover:text-dark-green hover:bg-dark-green/10 transition-colors"
                          title="View Details"
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
                      Try adjusting your search query or filter selection.
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

      {/* CREATE / EDIT EVENT FORM MODAL */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={isEditing ? "Edit Event Details" : "Create New Event"}
        subtitle="Fill in the event information for Chishty Foundation"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 font-satoshi">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Category *
              </label>
              <select
                value={formData.category || "Education"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as EventItem["category"],
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              >
                <option value="Education">Education</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Humanitarian">Humanitarian</option>
                <option value="Women Upliftment">Women Upliftment</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Status *
              </label>
              <select
                value={formData.status || "Published"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    status: e.target.value as EventItem["status"],
                  })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              >
                <option value="Published">Published</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Draft">Draft</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Event Date *
              </label>
              <input
                type="date"
                required
                value={formData.date || ""}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g. New Delhi, India"
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Target Goal Amount
              </label>
              <input
                type="text"
                value={formData.targetGoal || ""}
                onChange={(e) =>
                  setFormData({ ...formData, targetGoal: e.target.value })
                }
                placeholder="e.g. $15,000"
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-dark-green">
                Participant Capacity
              </label>
              <input
                type="number"
                value={formData.participants || 0}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    participants: parseInt(e.target.value) || 0,
                  })
                }
                placeholder="e.g. 500"
                className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Banner Image URL
            </label>
            <input
              type="url"
              value={formData.bannerUrl || ""}
              onChange={(e) =>
                setFormData({ ...formData, bannerUrl: e.target.value })
              }
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3.5 py-2.5 bg-white border border-stroke rounded-xl text-xs text-dark-green focus:outline-none focus:border-dark-yellow"
            />
            {formData.bannerUrl && (
              <div className="mt-2 rounded-xl overflow-hidden h-28 border border-stroke relative bg-dark-green/5">
                <img
                  src={formData.bannerUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white text-[10px]">
                  Live Image Preview
                </span>
              </div>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-dark-green">
              Event Description
            </label>
            <textarea
              rows={3}
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the initiative, key outcomes, and activities..."
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
              {isEditing ? "Save Changes" : "Create Event"}
            </button>
          </div>
        </form>
      </Modal>

      {/* VIEW EVENT DETAILS MODAL */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={activeEvent?.title || "Event Details"}
        subtitle="Foundation event overview card"
      >
        {activeEvent && (
          <div className="space-y-5 font-satoshi">
            <div className="relative h-48 rounded-2xl overflow-hidden border border-stroke">
              <img
                src={activeEvent.bannerUrl}
                alt={activeEvent.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
              <span
                className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border bg-white/90 ${getStatusBadge(
                  activeEvent.status
                )}`}
              >
                {activeEvent.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getCategoryBadge(
                    activeEvent.category
                  )}`}
                >
                  {activeEvent.category}
                </span>
              </div>

              <p className="text-xs text-dark-green/80 leading-relaxed">
                {activeEvent.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-stroke">
                <div>
                  <p className="text-[11px] text-dark-green/60">Date & Location</p>
                  <p className="text-xs font-bold text-dark-green mt-0.5">
                    {activeEvent.date} • {activeEvent.location}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] text-dark-green/60">Fundraising Target</p>
                  <p className="text-xs font-bold text-dark-yellow mt-0.5">
                    {activeEvent.targetGoal} ({activeEvent.participants} People)
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
        subtitle="This action cannot be undone."
      >
        <div className="space-y-4 font-satoshi">
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Are you sure you want to delete this event?</p>
              <p className="mt-1">
                You are about to remove <strong>"{activeEvent?.title}"</strong>.
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
              Delete Event
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
