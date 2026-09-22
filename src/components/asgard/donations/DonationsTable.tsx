"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Eye,
  Trash2,
  Copy,
  Check,
  Loader2,
  Calendar,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
  RotateCcw,
  Edit,
  Receipt,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from "lucide-react";
import { DonationRecord } from "@/app/(asgard)/asgard/donations/actions";
import { formatDateDDMMYYYY } from "@/src/utils/formatDate";

interface DonationsTableProps {
  donations: DonationRecord[];
  filteredDonations: DonationRecord[];
  isLoading: boolean;
  handleOpenDetail: (donation: DonationRecord) => void;
  handleOpenEdit: (donation: DonationRecord) => void;
  handleOpenDelete: (donation: DonationRecord) => void;
  handleResetFilters: () => void;
}

export default function DonationsTable({
  donations,
  filteredDonations,
  isLoading,
  handleOpenDetail,
  handleOpenEdit,
  handleOpenDelete,
  handleResetFilters,
}: DonationsTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status?: string) => {
    const s = (status || "pending").toLowerCase();
    switch (s) {
      case "success":
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            SUCCESS
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            PENDING
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-100 text-red-800 border border-red-300">
            <AlertCircle className="w-3 h-3 text-red-600" />
            FAILED
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-stone-100 text-stone-700 border border-stone-300">
            <RotateCcw className="w-3 h-3 text-stone-500" />
            CANCELLED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-beige text-dark-green/70 border border-stroke uppercase">
            {status}
          </span>
        );
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case "Education":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "Healthcare":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Women Empowerment":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "Livelihood & Skills":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Environment & Sustainability":
        return "bg-teal-50 text-teal-700 border-teal-200";
      case "Hunger Relief":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-stone-50 text-stone-700 border-stone-200";
    }
  };

  // Pagination calculation
  const totalItems = filteredDonations.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedDonations = filteredDonations.slice(startIndex, endIndex);

  return (
    <div className="bg-white border border-stroke rounded-2xl shadow-sm overflow-hidden font-satoshi">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-beige border-b border-stroke text-[11px] font-semibold text-dark-green/70 uppercase tracking-wider">
              <th className="py-3.5 px-4">Donor</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4">Donation Type</th>
              <th className="py-3.5 px-4">Payment Status</th>
              <th className="py-3.5 px-4">Payment Method</th>
              <th className="py-3.5 px-4">Transaction ID</th>
              <th className="py-3.5 px-4">Created At</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stroke/60 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={10} className="py-12 text-center text-dark-green/50">
                  <Loader2 className="w-7 h-7 mx-auto mb-2 animate-spin text-dark-yellow" />
                  <p className="font-semibold text-xs">Loading donations...</p>
                </td>
              </tr>
            ) : paginatedDonations.length > 0 ? (
              paginatedDonations.map((item, idx) => {
                const uniqueKey = String(item.id || item.transaction_id || `don_${idx}`);
                const formattedAmount = Number(item.amount || 0).toLocaleString("en-IN");
                const formattedDate = item.created_at ? formatDateDDMMYYYY(item.created_at) : "—";
                const displayName = item.donor_name || (item.is_anonymous ? "Anonymous" : "—");

                return (
                  <motion.tr
                    key={uniqueKey}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-beige/60 transition-colors group"
                  >
                    {/* 1. Donor */}
                    <td className="py-3.5 px-4 font-bold text-dark-green text-xs max-w-[140px] truncate">
                      <div className="flex items-center gap-1.5" title={displayName}>
                        <span className="truncate group-hover:text-dark-yellow transition-colors">
                          {displayName}
                        </span>
                        {item.is_anonymous && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-stone-100 text-stone-600 border border-stone-200">
                            Anon
                          </span>
                        )}
                      </div>
                    </td>

                    {/* 2. Email */}
                    <td className="py-3.5 px-4 text-dark-green/70 text-xs max-w-[150px] truncate">
                      {item.donor_email ? (
                        <span className="truncate block" title={item.donor_email}>
                          {item.donor_email}
                        </span>
                      ) : (
                        <span className="text-dark-green/30 italic">—</span>
                      )}
                    </td>

                    {/* 3. Phone */}
                    <td className="py-3.5 px-4 text-dark-green/80 font-mono text-xs whitespace-nowrap">
                      {item.donor_phone || <span className="text-dark-green/30 italic font-sans">—</span>}
                    </td>

                    {/* 4. Amount */}
                    <td className="py-3.5 px-4 whitespace-nowrap font-bold text-dark-green text-xs">
                      ₹{formattedAmount}
                    </td>

                    {/* 5. Donation Type */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-lg border font-medium text-[11px] ${getCategoryBadgeClass(
                          item.donation_type
                        )}`}
                      >
                        {item.donation_type || "General"}
                      </span>
                    </td>

                    {/* 6. Payment Status */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(item.payment_status)}
                    </td>

                    {/* 7. Payment Method */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-dark-green/80 font-medium text-xs">
                      {item.payment_method || "Online"}
                    </td>

                    {/* 8. Transaction ID */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {item.transaction_id ? (
                        <div className="flex items-center gap-1">
                          <span
                            className="font-mono text-[10px] text-dark-green/70 truncate max-w-[110px] bg-dark-green/5 px-1.5 py-0.5 rounded border border-stroke"
                            title={item.transaction_id}
                          >
                            {item.transaction_id}
                          </span>
                          <button
                            onClick={() => handleCopy(item.transaction_id!, `pid_${uniqueKey}`)}
                            className="p-1 text-dark-green/50 hover:text-dark-yellow transition-colors cursor-pointer"
                            title="Copy Transaction ID"
                          >
                            {copiedId === `pid_${uniqueKey}` ? (
                              <Check className="w-3 h-3 text-emerald-600" />
                            ) : (
                              <Copy className="w-3 h-3" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-dark-green/30 italic">—</span>
                      )}
                    </td>

                    {/* 9. Created At */}
                    <td className="py-3.5 px-4 whitespace-nowrap text-dark-green/70 font-mono text-xs">
                      {formattedDate}
                    </td>

                    {/* 10. Actions */}
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {/* View */}
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="p-1.5 rounded-lg text-dark-green/70 hover:text-dark-green hover:bg-dark-green/10 transition-colors cursor-pointer"
                          title="View Donation"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-dark-yellow hover:bg-dark-yellow/10 transition-colors cursor-pointer"
                          title="Edit Donation"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() => handleOpenDelete(item)}
                          className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Donation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={10} className="py-12 text-center text-dark-green/50">
                  <Receipt className="w-8 h-8 mx-auto mb-2 text-dark-green/30" />
                  {donations.length === 0 ? (
                    <>
                      <p className="font-semibold text-sm text-dark-green">No donations found</p>
                      <p className="text-xs text-dark-green/60 mt-0.5">
                        No donation records in the database yet.
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-semibold text-sm text-dark-green">No donations match your filters.</p>
                      <p className="text-xs text-dark-green/60 mt-0.5">
                        Try adjusting your search keyword or selected filter criteria.
                      </p>
                      <button
                        onClick={handleResetFilters}
                        className="mt-3 px-3 py-1.5 rounded-xl bg-beige border border-stroke text-dark-green font-semibold text-xs hover:bg-dark-yellow/15 transition-colors cursor-pointer"
                      >
                        Reset Filters
                      </button>
                    </>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 bg-beige border-t border-stroke flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dark-green/70">
        <span>
          Showing <strong>{totalItems > 0 ? startIndex + 1 : 0}</strong> to{" "}
          <strong>{endIndex}</strong> of <strong>{totalItems}</strong> donations
          {totalItems !== donations.length && (
            <span className="text-dark-green/50 ml-1">(filtered from {donations.length} total)</span>
          )}
        </span>

        {/* Pagination buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={safeCurrentPage <= 1}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stroke bg-white text-dark-green hover:bg-beige transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-medium"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Previous</span>
          </button>

          <div className="flex items-center gap-1 px-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((p) => p === 1 || p === totalPages || Math.abs(p - safeCurrentPage) <= 1)
              .map((pageNum, idx, arr) => {
                const prev = arr[idx - 1];
                const showEllipsis = prev && pageNum - prev > 1;

                return (
                  <React.Fragment key={pageNum}>
                    {showEllipsis && <span className="px-1 text-dark-green/40">...</span>}
                    <button
                      onClick={() => setCurrentPage(pageNum)}
                      className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        safeCurrentPage === pageNum
                          ? "bg-dark-yellow text-white"
                          : "bg-white border border-stroke text-dark-green hover:bg-beige"
                      }`}
                    >
                      {pageNum}
                    </button>
                  </React.Fragment>
                );
              })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={safeCurrentPage >= totalPages}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-stroke bg-white text-dark-green hover:bg-beige transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer font-medium"
          >
            <span>Next</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
