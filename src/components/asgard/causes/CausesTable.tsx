import React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon, Edit, Trash2, Eye, Loader2, ArrowUpDown } from "lucide-react";
import { CauseRecord } from "@/app/(asgard)/asgard/causes/actions";

interface CausesTableProps {
  causes: CauseRecord[];
  filteredCauses: CauseRecord[];
  isLoading: boolean;
  handleToggleActive: (cause: CauseRecord) => void;
  handleOpenDetail: (cause: CauseRecord) => void;
  handleOpenEdit: (cause: CauseRecord) => void;
  handleOpenDelete: (cause: CauseRecord) => void;
}

export default function CausesTable({
  causes,
  filteredCauses,
  isLoading,
  handleToggleActive,
  handleOpenDetail,
  handleOpenEdit,
  handleOpenDelete,
}: CausesTableProps) {
  return (
    <div className="bg-white border border-stroke rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-beige border-b border-stroke text-[11px] font-semibold text-dark-green/70 uppercase tracking-wider">
              <th className="py-3.5 px-4">Image & Description</th>
              <th className="py-3.5 px-4 w-28 text-center">Display Order</th>
              <th className="py-3.5 px-4 w-32">Status</th>
              <th className="py-3.5 px-4 w-32 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stroke/60 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={4} className="py-12 text-center text-dark-green/50">
                  <Loader2 className="w-7 h-7 mx-auto mb-2 animate-spin text-dark-yellow" />
                  <p className="font-semibold text-xs">Loading causes from Supabase...</p>
                </td>
              </tr>
            ) : filteredCauses.length > 0 ? (
              filteredCauses.map((cause) => (
                <motion.tr
                  key={cause.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-beige/60 transition-colors group"
                >
                  {/* Image & Description */}
                  <td className="py-4 px-4">
                    <div className="flex items-start gap-4">
                      {cause.image ? (
                        <div className="w-20 h-16 shrink-0 rounded-xl overflow-hidden border border-stroke bg-gray-50 flex items-center justify-center">
                          <img
                            src={cause.image}
                            alt="Cause"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-20 h-16 shrink-0 rounded-xl bg-dark-green/5 text-dark-green/40 flex flex-col items-center justify-center border border-stroke">
                          <ImageIcon className="w-6 h-6 mb-1 opacity-50" />
                          <span className="text-[9px] font-bold">No Image</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0 pt-1">
                        <p className="font-medium text-dark-green text-sm line-clamp-2">
                          {cause.description || <span className="text-dark-green/40 italic">No description provided</span>}
                        </p>
                        <p className="text-[10px] text-dark-green/50 mt-1">ID: {cause.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Display Order */}
                  <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-dark-green text-center">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-green/5 border border-stroke">
                      <ArrowUpDown className="w-3.5 h-3.5 text-dark-yellow" />
                      <span className="font-bold">{cause.display_order ?? 0}</span>
                    </div>
                  </td>

                  {/* Active Status Toggle */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(cause)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                        cause.is_active
                          ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                          : "bg-slate-500/15 text-slate-700 border-slate-500/30"
                      }`}
                      title="Click to toggle Active status"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{cause.is_active ? "Active" : "Inactive"}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenDetail(cause)}
                        className="p-1.5 rounded-lg text-dark-green/70 hover:text-dark-green hover:bg-dark-green/10 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(cause)}
                        className="p-1.5 rounded-lg text-dark-yellow hover:bg-dark-yellow/10 transition-colors"
                        title="Edit Cause"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(cause)}
                        className="p-1.5 rounded-lg text-red-500/70 hover:text-red-600 hover:bg-red-500/10 transition-colors"
                        title="Delete Cause"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-12 text-center text-dark-green/50">
                  <p className="font-semibold">No causes found.</p>
                  <p className="text-[11px] mt-1">Adjust your search or add a new cause.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
