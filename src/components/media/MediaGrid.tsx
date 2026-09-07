"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image as ImageIcon,
  Search,
  X,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
} from "lucide-react";
import { MediaRecord } from "@/app/(asgard)/asgard/media/actions";
import { formatDateDDMMYYYY } from "@/src/utils/formatDate";

interface MediaGridProps {
  mediaItems: MediaRecord[];
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MediaGrid({ mediaItems }: MediaGridProps) {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showCaption, setShowCaption] = useState<boolean>(true);
  const [direction, setDirection] = useState<number>(0);

  // Filtered Media
  const filteredMedia = useMemo(() => {
    return mediaItems.filter((item) => {
      const titleMatch = item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const captionMatch = item.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      const altMatch = item.alt_text?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false;
      return searchTerm === "" || titleMatch || captionMatch || altMatch;
    });
  }, [mediaItems, searchTerm]);

  // Current active item
  const currentItem = activeIndex !== null && filteredMedia[activeIndex] ? filteredMedia[activeIndex] : null;

  // Open Lightbox
  const handleOpenLightbox = (index: number) => {
    setActiveIndex(index);
    setZoomLevel(1);
    setDirection(0);
  };

  // Close Lightbox
  const handleCloseLightbox = useCallback(() => {
    setActiveIndex(null);
    setZoomLevel(1);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    setIsFullscreen(false);
  }, []);

  // Next image
  const handleNext = useCallback(() => {
    if (filteredMedia.length === 0 || activeIndex === null) return;
    setDirection(1);
    setZoomLevel(1);
    setActiveIndex((prev) => (prev! + 1) % filteredMedia.length);
  }, [filteredMedia.length, activeIndex]);

  // Prev image
  const handlePrev = useCallback(() => {
    if (filteredMedia.length === 0 || activeIndex === null) return;
    setDirection(-1);
    setZoomLevel(1);
    setActiveIndex((prev) => (prev! - 1 + filteredMedia.length) % filteredMedia.length);
  }, [filteredMedia.length, activeIndex]);

  // Toggle Zoom
  const handleToggleZoom = () => {
    setZoomLevel((prev) => {
      if (prev === 1) return 1.5;
      if (prev === 1.5) return 2.2;
      return 1;
    });
  };

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return;

