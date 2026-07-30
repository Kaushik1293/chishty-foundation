import React from "react";
import { motion } from "framer-motion";
import { Calendar, Edit, Eye, Loader2, Star, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { Event as SupabaseEvent } from "@/app/(web)/action";
import { formatDateDDMMYYYY } from "@/src/utils/formatDate";

interface EventsTableProps {
  events: SupabaseEvent[];
  filteredEvents: SupabaseEvent[];
  isLoading: boolean;
  handleToggleFeatured: (evt: SupabaseEvent) => void;
  handleToggleActive: (evt: SupabaseEvent) => void;
  handleOpenDetail: (evt: SupabaseEvent) => void;
  handleOpenEdit: (evt: SupabaseEvent) => void;
  handleOpenDelete: (evt: SupabaseEvent) => void;
}

export default function EventsTable({
  events,
  filteredEvents,
  isLoading,
  handleToggleFeatured,
  handleToggleActive,
  handleOpenDetail,
  handleOpenEdit,
  handleOpenDelete,
}: EventsTableProps) {
  return (
    <div className="bg-white border border-stroke rounded-2xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-beige border-b border-stroke text-[11px] font-semibold text-dark-green/70 uppercase tracking-wider">
              <th className="py-3.5 px-4">Event Banner & Title</th>
              <th className="py-3.5 px-4">Slug</th>
              <th className="py-3.5 px-4">Event Date</th>
              <th className="py-3.5 px-4">Featured</th>
              <th className="py-3.5 px-4">Status</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stroke/60 text-xs">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-dark-green/50">
                  <Loader2 className="w-7 h-7 mx-auto mb-2 animate-spin text-dark-yellow" />
                  <p className="font-semibold text-xs">Loading events...</p>
                </td>
              </tr>
            ) : filteredEvents.length > 0 ? (
              filteredEvents.map((evt) => (
                <motion.tr
                  key={evt.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-beige/60 transition-colors group"
                >
                  {/* Banner & Title */}
                  <td className="py-4 px-4 max-w-xs">
                    <div className="flex items-center gap-3">
                      {evt.banner_image ? (
                        <img
                          src={evt.banner_image}
                          alt={evt.title || "Event"}
                          className="w-14 h-12 rounded-xl object-cover border border-stroke shrink-0 bg-dark-green/5"
                        />
                      ) : (
                        <div className="w-14 h-12 rounded-xl bg-dark-green/10 text-dark-green flex items-center justify-center shrink-0 border border-stroke">
                          <Calendar className="w-5 h-5 text-dark-yellow" />
                        </div>
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-dark-green truncate group-hover:text-dark-yellow transition-colors">
                            {evt.title || "Untitled Event"}
                          </p>
                          {evt.is_featured && (
                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500 shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-dark-green/60 line-clamp-1 mt-0.5">
                          {evt.short_description || evt.description || "No description"}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Slug */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-dark-green/5 border border-stroke text-dark-green/80">
                      {evt.slug || "—"}
                    </span>
                  </td>

                  {/* Event Date */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1.5 text-dark-green font-medium font-mono text-xs">
                      <Calendar className="w-3.5 h-3.5 text-dark-yellow" />
                      <span>{formatDateDDMMYYYY(evt.event_date)}</span>
                    </div>
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleFeatured(evt)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold border transition-all cursor-pointer ${evt.is_featured
                        ? "bg-amber-500/15 text-amber-800 border-amber-500/40"
                        : "bg-gray-100 text-gray-600 border-gray-300"
                        }`}
                      title="Click to toggle Featured status"
                    >
                      <Star className={`w-3 h-3 ${evt.is_featured ? "fill-amber-500 text-amber-500" : ""}`} />
                      <span>{evt.is_featured ? "Featured" : "Standard"}</span>
                    </button>
                  </td>

                  {/* Active Status Toggle */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleActive(evt)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border transition-all cursor-pointer ${evt.is_active
                        ? "bg-emerald-500/15 text-emerald-700 border-emerald-500/30"
                        : "bg-slate-500/15 text-slate-700 border-slate-500/30"
                        }`}
                      title="Click to toggle Active / Draft status"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span>{evt.is_active ? "Active" : "Draft"}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenDetail(evt)}
                        className="p-1.5 rounded-lg text-dark-green/70 hover:text-dark-green hover:bg-dark-green/10 transition-colors cursor-pointer"
                        title="View Event Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(evt)}
                        className="p-1.5 rounded-lg text-dark-yellow hover:bg-dark-yellow/10 transition-colors cursor-pointer"
                        title="Edit Event"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleOpenDelete(evt)}
                        className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Delete Event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-12 text-center text-dark-green/50">
                  <Calendar className="w-8 h-8 mx-auto mb-2 text-dark-green/30" />
                  <p className="font-semibold">No events found</p>
                  <p className="text-xs">
                    Click <strong>"Create New Event"</strong> to add your first event record!
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
          Showing <strong>{filteredEvents.length}</strong> of{" "}
          <strong>{events.length}</strong> events
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
