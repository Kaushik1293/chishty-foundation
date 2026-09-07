"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  FileText,
  ExternalLink,
  Calendar,
  Search,
  Download,
  X,
  Eye,
} from "lucide-react";
import { InsightRecord } from "@/app/(asgard)/asgard/insights/actions";
import { formatDateDDMMYYYY } from "@/src/utils/formatDate";

interface InsightsGridProps {
  insights: InsightRecord[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function InsightsGrid({ insights }: InsightsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeModalInsight, setActiveModalInsight] = useState<InsightRecord | null>(null);

  // Dynamic Categories from data
  const categories = useMemo(() => {
    const set = new Set<string>();
    insights.forEach((i) => {
      if (i.category && i.category.trim()) {
        set.add(i.category.trim());
      }
    });
    return ["All", ...Array.from(set)];
  }, [insights]);

  // Filtered Insights
  const filteredInsights = useMemo(() => {
    return insights.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const descMatch = item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const catMatch = item.category?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const matchesSearch = searchTerm === "" || titleMatch || descMatch || catMatch;

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [insights, searchTerm, selectedCategory]);

  return (
    <section className="container mx-auto px-5 md:px-6 mb-32 mt-12 font-satoshi">
      {/* Controls Bar: Categories & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-14">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${isSelected
                  ? "bg-dark-green text-white shadow-md"
                  : "bg-white text-dark-green/75 border border-[#ECE2CB] hover:border-dark-yellow hover:text-dark-green"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-dark-green/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search newsletters & insights..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#ECE2CB] rounded-full text-xs text-dark-green placeholder-dark-green/40 focus:outline-none focus:border-dark-yellow shadow-xs"
          />
        </div>
      </div>

      {/* Newsletter & Publication Cards Grid (Exact Style from Reference) */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        <AnimatePresence>
          {filteredInsights.length > 0 ? (
            filteredInsights.map((insight, index) => (
              <motion.article
                layout
                key={insight.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
                className="group relative bg-[#FAF8F3] hover:bg-white rounded-3xl p-6 sm:p-7 border border-[#E9E0D0] shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col items-center cursor-pointer"
                onClick={() => setActiveModalInsight(insight)}
              >
                {/* Poster / Newsletter Frame */}
                <div className="w-full aspect-[1/1.38] rounded-2xl overflow-hidden relative shadow-md flex flex-col group-hover:scale-[1.02] transition-all duration-500 ease-out">
                  {/* Inner Decorative Golden Border */}
                  <div className="w-full h-full rounded-xl overflow-hidden relative flex flex-col">
                    {insight.image_url ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <img
                          src={insight.image_url}
                          alt={insight.title || "Newsletter Cover"}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-40 group-hover:opacity-10 transition-opacity duration-300" />
                      </div>
                    ) : (
                      /* Styled Newsletter Template when no image is uploaded */
                      <div className="w-full h-full p-6 flex flex-col justify-between text-center relative bg-gradient-to-b from-[#181818] via-[#111111] to-[#0A0A0A]">
                        {/* Top Header */}
                        <div>
                          <p className="text-[10px] sm:text-[11px] font-bold text-[#C5A059] tracking-[0.25em] uppercase font-satoshi">
                            CHISHTY FOUNDATION
                          </p>
                          <div className="w-12 h-px bg-[#C5A059]/60 mx-auto my-2" />
                          <p className="text-[9px] text-[#C5A059]/80 uppercase tracking-widest font-mono">
                            {insight.category || "NEWSLETTER • SPECIAL EDITION"}
                          </p>
                        </div>

                        {/* Center Title & Graphic */}
                        <div className="py-4 my-auto">
                          <div className="w-16 h-16 rounded-full border border-[#C5A059]/40 mx-auto flex items-center justify-center mb-3 bg-[#C5A059]/5">
                            <BookOpen className="w-7 h-7 text-[#C5A059]" />
                          </div>
                          <h4 className="font-cormorant font-bold text-xl sm:text-2xl text-white uppercase tracking-wide leading-snug line-clamp-3">
                            {insight.title}
                          </h4>
                          {insight.description && (
                            <p className="font-cormorant italic text-xs text-[#C5A059]/90 mt-2 line-clamp-2 px-2">
                              "{insight.description}"
                            </p>
                          )}
                        </div>

                        {/* Bottom Sign-off */}
                        <div className="border-t border-[#C5A059]/30 pt-3">
                          <p className="text-[10px] text-[#C5A059] font-medium tracking-wider">
                            Haji Syed Salman Chishty
                          </p>
                          <p className="text-[8px] text-white/50 tracking-widest uppercase mt-0.5">
                            AJMER SHARIF • WORLD SUFI FORUM
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Category Pill Overlaid at top */}
                    {insight.category && (
                      <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-[#C5A059]/40 text-[10px] font-bold text-[#C5A059] uppercase tracking-wider">
                        {insight.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Title Label (Exactly matching reference) */}
                <div className="w-full mt-5 px-1 text-center">
                  <h3 className="font-satoshi font-bold text-base sm:text-lg text-dark-green group-hover:text-dark-yellow transition-colors leading-snug line-clamp-2">
                    {insight.title || "Untitled Insight"}
                  </h3>
                  {insight.created_at && (
                    <p className="text-[11px] text-dark-green/50 mt-1 font-mono">
                      {formatDateDDMMYYYY(insight.created_at)}
                    </p>
                  )}
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-16 text-center text-dark-green/60">
              <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-40 text-dark-green" />
              <p className="font-semibold text-base">No newsletters or insights found</p>
              <p className="text-xs text-dark-green/60 mt-1">Try selecting another category or clearing your search filter.</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Full Newsletter / Insight Reader Lightbox Modal */}
      <AnimatePresence>
        {activeModalInsight && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalInsight(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative z-10 max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#ECE2CB] my-8 max-h-[88vh] flex flex-col"
            >
              {/* Modal Cover Header */}
              {activeModalInsight.image_url ? (
                <div className="relative h-72 sm:h-80 w-full bg-[#111111] shrink-0 flex items-center justify-center border-b border-[#C5A059]/30">
                  <img
                    src={activeModalInsight.image_url}
                    alt={activeModalInsight.title || "Newsletter cover"}
                    className="w-full h-full object-contain bg-black/40"
                  />
                  <button
                    type="button"
                    onClick={() => setActiveModalInsight(null)}
                    className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  {activeModalInsight.category && (
                    <span className="absolute bottom-4 left-4 px-3.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-[#C5A059]/40 text-xs font-bold text-[#C5A059] uppercase shadow-md">
                      {activeModalInsight.category}
                    </span>
                  )}
                </div>
              ) : (
                <div className="p-6 bg-[#141414] border-b border-[#C5A059]/30 flex justify-between items-center text-white">
                  <div>
                    <span className="px-3 py-1 rounded-full bg-[#C5A059]/20 text-[#C5A059] border border-[#C5A059]/40 text-xs font-bold uppercase">
                      {activeModalInsight.category || "CHISHTY FOUNDATION PUBLICATION"}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveModalInsight(null)}
                    className="p-1 rounded-full text-white/70 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-4">
                {activeModalInsight.created_at && (
                  <div className="flex items-center gap-1.5 text-xs text-dark-yellow font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Published on {formatDateDDMMYYYY(activeModalInsight.created_at)}</span>
                  </div>
                )}

                <h2 className="font-cormorant font-bold text-2xl sm:text-3xl text-dark-green leading-tight">
                  {activeModalInsight.title}
                </h2>

                <div className="w-16 h-1 bg-linear-to-r from-dark-yellow to-rust-orange rounded-full" />

                <p className="text-dark-green/85 text-sm sm:text-base leading-relaxed whitespace-pre-wrap pt-2 font-satoshi">
                  {activeModalInsight.description}
                </p>

                {/* Attached Document Download Section */}
                {activeModalInsight.document_url && (
                  <div className="p-4 rounded-2xl bg-beige border border-[#ECE2CB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-dark-yellow/20 text-dark-green flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-dark-yellow" />
                      </div>
                      <div>
                        <p className="font-bold text-dark-green text-xs sm:text-sm">
                          Attached Newsletter / Publication
                        </p>
                        <p className="text-[11px] text-dark-green/60">
                          Complete document available for download
                        </p>
                      </div>
                    </div>

                    <a
                      href={activeModalInsight.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl bg-dark-green hover:bg-dark-green/90 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md transition-colors shrink-0"
                    >
                      <Download className="w-3.5 h-3.5 text-dark-yellow" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-6 bg-beige/50 border-t border-[#ECE2CB] flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveModalInsight(null)}
                  className="px-6 py-2.5 rounded-xl bg-dark-green text-white text-xs font-semibold hover:bg-dark-green/90 transition-colors cursor-pointer"
                >
                  Close Newsletter
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