      if (e.key === "Escape") {
        handleCloseLightbox();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "+" || e.key === "=") {
        handleToggleZoom();
      } else if (e.key === "f" || e.key === "F") {
        handleToggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, handleCloseLightbox, handleNext, handlePrev]);

  // Prevent scroll when lightbox is open
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIndex]);

  return (
    <section className="container mx-auto px-4 sm:px-6 mb-32 mt-8 font-satoshi">
      {/* Top Filter & Counter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <p className="text-xs md:text-sm font-semibold text-dark-green/70">
          Showing <span className="text-dark-green font-bold">{filteredMedia.length}</span> media archive items
        </p>

        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-dark-green/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search media..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#ECE2CB] rounded-full text-xs text-dark-green placeholder-dark-green/40 focus:outline-none focus:border-dark-yellow shadow-xs"
          />
        </div>
      </div>

      {/* 4-Column Photo Grid (Matching User Screenshot 1) */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5"
      >
        <AnimatePresence>
          {filteredMedia.length > 0 ? (
            filteredMedia.map((item, index) => (
              <motion.div
                layout
                key={item.id || index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-30px" }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: EASE, delay: Math.min(index * 0.03, 0.3) }}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-dark-green/5 border border-[#ECE2CB]/70 shadow-xs hover:shadow-xl hover:border-dark-yellow/80 transition-all duration-500 cursor-pointer"
                onClick={() => handleOpenLightbox(index)}
              >
                {/* Photo Element */}
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.alt_text || item.title || "Chishty Foundation Media"}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-600 ease-out"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-dark-green/30 bg-dark-green/5">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-xs">Chishty Media</span>
                  </div>
                )}

                {/* Subtle Hover Gradient Overlay with Title preview */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  {item.title && (
                    <p className="text-white font-cormorant font-bold text-lg leading-tight truncate drop-shadow-md">
                      {item.title}
                    </p>
                  )}
                  {item.created_at && (
                    <p className="text-white/80 font-mono text-[10px] mt-0.5">
                      {formatDateDDMMYYYY(item.created_at)}
                    </p>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-dark-green/60">
              <ImageIcon className="w-10 h-10 mx-auto mb-3 opacity-40 text-dark-green" />
              <p className="font-semibold text-base">No media items found</p>
              <p className="text-xs text-dark-green/60 mt-1">Try searching with a different term.</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Full-Screen Lightbox Viewer (Matching User Screenshot 2) */}
      <AnimatePresence>
        {activeIndex !== null && currentItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center select-none">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseLightbox}
              className="fixed inset-0 bg-black/92 backdrop-blur-md"
            />

            {/* Top Toolbar */}
            <div className="absolute top-0 left-0 right-0 z-20 h-16 px-4 sm:px-6 flex items-center justify-between text-white bg-gradient-to-b from-black/80 to-transparent">
              {/* Counter (e.g. 1 / 36) */}
              <div className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white/90 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                {activeIndex + 1} / {filteredMedia.length}
              </div>

              {/* Action Buttons: Fullscreen, Zoom, Info, Download, Close */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Info toggle */}
                {(currentItem.title || currentItem.caption) && (
                  <button
                    type="button"
                    onClick={() => setShowCaption((prev) => !prev)}
                    className={`h-9 w-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      showCaption ? "bg-white/20 text-dark-yellow" : "bg-white/5 hover:bg-white/15 text-white/80"
                    }`}
                    title="Toggle Caption"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                )}

                {/* Zoom toggle */}
                <button
                  type="button"
                  onClick={handleToggleZoom}
                  className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  title={zoomLevel > 1 ? `Zoom (${zoomLevel}x) - Click to Reset` : "Zoom In"}
                >
                  {zoomLevel > 1 ? <ZoomOut className="w-4 h-4 text-dark-yellow" /> : <ZoomIn className="w-4 h-4" />}
                </button>

                {/* Fullscreen toggle */}
                <button
                  type="button"
                  onClick={handleToggleFullscreen}
                  className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer hidden sm:flex"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>

                {/* Download / Open original */}
                {currentItem.image_url && (
                  <a
                    href={currentItem.image_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="h-9 w-9 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                    title="Open Full Resolution"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                )}

                {/* Close Button */}
                <button
                  type="button"
                  onClick={handleCloseLightbox}
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-all cursor-pointer ml-1"
                  title="Close (Esc)"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Left Chevron Button */}
            {filteredMedia.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 sm:left-6 z-20 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-black/40 hover:bg-black/80 text-white/90 hover:text-white flex items-center justify-center border border-white/15 backdrop-blur-md transition-all duration-200 hover:scale-108 cursor-pointer shadow-lg"
                title="Previous (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            {/* Right Chevron Button */}
            {filteredMedia.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 sm:right-6 z-20 h-11 w-11 sm:h-12 sm:w-12 rounded-full bg-black/40 hover:bg-black/80 text-white/90 hover:text-white flex items-center justify-center border border-white/15 backdrop-blur-md transition-all duration-200 hover:scale-108 cursor-pointer shadow-lg"
                title="Next (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
            )}

            {/* Main Centered Image */}
            <div
              className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-12 md:p-16 overflow-hidden"
              onClick={handleCloseLightbox}
            >
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentItem.id || activeIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -40 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="relative flex items-center justify-center max-h-[82vh] max-w-[92vw]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {currentItem.image_url ? (
                    <img
                      src={currentItem.image_url}
                      alt={currentItem.alt_text || currentItem.title || "Chishty Media Image"}
                      className={`max-h-[78vh] sm:max-h-[82vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-transform duration-300 ${
                        zoomLevel > 1 ? "cursor-grab" : "cursor-zoom-in"
                      }`}
                      style={{
                        transform: `scale(${zoomLevel})`,
                      }}
                      onClick={handleToggleZoom}
                    />
                  ) : (
                    <div className="p-12 bg-white/10 rounded-2xl text-white text-center">
                      <ImageIcon className="w-16 h-16 mx-auto mb-2 opacity-50" />
                      <p>Image not available</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom Caption Overlay */}
            <AnimatePresence>
              {showCaption && (currentItem.title || currentItem.caption) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-auto sm:max-w-2xl z-20 mx-auto bg-black/75 backdrop-blur-md border border-white/15 rounded-2xl px-6 py-3.5 text-white shadow-2xl"
                >
                  {currentItem.title && (
                    <h3 className="font-cormorant font-bold text-lg sm:text-xl text-white leading-tight">
                      {currentItem.title}
                    </h3>
                  )}
                  {currentItem.caption && (
                    <p className="text-white/80 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2">
                      {currentItem.caption}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
