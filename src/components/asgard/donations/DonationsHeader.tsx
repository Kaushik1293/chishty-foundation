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
  AlertCircle,
  XCircle,
  Filter,
  RotateCcw,
} from "lucide-react";
import AsgardSelect from "../AsgardSelect";

interface DonationsHeaderProps {
  totalCount: number;
  totalAmount: number;
  successCount: number;
  pendingCount: number;
  failedCount: number;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (val: string) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (val: string) => void;
  categories: string[];
  isLoading: boolean;
  loadDonations: () => void;
  handleOpenCreate: () => void;
  handleExportCSV: () => void;
  handleResetFilters: () => void;
}

export default function DonationsHeader({
  totalCount,
  totalAmount,
  successCount,
  pendingCount,
  failedCount,
  searchTerm,
  setSearchTerm,
  selectedStatusFilter,
  setSelectedStatusFilter,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  categories,
  isLoading,
  loadDonations,
  handleOpenCreate,
  handleExportCSV,
  handleResetFilters,
}: DonationsHeaderProps) {
  const statusOptions = [
    { label: "All Status", value: "All" },
    { label: "Success", value: "Success" },
    { label: "Pending", value: "Pending" },
    { label: "Failed", value: "Failed" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  const categoryOptions = [
    { label: "All Causes", value: "All" },
    ...categories.map((c) => ({ label: c, value: c })),
  ];

  const formattedTotalAmount = totalAmount.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });

  const hasActiveFilters =
    searchTerm.trim() !== "" ||
    selectedStatusFilter !== "All" ||
    selectedCategoryFilter !== "All";

  return (
    <div className="space-y-6">
      {/* 5 KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* 1. Total Amount Received */}
        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-dark-green/60 uppercase tracking-wider">
              Total Amount Received
            </p>
            <div className="p-2 rounded-xl bg-dark-yellow/15 text-dark-yellow border border-dark-yellow/30">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold font-satoshi text-dark-green flex items-baseline gap-1">
              <span className="text-lg text-dark-yellow font-normal">₹</span>
              {isLoading ? "..." : formattedTotalAmount}
            </p>
            <p className="text-[10px] text-dark-green/50 mt-0.5">Successful contributions only</p>
          </div>
        </div>

        {/* 2. Total Donations */}
        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-dark-green/60 uppercase tracking-wider">
              Total Donations
            </p>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 border border-blue-500/20">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold font-satoshi text-dark-green">
              {isLoading ? "..." : totalCount}
            </p>
            <p className="text-[10px] text-dark-green/50 mt-0.5">All recorded transactions</p>
          </div>
        </div>

        {/* 3. Successful Donations */}
        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-dark-green/60 uppercase tracking-wider">
              Successful
            </p>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold font-satoshi text-emerald-700">
              {isLoading ? "..." : successCount}
            </p>
            <p className="text-[10px] text-emerald-600 mt-0.5">Payment verified</p>
          </div>
        </div>

        {/* 4. Pending Donations */}
        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-dark-green/60 uppercase tracking-wider">
              Pending
            </p>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold font-satoshi text-amber-700">
              {isLoading ? "..." : pendingCount}
            </p>
            <p className="text-[10px] text-amber-600 mt-0.5">Awaiting completion</p>
          </div>
        </div>

        {/* 5. Failed / Cancelled Donations */}
        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-semibold text-dark-green/60 uppercase tracking-wider">
              Failed / Cancelled
            </p>
            <div className="p-2 rounded-xl bg-red-500/10 text-red-600 border border-red-500/20">
              <XCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold font-satoshi text-red-700">
              {isLoading ? "..." : failedCount}
            </p>
            <p className="text-[10px] text-red-500 mt-0.5">Unsuccessful attempts</p>
          </div>
        </div>
      </div>

      {/* Action Bar & Search / Filters */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-stroke shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-dark-green/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search donations..."
            className="w-full pl-10 pr-4 py-2 bg-beige border border-stroke hover:border-dark-yellow/60 rounded-xl text-xs text-dark-green placeholder:text-dark-green/40 font-satoshi transition-colors focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Filters and CTA Actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Payment Status Filter */}
          <AsgardSelect
            options={statusOptions}
            value={selectedStatusFilter}
            onChange={setSelectedStatusFilter}
            icon={<Filter className="w-3.5 h-3.5 text-dark-yellow" />}
          />

          {/* Cause / Category Filter */}
          <AsgardSelect
            options={categoryOptions}
            value={selectedCategoryFilter}
            onChange={setSelectedCategoryFilter}
          />

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-beige hover:bg-stone-200 border border-stroke text-dark-green text-xs font-semibold font-satoshi transition-colors cursor-pointer"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3 text-dark-green/60" />
              <span>Reset</span>
            </button>
          )}

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-beige hover:bg-dark-yellow/15 border border-stroke text-dark-green text-xs font-semibold font-satoshi transition-colors cursor-pointer"
            title="Download CSV report"
          >
            <Download className="w-3.5 h-3.5 text-dark-yellow" />
            <span className="hidden sm:inline">Export</span>
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
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-linear-to-r from-dark-yellow to-rust-orange text-white text-xs font-bold font-satoshi shadow-md hover:brightness-110 transition-all cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Donation</span>
          </button>
        </div>
      </div>
    </div>
  );
}
