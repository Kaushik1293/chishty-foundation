import React from "react";
import { Plus, Search, Filter, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

interface EventsHeaderProps {
  eventsCount: number;
  activeCount: number;
  featuredCount: number;
  draftCount: number;
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  selectedStatusFilter: string;
  setSelectedStatusFilter: (val: string) => void;
  selectedFeaturedFilter: string;
  setSelectedFeaturedFilter: (val: string) => void;
  isLoading: boolean;
  loadEvents: () => void;
  handleOpenCreate: () => void;
}

export default function EventsHeader({
  eventsCount,
  activeCount,
  featuredCount,
  draftCount,
  searchTerm,
  setSearchTerm,
  selectedStatusFilter,
  setSelectedStatusFilter,
  selectedFeaturedFilter,
  setSelectedFeaturedFilter,
  isLoading,
  loadEvents,
  handleOpenCreate,
}: EventsHeaderProps) {
  return (
    <div className="space-y-8 font-satoshi">
      {/* Header Summary & Primary Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-satoshi text-dark-green">
            Events
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
            {eventsCount}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-emerald-700 uppercase">
            Active / Published
          </p>
          <p className="text-2xl font-bold font-satoshi text-emerald-700 mt-0.5">
            {activeCount}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-amber-700 uppercase">
            Featured Events
          </p>
          <p className="text-2xl font-bold font-satoshi text-amber-700 mt-0.5">
            {featuredCount}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm">
          <p className="text-[11px] font-semibold text-slate-600 uppercase">
            Draft / Inactive
          </p>
          <p className="text-2xl font-bold font-satoshi text-slate-600 mt-0.5">
            {draftCount}
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
    </div>
  );
}
