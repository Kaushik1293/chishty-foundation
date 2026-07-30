"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  toggleEventActiveStatus,
  toggleEventFeaturedStatus,
  Event as SupabaseEvent,
} from "@/app/(web)/action";
import EventsHeader from "@/src/components/asgard/events/EventsHeader";
import EventsTable from "@/src/components/asgard/events/EventsTable";
import EventFormModal from "@/src/components/asgard/events/EventFormModal";
import EventDetailModal from "@/src/components/asgard/events/EventDetailModal";
import EventDeleteModal from "@/src/components/asgard/events/EventDeleteModal";

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
    icon: "",
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
      banner_image: "",
      icon: "",
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
      icon: evt.icon || "",
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
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {errorMsg}
        </div>
      )}

      <EventsHeader
        eventsCount={events.length}
        activeCount={events.filter((e) => e.is_active).length}
        featuredCount={events.filter((e) => e.is_featured).length}
        draftCount={events.filter((e) => !e.is_active).length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
        selectedFeaturedFilter={selectedFeaturedFilter}
        setSelectedFeaturedFilter={setSelectedFeaturedFilter}
        isLoading={isLoading}
        loadEvents={loadEvents}
        handleOpenCreate={handleOpenCreate}
      />

      <EventsTable
        events={events}
        filteredEvents={filteredEvents}
        isLoading={isLoading}
        handleToggleFeatured={handleToggleFeatured}
        handleToggleActive={handleToggleActive}
        handleOpenDetail={handleOpenDetail}
        handleOpenEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
      />

      <EventFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        handleFormSubmit={handleFormSubmit}
      />

      <EventDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        activeEvent={activeEvent}
      />

      <EventDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        activeEvent={activeEvent}
        isSubmitting={isSubmitting}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
