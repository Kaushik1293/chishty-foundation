"use client";

import React from "react";
import { motion } from "framer-motion";

const WhatsAppIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.39a9.9 9.9 0 0 0 4.76 1.21h.01c5.46 0 9.9-4.45 9.9-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.02c-.24.68-1.42 1.3-1.96 1.38-.5.08-1.13.11-1.83-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.65.5.24.58.81 2 .88 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.14.17-.3.37-.43.5-.14.14-.29.29-.13.57.17.29.74 1.22 1.59 1.98 1.09.97 2.01 1.27 2.3 1.41.29.14.45.12.62-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.65.78 1.93.92.29.14.48.21.55.33.07.12.07.68-.17 1.36z" />
  </svg>
);

const WhatsAppFloatingButton = () => {
  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group">
      <motion.a
        href="https://wa.me/919829174973?text=Assalamu%20Alaikum%20%E2%80%94%20I%20would%20like%20to%20know%20more%20about%20Chishty%20Foundation."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Chishty Foundation on WhatsApp"
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.65)] transition-shadow duration-300"
      >
        {/* Subtle Ambient Pulse Ring */}
        <motion.span
          aria-hidden
          animate={{
            boxShadow: [
              "0 0 0 0px rgba(37,211,102,0.5)",
              "0 0 0 14px rgba(37,211,102,0)",
            ],
          }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full pointer-events-none"
        />

        <WhatsAppIcon />

        {/* Desktop Tooltip */}
        <span className="pointer-events-none absolute right-full mr-3.5 px-3.5 py-1.5 rounded-xl bg-dark-green text-white text-xs font-satoshi font-semibold tracking-wide whitespace-nowrap opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 shadow-lg hidden sm:block border border-white/10">
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
};

export default WhatsAppFloatingButton;
