"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { defaultGalleryItems, GALLERY_CATEGORIES, GalleryItem } from "@/src/data/defaultGallery";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function GalleryGrid() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "All"
      ? defaultGalleryItems
      : defaultGalleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="container mx-auto px-5 md:px-6 mb-32 mt-12 font-satoshi">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-14">
        {GALLERY_CATEGORIES.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-dark-green text-white shadow-md"
                  : "bg-white text-dark-green/75 border border-[#ECE2CB] hover:border-dark-yellow hover:text-dark-green"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Gallery Photos Grid */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence>
          {filteredItems.map((item, index) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: EASE, delay: index * 0.04 }}
              className="group relative bg-white rounded-3xl overflow-hidden border border-[#ECE2CB] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col cursor-pointer"
              onClick={() => setActiveModalItem(item)}
            >
              {/* Image Container */}
              <div className="relative h-64 md:h-72 w-full overflow-hidden bg-dark-green/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-green/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-bold text-dark-green uppercase tracking-wider shadow-sm">
                  {item.category}
                </span>
                <span className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 truncate">
                  📍 {item.location}
                </span>
              </div>

              {/* Caption Card */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-cormorant font-bold text-xl text-dark-green group-hover:text-dark-yellow transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-dark-green/70 text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {item.caption}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F2E7D6] flex items-center justify-between text-xs text-dark-green/60 font-medium">
                  <span>{item.location}</span>
                  <span className="text-dark-yellow font-semibold group-hover:translate-x-1 transition-transform">
                    View &rarr;
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {activeModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalItem(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative z-10 max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-[#ECE2CB]"
            >
              <div className="relative h-80 sm:h-96 w-full bg-dark-green/10">
                <img
                  src={activeModalItem.image}
                  alt={activeModalItem.title}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setActiveModalItem(null)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/60 text-white flex items-center justify-center text-lg hover:bg-black transition-colors cursor-pointer"
                >
                  &times;
                </button>
                <span className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold text-dark-green uppercase">
                  {activeModalItem.category}
                </span>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-cormorant font-bold text-2xl md:text-3xl text-dark-green mb-2">
                  {activeModalItem.title}
                </h3>
                <p className="text-xs text-dark-yellow font-bold uppercase tracking-wider mb-4">
                  📍 {activeModalItem.location}
                </p>
                <p className="text-dark-green/80 text-sm md:text-base leading-relaxed">
                  {activeModalItem.caption}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
