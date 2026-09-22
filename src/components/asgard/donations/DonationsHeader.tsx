"use client";

import React from "react";
import {
  Search,
  Plus,
  RefreshCw,
  Download,
  IndianRupee,
  CheckCircle2,
  Clock,
  Coins,
  TrendingUp,
  Filter,
} from "lucide-react";
import AsgardSelect from "../AsgardSelect";

interface DonationsHeaderProps {
  totalCount: number;
  totalAmount: number;
  completedCount: number;
  pendingCount: number;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (val: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (val: string) => void;
  selectedPaymentFilter: string;
  setSelectedPaymentFilter: (val: string) => void;
  isLoading: boolean;
  loadDonations: () => void;
  handleOpenCreate: () => void;
  handleExportCSV: () => void;
}

export default function DonationsHeader({
  totalCount,
  totalAmount,
  completedCount,
  pendingCount,
  searchTerm,
  setSearchTerm,
  selectedStatusFilter,
  setSelectedStatusFilter,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  selectedPaymentFilter,
  setSelectedPaymentFilter,
  isLoading,
  loadDonations,
  handleOpenCreate,
  handleExportCSV,
}: DonationsHeaderProps) {
  const statusOptions = [
    { label: "All Status", value: "All" },
    { label: "Completed", value: "Completed" },
    { label: "Pending", value: "Pending" },
    { label: "Failed", value: "Failed" },
    { label: "Refunded", value: "Refunded" },
  ];

  const categoryOptions = [
    { label: "All Causes", value: "All" },
    { label: "Education", value: "Education" },
    { label: "Healthcare", value: "Healthcare" },
    { label: "Women Empowerment", value: "Women Empowerment" },
    { label: "Livelihood & Skills", value: "Livelihood & Skills" },
    { label: "Environment & Sustainability", value: "Environment & Sustainability" },
    { label: "Hunger Relief", value: "Hunger Relief" },
    { label: "Other", value: "Other" },
  ];

  const paymentOptions = [
    { label: "All Payment Methods", value: "All" },
    { label: "UPI", value: "UPI" },
    { label: "Debit/Credit Card", value: "Debit/Credit Card" },
    { label: "PayPal", value: "PayPal" },
    { label: "Offline / Bank Transfer", value: "Offline / Bank Transfer" },
  ];

  const formattedTotalAmount = totalAmount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

  return (
    <div className="space-y-6">
      {/* Top Stat Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-stroke shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-dark-green/60 uppercase tracking-wider">
              Total Raised
            </p>
            <p className="text-2xl lg:text-3xl font-bold font-satoshi text-dark-green mt-1 flex items-baseline gap-1">
              <span className="text-xl text-dark-yellow font-normal">₹</span>
              {isLoading ? "..." : formattedTotalAmount}
            </p>
            <p className="text-[11px] text-dark-green/60 mt-1">Across all completed contributions</p>
          </div>
          <div className="p-3.5 rounded-xl bg-dark-yellow/15 text-dark-yellow border border-dark-yellow/30">
            <Coins className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stroke shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-dark-green/60 uppercase tracking-wider">
              Total Entries
            </p>
            <p className="text-2xl lg:text-3xl font-bold font-satoshi text-dark-green mt-1">
              {isLoading ? "..." : totalCount}
            </p>
            <p className="text-[11px] text-dark-green/60 mt-1">Total recorded donation logs</p>
          </div>
          <div className="p-3.5 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stroke shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-dark-green/60 uppercase tracking-wider">
              Completed
            </p>
            <p className="text-2xl lg:text-3xl font-bold font-satoshi text-emerald-700 mt-1">
              {isLoading ? "..." : completedCount}
            </p>
            <p className="text-[11px] text-emerald-600 mt-1">Successfully verified payments</p>
          </div>
          <div className="p-3.5 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stroke shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-dark-green/60 uppercase tracking-wider">
              Pending / Incomplete
            </p>
            <p className="text-2xl lg:text-3xl font-bold font-satoshi text-amber-700 mt-1">
              {isLoading ? "..." : pendingCount}
            </p>
            <p className="text-[11px] text-amber-600 mt-1">Awaiting confirmation or settlement</p>
          </div>
          <div className="p-3.5 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Action Bar & Search / Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-dark-green/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Donor Name, Email, Phone, Txn ID, or City..."
            className="w-full pl-10 pr-4 py-2 bg-beige border border-stroke hover:border-dark-yellow/60 rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 font-satoshi transition-colors focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Filters and CTA Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <AsgardSelect
            options={statusOptions}
            value={selectedStatusFilter}
            onChange={setSelectedStatusFilter}
            icon={<Filter className="w-3.5 h-3.5 text-dark-yellow" />}
          />

          <AsgardSelect
            options={categoryOptions}
            value={selectedCategoryFilter}
            onChange={setSelectedCategoryFilter}
          />

          <AsgardSelect
            options={paymentOptions}
            value={selectedPaymentFilter}
            onChange={setSelectedPaymentFilter}
          />

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-beige hover:bg-dark-yellow/15 border border-stroke text-dark-green hover:text-dark-green text-xs font-semibold font-satoshi transition-colors cursor-pointer"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-dark-yellow" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          {/* Refresh Button */}
          <button
            onClick={loadDonations}
            className="p-2 rounded-xl bg-beige hover:bg-dark-green/10 border border-stroke text-dark-green text-xs transition-colors cursor-pointer"
            title="Refresh donations"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin text-dark-yellow" : ""}`} />
          </button>

          {/* Record Manual / Offline Donation Button */}
          <button
            onClick={handleOpenCreate}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-dark-yellow to-rust-orange text-white text-xs font-bold font-satoshi shadow-md hover:brightness-110 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Record Offline Entry</span>
          </button>
        </div>
      </div>
    </div>
  );
}
