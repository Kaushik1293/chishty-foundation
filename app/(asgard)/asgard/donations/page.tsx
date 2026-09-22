"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  getDonations,
  createDonation,
  updateDonation,
  updateDonationStatus,
  deleteDonation,
  DonationRecord,
} from "@/app/(asgard)/asgard/donations/actions";
import DonationsHeader from "@/src/components/asgard/donations/DonationsHeader";
import DonationsTable from "@/src/components/asgard/donations/DonationsTable";
import DonationDetailModal from "@/src/components/asgard/donations/DonationDetailModal";
import DonationFormModal from "@/src/components/asgard/donations/DonationFormModal";
import DonationStatusModal from "@/src/components/asgard/donations/DonationStatusModal";
import DonationDeleteModal from "@/src/components/asgard/donations/DonationDeleteModal";

export default function DonationsCrudPage() {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("All");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");
  const [selectedPaymentFilter, setSelectedPaymentFilter] = useState<string>("All");

  // Modal States
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Selected Donation for View / Edit / Delete
  const [selectedDonation, setSelectedDonation] = useState<DonationRecord | null>(null);

  // New offline donation form state
  const [formData, setFormData] = useState<Partial<DonationRecord>>({
    full_name: "",
    email: "",
    phone: "",
    amount: 1000,
    category: "Education",
    payment_method: "Offline / Cash",
    status: "completed",
    city: "",
    country: "India",
    address: "",
    notes: "",
  });

  // Fetch Donations
  const loadDonations = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const data = await getDonations();
      setDonations(data);
    } catch (err: any) {
      console.error("Failed to load donations:", err);
      setErrorMsg(err?.message || "Failed to load donations from database.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDonations();
  }, []);

  // Filtered list
  const filteredDonations = useMemo(() => {
    return donations.filter((item) => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        q === "" ||
        (item.full_name?.toLowerCase().includes(q) ?? false) ||
        (item.email?.toLowerCase().includes(q) ?? false) ||
        (item.phone?.toLowerCase().includes(q) ?? false) ||
        (item.payment_id?.toLowerCase().includes(q) ?? false) ||
        (item.razorpay_order_id?.toLowerCase().includes(q) ?? false) ||
        (item.city?.toLowerCase().includes(q) ?? false);

      const matchesStatus =
        selectedStatusFilter === "All" ||
        item.status?.toLowerCase() === selectedStatusFilter.toLowerCase();

      const matchesCategory =
        selectedCategoryFilter === "All" ||
        item.category === selectedCategoryFilter;

      const matchesPayment =
        selectedPaymentFilter === "All" ||
        item.payment_method === selectedPaymentFilter;

      return matchesSearch && matchesStatus && matchesCategory && matchesPayment;
    });
  }, [
    donations,
    searchTerm,
    selectedStatusFilter,
    selectedCategoryFilter,
    selectedPaymentFilter,
  ]);

  // Key Metrics
  const completedDonations = donations.filter(
    (d) => (d.status || "").toLowerCase() === "completed"
  );
  const pendingDonations = donations.filter(
    (d) => (d.status || "").toLowerCase() === "pending"
  );
  const totalAmountRaised = completedDonations.reduce(
    (sum, d) => sum + Number(d.amount || 0),
    0
  );

  // Open Handlers
  const handleOpenDetail = (donation: DonationRecord) => {
    setSelectedDonation(donation);
    setIsDetailModalOpen(true);
  };

  const handleOpenStatusModal = (donation: DonationRecord) => {
    setSelectedDonation(donation);
    setIsStatusModalOpen(true);
  };

  const handleOpenDelete = (donation: DonationRecord) => {
    setSelectedDonation(donation);
    setIsDeleteModalOpen(true);
  };

  const handleOpenCreate = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      amount: 1000,
      category: "Education",
      payment_method: "Offline / Cash",
      status: "completed",
      city: "",
      country: "India",
      address: "",
      notes: "",
    });
    setIsFormModalOpen(true);
  };

  // Submit Offline Donation Form
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.email || !formData.phone || !formData.amount) {
      alert("Please fill in all required fields (Name, Email, Phone, Amount).");
      return;
    }

    setIsSubmitting(true);
    const res = await createDonation({
      category: formData.category || "Education",
      amount: Number(formData.amount),
      full_name: formData.full_name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address?.trim() || undefined,
      city: formData.city?.trim() || undefined,
      country: formData.country?.trim() || "India",
      payment_method: formData.payment_method || "Offline / Cash",
      status: formData.status || "completed",
      notes: formData.notes?.trim() || undefined,
    });

    setIsSubmitting(false);

    if (res.success) {
      setIsFormModalOpen(false);
      loadDonations();
    } else {
      alert(`Error recording donation: ${res.error}`);
    }
  };

  // Update Status
  const handleStatusUpdate = async (
    id: string | number,
    newStatus: "completed" | "pending" | "failed" | "refunded",
    notes?: string
  ) => {
    setIsSubmitting(true);
    const res = await updateDonationStatus(id, newStatus, notes);
    setIsSubmitting(false);

    if (res.success) {
      setIsStatusModalOpen(false);
      setSelectedDonation(null);
      loadDonations();
    } else {
      alert(`Error updating donation status: ${res.error}`);
    }
  };

  // Delete Donation
  const handleDeleteConfirm = async () => {
    if (!selectedDonation?.id) return;

    setIsSubmitting(true);
    const res = await deleteDonation(selectedDonation.id);
    setIsSubmitting(false);

    if (res.success) {
      setIsDeleteModalOpen(false);
      setSelectedDonation(null);
      loadDonations();
    } else {
      alert(`Error deleting donation: ${res.error}`);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (filteredDonations.length === 0) {
      alert("No donation records to export.");
      return;
    }

    const headers = [
      "ID",
      "Date",
      "Donor Name",
      "Email",
      "Phone",
      "Amount (INR)",
      "Cause / Category",
      "Payment Mode",
      "Payment ID",
      "Order ID",
      "Status",
      "City",
      "Country",
      "Notes",
    ];

    const rows = filteredDonations.map((d) => [
      `"${d.id || ""}"`,
      `"${d.created_at || ""}"`,
      `"${(d.full_name || "").replace(/"/g, '""')}"`,
      `"${(d.email || "").replace(/"/g, '""')}"`,
      `"${(d.phone || "").replace(/"/g, '""')}"`,
      d.amount || 0,
      `"${(d.category || "").replace(/"/g, '""')}"`,
      `"${(d.payment_method || "").replace(/"/g, '""')}"`,
      `"${(d.payment_id || "").replace(/"/g, '""')}"`,
      `"${(d.razorpay_order_id || "").replace(/"/g, '""')}"`,
      `"${(d.status || "").replace(/"/g, '""')}"`,
      `"${(d.city || "").replace(/"/g, '""')}"`,
      `"${(d.country || "").replace(/"/g, '""')}"`,
      `"${(d.notes || "").replace(/"/g, '""')}"`,
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
    <div className="space-y-8 font-satoshi">
      {errorMsg && (
        <div className="p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs">
          {errorMsg}
        </div>
      )}

      {/* Header & Metric Cards & Search / Filters */}
      <DonationsHeader
        totalCount={donations.length}
        totalAmount={totalAmountRaised}
        completedCount={completedDonations.length}
        pendingCount={pendingDonations.length}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedStatusFilter={selectedStatusFilter}
        setSelectedStatusFilter={setSelectedStatusFilter}
        selectedCategoryFilter={selectedCategoryFilter}
        setSelectedCategoryFilter={setSelectedCategoryFilter}
        selectedPaymentFilter={selectedPaymentFilter}
        setSelectedPaymentFilter={setSelectedPaymentFilter}
        isLoading={isLoading}
        loadDonations={loadDonations}
        handleOpenCreate={handleOpenCreate}
        handleExportCSV={handleExportCSV}
      />

      {/* Table */}
      <DonationsTable
        donations={donations}
        filteredDonations={filteredDonations}
        isLoading={isLoading}
        handleOpenDetail={handleOpenDetail}
        handleOpenStatusModal={handleOpenStatusModal}
        handleOpenDelete={handleOpenDelete}
      />

      {/* Modals */}
      <DonationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedDonation(null);
        }}
        donation={selectedDonation}
      />

      <DonationFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        formData={formData}
        setFormData={setFormData}
        isSubmitting={isSubmitting}
        handleFormSubmit={handleFormSubmit}
      />

      <DonationStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedDonation(null);
        }}
        donation={selectedDonation}
        isSubmitting={isSubmitting}
        handleStatusUpdate={handleStatusUpdate}
      />

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
