import React from "react";
import { motion } from "framer-motion";
import {
  Image as ImageIcon,
  Edit,
  Trash2,
  Eye,
  Loader2,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { MediaRecord } from "@/app/(asgard)/asgard/media/actions";

interface MediaTableProps {
  media: MediaRecord[];
  filteredMedia: MediaRecord[];
  isLoading: boolean;
  handleToggleActive: (item: MediaRecord) => void;
  handleOpenDetail: (item: MediaRecord) => void;
  handleOpenEdit: (item: MediaRecord) => void;
  handleOpenDelete: (item: MediaRecord) => void;
}

export default function MediaTable({
  media,
  filteredMedia,
  isLoading,
  handleToggleActive,
  handleOpenDetail,
  handleOpenEdit,
  handleOpenDelete,
}: MediaTableProps) {
  return (
    <div className="bg-white border border-stroke rounded-2xl shadow-sm overflow-hidden font-satoshi">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-beige border-b border-stroke text-[11px] font-semibold text-dark-green/70 uppercase tracking-wider">
              <th className="py-3.5 px-4">Media Preview & Title</th>
              <th className="py-3.5 px-4">Alt Text & Caption</th>
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
                  <p className="font-semibold text-xs">Loading media assets from Supabase...</p>
                </td>
              </tr>
            ) : filteredMedia.length > 0 ? (
              filteredMedia.map((item) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-beige/60 transition-colors group"
                >
                  {/* Preview & Title */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      {item.image_url ? (
                        <div className="w-16 h-14 shrink-0 rounded-xl overflow-hidden border border-stroke bg-gray-50 flex items-center justify-center">
                          <img
                            src={item.image_url}
                            alt={item.alt_text || item.title || "Media preview"}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-16 h-14 shrink-0 rounded-xl bg-dark-green/5 text-dark-green/40 flex flex-col items-center justify-center border border-stroke">
                          <ImageIcon className="w-5 h-5 mb-0.5 opacity-50" />
                          <span className="text-[8px] font-bold">No Image</span>
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-dark-green text-sm line-clamp-1 group-hover:text-dark-yellow transition-colors">
                          {item.title || <span className="text-dark-green/40 italic">Untitled Asset</span>}
                        </p>
                        <p className="text-[10px] text-dark-green/50 mt-0.5 font-mono">
                          ID: {item.id?.slice(0, 8)}...
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Alt Text & Caption */}
                  <td className="py-4 px-4 max-w-xs">
                    <div>
                      {item.caption ? (
                        <p className="text-xs text-dark-green/80 line-clamp-1 font-medium">
                          {item.caption}
                        </p>
                      ) : null}
                      {item.alt_text ? (
                        <p className="text-[11px] text-dark-green/50 line-clamp-1 italic mt-0.5">
                          Alt: {item.alt_text}
                        </p>
                      ) : !item.caption ? (
                        <span className="text-dark-green/40 text-[11px] italic">No caption or alt text</span>
                      ) : null}
                    </div>
                  </td>

                  {/* Display Order */}
                  <td className="py-4 px-4 whitespace-nowrap font-mono text-xs text-dark-green">
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg bg-dark-green/5 border border-stroke">
                      <ArrowUpDown className="w-3 h-3 text-dark-yellow" />
                      <span>{item.display_order ?? 0}</span>
                    </div>
                  </td>

                  {/* Active Status Toggle */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(item)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${
                        item.is_active
                          ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                          : "bg-slate-500/15 text-slate-700 border-slate-500/30"
                      }`}
                      title="Click to toggle Active status"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{item.is_active ? "Active" : "Inactive"}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenDetail(item)}
                        className="p-1.5 rounded-lg text-dark-green/70 hover:text-dark-green hover:bg-dark-green/10 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(item)}
                        className="p-1.5 rounded-lg text-dark-yellow hover:bg-dark-yellow/10 transition-colors cursor-pointer"
                        title="Edit Media"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(item)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Media"
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
                  <ImageIcon className="w-8 h-8 mx-auto mb-2 text-dark-green/30" />
                  <p className="font-semibold">No media items found.</p>
                  <p className="text-[11px] mt-1">Adjust your search or click "Upload New Media" to add one.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer Pagination Bar */}
      <div className="p-4 bg-beige border-t border-stroke flex items-center justify-between text-xs text-dark-green/70">
        <span>
          Showing <strong>{filteredMedia.length}</strong> of{" "}
          <strong>{media.length}</strong> media items
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
