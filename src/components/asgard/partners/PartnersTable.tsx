import React from "react";
import { motion } from "framer-motion";
import { Users, Globe, ExternalLink, Edit, Trash2, Eye, Loader2, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { PartnerRecord } from "@/app/(asgard)/asgard/partners/actions";

interface PartnersTableProps {
  partners: PartnerRecord[];
  filteredPartners: PartnerRecord[];
  isLoading: boolean;
  handleToggleActive: (ptr: PartnerRecord) => void;
  handleOpenDetail: (ptr: PartnerRecord) => void;
  handleOpenEdit: (ptr: PartnerRecord) => void;
  handleOpenDelete: (ptr: PartnerRecord) => void;
}

export default function PartnersTable({
  partners,
  filteredPartners,
  isLoading,
  handleToggleActive,
  handleOpenDetail,
  handleOpenEdit,
  handleOpenDelete,
}: PartnersTableProps) {
  return (
    <div className="bg-white border border-stroke rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-beige border-b border-stroke text-[11px] font-semibold text-dark-green/70 uppercase tracking-wider">
              <th className="py-3.5 px-4">Partner Logo & Name</th>
              <th className="py-3.5 px-4">Website URL</th>
              <th className="py-3.5 px-4">Display Order</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stroke/60 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-dark-green/50">
                  <Loader2 className="w-7 h-7 mx-auto mb-2 animate-spin text-dark-yellow" />
                  <p className="font-semibold text-xs">Loading partners from Supabase...</p>
                </td>
              </tr>
            ) : filteredPartners.length > 0 ? (
              filteredPartners.map((ptr) => (
                <motion.tr
                  key={ptr.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-beige/60 transition-colors group"
                >
                  {/* Logo & Name */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {ptr.logo_url ? (
                        <img
                          src={ptr.logo_url}
                          alt={ptr.name || "Partner"}
                          className="w-10 h-10 rounded-xl object-contain border border-stroke p-1 bg-white shrink-0"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-dark-green/10 text-dark-green flex items-center justify-center shrink-0 border border-stroke font-bold">
                          {ptr.name ? ptr.name.slice(0, 2).toUpperCase() : "PT"}
                        </div>
                      )}
                      <div>
                        <p className="font-bold text-dark-green group-hover:text-dark-yellow transition-colors">
                          {ptr.name || "Unnamed Partner"}
                        </p>
                        <p className="text-[10px] text-dark-green/50">ID: {ptr.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Website URL */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {ptr.website_url ? (
                      <a
                        href={ptr.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-dark-yellow hover:underline text-xs font-medium"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span className="max-w-[200px] truncate">{ptr.website_url}</span>
                        <ExternalLink className="w-3 h-3 text-dark-green/40" />
                      </a>
                    ) : (
                      <span className="text-dark-green/40 text-[11px]">—</span>
                    )}
                  </td>

                  {/* Display Order */}
                  <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-dark-green">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-dark-green/5 border border-stroke">
                      <ArrowUpDown className="w-3 h-3 text-dark-yellow" />
                      <span>{ptr.display_order ?? 0}</span>
                    </div>
                  </td>

                  {/* Active Status Toggle */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(ptr)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                        ptr.is_active
                          ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                          : "bg-slate-500/15 text-slate-700 border-slate-500/30"
                      }`}
                      title="Click to toggle Active status"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{ptr.is_active ? "Active" : "Inactive"}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenDetail(ptr)}
                        className="p-1.5 rounded-lg text-dark-green/70 hover:text-dark-green hover:bg-dark-green/10 transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(ptr)}
                        className="p-1.5 rounded-lg text-dark-yellow hover:bg-dark-yellow/10 transition-colors"
                        title="Edit Partner"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(ptr)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                        title="Delete Partner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-dark-green/50">
                  <Users className="w-8 h-8 mx-auto mb-2 text-dark-green/30" />
                  <p className="font-semibold">No partners found</p>
                  <p className="text-xs">
                    Click <strong>"Create New Partner"</strong> to add your first partner record!
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination Bar */}
      <div className="p-4 bg-beige border-t border-stroke flex items-center justify-between text-xs text-dark-green/70">
        <span>
          Showing <strong>{filteredPartners.length}</strong> of{" "}
          <strong>{partners.length}</strong> partners
        </span>
        <div className="flex items-center gap-2">
          <button
            disabled
            className="p-1.5 rounded-lg border border-stroke bg-white opacity-50 cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="px-2 font-semibold">Page 1 of 1</span>
          <button
            disabled
            className="p-1.5 rounded-lg border border-stroke bg-white opacity-50 cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
