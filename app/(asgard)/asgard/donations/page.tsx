"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, X } from "lucide-react";
import {
  getDonations,
  createDonation,
  updateDonation,
  deleteDonation,
  DonationRecord,
} from "@/app/(asgard)/asgard/donations/actions";
import DonationsHeader from "@/src/components/asgard/donations/DonationsHeader";
import DonationsTable from "@/src/components/asgard/donations/DonationsTable";
import DonationDetailModal from "@/src/components/asgard/donations/DonationDetailModal";
import DonationFormModal from "@/src/components/asgard/donations/DonationFormModal";
import DonationDeleteModal from "@/src/components/asgard/donations/DonationDeleteModal";

interface ToastNotification {
  id: string;
  type: "success" | "error";
  message: string;
}

export default function DonationsCrudPage() {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  // Modal States
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected Donation for View / Edit / Delete
  const [selectedDonation, setSelectedDonation] = useState<DonationRecord | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formData, setFormData] = useState<Partial<DonationRecord>>({
    donor_name: "",
    donor_email: "",
    donor_phone: "",
    amount: 1000,
    currency: "INR",
    donation_type: "General",
    message: "",
    is_anonymous: false,
    admin_notes: "",
  });

  // Helper for toasts
  const addToast = (type: "success" | "error", message: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch Donations
  const loadDonations = async () => {
    setIsLoading(true);
    try {
      console.log("[Asgard Donations Page] Loading donations from Supabase...");
      const data = await getDonations();
      console.log("[Asgard Donations Page] Successfully loaded donations:", data);
      setDonations(data);
    } catch (err: any) {
      console.error("[Asgard Donations Page] Failed to load donations:", err);
      addToast("error", "Failed to load donations from database.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  // Distinct Causes / Categories
  const categories = useMemo(() => {
    const defaultCats = [
      "Education",
      "Healthcare",
      "Women Empowerment",
      "Livelihood & Skills",
      "Environment & Sustainability",
      "Hunger Relief",
      "General",
    ];
    const set = new Set<string>(defaultCats);
    donations.forEach((d) => {
      if (d.donation_type && d.donation_type.trim()) {
        set.add(d.donation_type.trim());
      }
    });
    return Array.from(set);
  }, [donations]);

  // Filtered list
  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        (item.donor_name?.toLowerCase().includes(q) ?? false) ||
        (item.donor_email?.toLowerCase().includes(q) ?? false) ||
        (item.donor_phone?.toLowerCase().includes(q) ?? false) ||
        (item.transaction_id?.toLowerCase().includes(q) ?? false) ||
        (item.order_id?.toLowerCase().includes(q) ?? false);

      const statusVal = (item.payment_status || "").toLowerCase();
      const filterVal = selectedStatusFilter.toLowerCase();
      let matchesStatus = true;
      if (selectedStatusFilter !== "All") {
        if (filterVal === "success") {
          matchesStatus = statusVal === "success" || statusVal === "completed";
        } else {
          matchesStatus = statusVal === filterVal;
        }
      }

      const matchesCategory =
        selectedCategoryFilter === "All" ||
        item.donation_type === selectedCategoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [donations, searchTerm, selectedStatusFilter, selectedCategoryFilter]);

  // Key Metrics (Requirement 16)
  const successDonations = donations.filter((d) => {
    const s = (d.payment_status || "").toLowerCase();
    return s === "success" || s === "completed";
  });
  const pendingDonations = donations.filter(
    (d) => (d.payment_status || "").toLowerCase() === "pending"
  );
  const failedDonations = donations.filter((d) => {
    const s = (d.payment_status || "").toLowerCase();
    return s === "failed" || s === "cancelled";
  });
  const totalAmountReceived = successDonations.reduce(
    (sum, d) => sum + Number(d.amount || 0),
    0
  );

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedStatusFilter("All");
    setSelectedCategoryFilter("All");
  };

  // Open View Modal
  const handleOpenDetail = (donation: DonationRecord) => {
    setSelectedDonation(donation);
    setIsDetailModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (donation: DonationRecord) => {
    setIsEditing(true);
    setSelectedDonation(donation);
    setFormData({
      donor_name: donation.donor_name || "",
      donor_email: donation.donor_email || "",
      donor_phone: donation.donor_phone || "",
      amount: donation.amount || 0,
      currency: donation.currency || "INR",
      donation_type: donation.donation_type || "General",
      message: donation.message || "",
      is_anonymous: Boolean(donation.is_anonymous),
      admin_notes: donation.admin_notes || "",
    });
    setIsFormModalOpen(true);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setIsEditing(false);
    setSelectedDonation(null);
    setFormData({
      donor_name: "",
      donor_email: "",
      donor_phone: "",
      amount: 1000,
      currency: "INR",
      donation_type: "General",
      message: "",
      is_anonymous: false,
      admin_notes: "",
    });
    setIsFormModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (donation: DonationRecord) => {
    setSelectedDonation(donation);
    setIsDeleteModalOpen(true);
  };

  // Submit Form (Create / Edit)
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.donor_name?.trim() ||
      !formData.donor_email?.trim() ||
      !formData.donor_phone?.trim()
    ) {
      addToast("error", "Please fill in donor name, email, and phone number.");
      return;
    }

    setIsSubmitting(true);

    if (isEditing && selectedDonation?.id) {
      // Edit existing donation
      const res = await updateDonation(selectedDonation.id, {
        donor_name: formData.donor_name.trim(),
        donor_email: formData.donor_email.trim(),
        donor_phone: formData.donor_phone.trim(),
        donation_type: formData.donation_type || "General",
        message: formData.message?.trim() || null,
        is_anonymous: Boolean(formData.is_anonymous),
        admin_notes: formData.admin_notes?.trim() || null,
      });

      setIsSubmitting(false);

      if (res.success) {
        setIsFormModalOpen(false);
        setSelectedDonation(null);
        addToast("success", "Donation updated successfully.");
        loadDonations();
      } else {
        addToast("error", `Failed to update donation: ${res.error}`);
      }
    } else {
      // Add manual / offline donation record
      if (!formData.amount || formData.amount <= 0) {
        setIsSubmitting(false);
        addToast("error", "Please specify a valid donation amount.");
        return;
      }

      const res = await createDonation({
        donor_name: formData.donor_name.trim(),
        donor_email: formData.donor_email.trim(),
        donor_phone: formData.donor_phone.trim(),
        amount: Number(formData.amount),
        currency: formData.currency || "INR",
        donation_type: formData.donation_type || "General",
        message: formData.message?.trim() || null,
        is_anonymous: Boolean(formData.is_anonymous),
        payment_status: "pending",
        admin_notes: formData.admin_notes?.trim() || null,
      });

      setIsSubmitting(false);

      if (res.success) {
        setIsFormModalOpen(false);
        addToast("success", "Donation created successfully.");
        loadDonations();
      } else {
        addToast("error", `Failed to create donation: ${res.error}`);
      }
    }
  };

  // Delete Confirm
  const handleDeleteConfirm = async () => {
    if (!selectedDonation?.id) return;

    setIsSubmitting(true);
    const res = await deleteDonation(selectedDonation.id);
    setIsSubmitting(false);

    if (res.success) {
      setIsDeleteModalOpen(false);
      setSelectedDonation(null);
      addToast("success", "Donation deleted successfully.");
      loadDonations();
    } else {
      addToast("error", `Failed to delete donation: ${res.error}`);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (filteredDonations.length === 0) {
      addToast("error", "No donation records to export.");
      return;
    }

    const headers = [
      "ID",
      "Date",
      "Donor Name",
      "Email",
      "Phone",
      "Amount",
      "Currency",
      "Donation Type",
      "Payment Status",
      "Payment Method",
      "Transaction ID",
      "Order ID",
      "Anonymous",
      "Message",
      "Admin Notes",
    ];

    const rows = filteredDonations.map((d) => [
      `"${d.id || ""}"`,
      `"${d.created_at || ""}"`,
      `"${(d.donor_name || "").replace(/"/g, '""')}"`,
      `"${(d.donor_email || "").replace(/"/g, '""')}"`,
      `"${(d.donor_phone || "").replace(/"/g, '""')}"`,
      d.amount || 0,
      `"${d.currency || "INR"}"`,
      `"${(d.donation_type || "").replace(/"/g, '""')}"`,
      `"${(d.payment_status || "").replace(/"/g, '""')}"`,
      `"${(d.payment_method || "").replace(/"/g, '""')}"`,
      `"${(d.transaction_id || "").replace(/"/g, '""')}"`,
      `"${(d.order_id || "").replace(/"/g, '""')}"`,
      d.is_anonymous ? "Yes" : "No",
      `"${(d.message || "").replace(/"/g, '""')}"`,
      `"${(d.admin_notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `chishty_donations_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-satoshi relative">
      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
              className={`p-3.5 rounded-xl shadow-lg border flex items-start gap-2.5 pointer-events-auto text-xs ${
                toast.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                  : "bg-red-50 text-red-800 border-red-300"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              )}
              <div className="flex-1 font-medium">{toast.message}</div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-current opacity-60 hover:opacity-100 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header & 5 KPI Cards & Search / Filters */}
      <DonationsHeader
        totalCount={donations.length}
        totalAmount={totalAmountReceived}
        successCount={successDonations.length}
        pendingCount={pendingDonations.length}
        failedCount={failedDonations.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
        selectedCategoryFilter={selectedCategoryFilter}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
        categories={categories}
        isLoading={isLoading}
        loadDonations={loadDonations}
        handleOpenCreate={handleOpenCreate}
        handleExportCSV={handleExportCSV}
        handleResetFilters={handleResetFilters}
      />

      {/* Table */}
      <DonationsTable
        donations={donations}
        filteredDonations={filteredDonations}
        isLoading={isLoading}
        handleOpenDetail={handleOpenDetail}
        handleOpenEdit={handleOpenEdit}
        handleOpenDelete={handleOpenDelete}
        handleResetFilters={handleResetFilters}
      />

      {/* View Detail Modal */}
      <DonationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDonation(null);
        }}
        donation={selectedDonation}
      />

      {/* Create / Edit Form Modal */}
      <DonationFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        isEditing={isEditing}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        handleFormSubmit={handleFormSubmit}
      />

      {/* Delete Confirmation Modal */}
      <DonationDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedDonation(null);
        }}
        donation={selectedDonation}
        isDeleting={isSubmitting}
        handleDelete={handleDeleteConfirm}
      />
    </div>
  );
}
