import React from "react";
import { Plus, Search, Filter, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";
import AsgardSelect from "../AsgardSelect";

interface CausesHeaderProps {
  causesCount: number;
  activeCount: number;
  inactiveCount: number;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (val: string) => void;
  isLoading: boolean;
  loadCauses: () => void;
  handleOpenCreate: () => void;
}

export default function CausesHeader({
  causesCount,
  activeCount,
  inactiveCount,
  searchTerm,
  setSearchTerm,
  selectedStatusFilter,
  setSelectedStatusFilter,
  isLoading,
  loadCauses,
  handleOpenCreate,
}: CausesHeaderProps) {
  return (
    <div className="space-y-8 font-satoshi">
      {/* Header Summary & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-satoshi text-dark-green">
            Causes & Campaigns
          </h2>
          <p className="text-sm text-dark-green/75 font-normal mt-0.5">
            Create, view, update, and manage foundation causes and campaigns.
          </p>
        </div>

        <div className="flex items-center gap-3">

          <button
            onClick={loadCauses}
            className="p-2.5 rounded-xl bg-white border border-stroke text-dark-green hover:bg-dark-green/5 transition-colors cursor-pointer"
            title="Refresh causes"
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
            <span>Create New Cause</span>
          </motion.button>
        </div>
      </div>

      {/* Metrics Header Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-dark-green/60 uppercase">
            Total Causes
          </p>
          <p className="text-2xl font-bold font-satoshi text-dark-green mt-0.5">
            {causesCount}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-emerald-700 uppercase">
            Active Causes
          </p>
          <p className="text-2xl font-bold font-satoshi text-emerald-700 mt-0.5">
            {activeCount}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-slate-600 uppercase">
            Inactive Causes
          </p>
          <p className="text-2xl font-bold font-satoshi text-slate-600 mt-0.5">
            {inactiveCount}
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
            placeholder="Search causes by description..."
            className="w-full pl-10 pr-4 py-2 bg-beige border border-stroke rounded-xl text-xs text-dark-green placeholder-dark-green/40 focus:outline-none focus:border-dark-yellow"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <AsgardSelect
            value={selectedStatusFilter}
            onChange={(val) => setSelectedStatusFilter(val)}
            icon={<Filter className="w-3.5 h-3.5 text-dark-yellow" />}
            options={[
              { label: "All Statuses", value: "All" },
              { label: "Active Only", value: "Active" },
              { label: "Inactive Only", value: "Inactive" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
