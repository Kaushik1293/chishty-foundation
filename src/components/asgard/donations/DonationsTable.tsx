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
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { DonationRecord } from "@/app/(asgard)/asgard/donations/actions";
import { formatDateDDMMYYYY } from "@/src/utils/formatDate";

interface DonationsTableProps {
  donations: DonationRecord[];
  filteredDonations: DonationRecord[];
  isLoading: boolean;
  handleOpenDetail: (donation: DonationRecord) => void;
  handleOpenStatusModal: (donation: DonationRecord) => void;
  handleOpenDelete: (donation: DonationRecord) => void;
}

export default function DonationsTable({
  donations,
  filteredDonations,
  isLoading,
  handleOpenDetail,
  handleOpenStatusModal,
  handleOpenDelete,
}: DonationsTableProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatusBadge = (status?: string) => {
    const s = (status || "pending").toLowerCase();
    switch (s) {
      case "completed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Completed
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3 h-3 text-amber-600" />
            Pending
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-100 text-red-800 border border-red-300">
            <AlertCircle className="w-3 h-3 text-red-600" />
            Failed
          </span>
        );
      case "refunded":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-800 border border-slate-300">
            <RotateCcw className="w-3 h-3 text-slate-600" />
            Refunded
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-beige text-dark-green/70 border border-stroke">
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

  return (
    <div className="bg-white border border-stroke rounded-2xl shadow-sm overflow-hidden font-satoshi">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-beige border-b border-stroke text-[11px] font-semibold text-dark-green/70 uppercase tracking-wider">
              <th className="py-3.5 px-4">Donor Information</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4">Cause / Category</th>
              <th className="py-3.5 px-4">Payment & Transaction</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stroke/60 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-dark-green/50">
                  <Loader2 className="w-7 h-7 mx-auto mb-2 animate-spin text-dark-yellow" />
                  <p className="font-semibold text-xs">Loading donations...</p>
                </td>
              </tr>
            ) : filteredDonations.length > 0 ? (
              filteredDonations.map((item, idx) => {
                const uniqueKey = String(item.id || item.payment_id || `don_${idx}`);
                const formattedAmount = Number(item.amount || 0).toLocaleString("en-IN");
                const formattedDate = item.created_at ? formatDateDDMMYYYY(item.created_at) : "—";

                return (
                  <motion.tr
                    key={uniqueKey}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-beige/60 transition-colors group"
                  >
                    {/* Donor Information */}
                    <td className="py-4 px-4 max-w-xs">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-bold text-dark-green text-sm group-hover:text-dark-yellow transition-colors">
                          {item.full_name || "Anonymous Donor"}
                        </span>
                        <div className="flex items-center gap-2 text-dark-green/70 text-[11px]">
                          <span className="flex items-center gap-1 truncate" title={item.email}>
                            <Mail className="w-3 h-3 text-dark-green/40 shrink-0" />
                            {item.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-dark-green/60 text-[11px]">
                          {item.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-dark-green/40 shrink-0" />
                              {item.phone}
                            </span>
                          )}
                          {item.city && (
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-dark-green/40 shrink-0" />
                              {item.city}
                              {item.country && item.country !== "India" ? `, ${item.country}` : ""}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-bold font-satoshi text-dark-green text-base">
                        ₹{formattedAmount}
                      </span>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-lg border font-medium text-[11px] ${getCategoryBadgeClass(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                    </td>

                    {/* Payment & Transaction */}
                    <td className="py-4 px-4 max-w-[200px]">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 font-medium text-dark-green">
                          <CreditCard className="w-3.5 h-3.5 text-dark-yellow shrink-0" />
                          <span>{item.payment_method || "Online"}</span>
                        </div>

                        {item.payment_id ? (
                          <div className="flex items-center gap-1">
                            <span
                              className="font-mono text-[10px] text-dark-green/70 truncate max-w-[130px] bg-dark-green/5 px-1.5 py-0.5 rounded border border-stroke"
                              title={item.payment_id}
                            >
                              {item.payment_id}
                            </span>
                            <button
                              onClick={() => handleCopy(item.payment_id!, `pid_${uniqueKey}`)}
                              className="p-1 text-dark-green/50 hover:text-dark-yellow transition-colors cursor-pointer"
                              title="Copy Payment ID"
                            >
                              {copiedId === `pid_${uniqueKey}` ? (
                                <Check className="w-3 h-3 text-emerald-600" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-dark-green/40 italic">
                            No payment ID
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5 text-dark-green/80 font-mono text-xs">
                        <Calendar className="w-3.5 h-3.5 text-dark-yellow" />
                        <span>{formattedDate}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        {/* View Receipt / Details */}
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="p-2 rounded-xl text-dark-green/70 hover:text-dark-green hover:bg-dark-green/5 transition-colors cursor-pointer"
                          title="View Details / Receipt"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {/* Change Status */}
                        <button
                          onClick={() => handleOpenStatusModal(item)}
                          className="p-2 rounded-xl text-dark-green/70 hover:text-dark-yellow hover:bg-dark-yellow/10 transition-colors cursor-pointer"
                          title="Update Status / Notes"
                        >
                          <Edit className="w-4 h-4" />
                        </button>

                        {/* Delete Entry */}
                        <button
                          onClick={() => handleOpenDelete(item)}
                          className="p-2 rounded-xl text-red-500/70 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Delete Record"
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
                <td colSpan={7} className="py-12 text-center text-dark-green/50">
                  <Receipt className="w-8 h-8 mx-auto mb-2 text-dark-green/30" />
                  <p className="font-semibold text-sm text-dark-green">No donation entries found</p>
                  <p className="text-xs text-dark-green/60 mt-0.5">
                    Try adjusting your search terms or filters above.
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 bg-beige/40 border-t border-stroke flex items-center justify-between text-xs text-dark-green/70">
        <span>
          Showing <strong className="text-dark-green">{filteredDonations.length}</strong> of{" "}
          <strong className="text-dark-green">{donations.length}</strong> donations
        </span>
      </div>
    </div>
  );
}
