"use client";

import React from "react";
import { motion } from "framer-motion";
import { CauseRecord } from "@/app/(asgard)/asgard/causes/actions";

interface CauseCardProps {
  cause: CauseRecord;
  index: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CauseCard({ cause, index }: CauseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: EASE, delay: index * 0.1 }}
      className="relative group flex flex-col items-center h-full"
    >
      <div className="w-full h-72 md:h-80 rounded-[2rem] overflow-hidden relative shadow-lg">
        {cause.image ? (
          <img
            src={cause.image}
            alt="Campaign"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-dark-green/30 font-bold bg-dark-green/5">
            No Image Available
          </div>
        )}

        <div className="absolute inset-0 bg-dark-green/10 group-hover:bg-transparent transition-colors duration-500" />
        <div className="absolute inset-4 border border-white/20 rounded-[1.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="w-[90%] bg-white/95 backdrop-blur-md -mt-16 relative z-10 p-6 md:p-8 rounded-3xl shadow-[0_20px_40px_rgba(13,39,80,0.06)] border border-white group-hover:-translate-y-3 transition-transform duration-500 ease-out flex-1 flex flex-col">
        <div className="w-12 h-1.5 bg-linear-to-r from-dark-yellow to-rust-orange mb-5 rounded-full" />
        <p className="text-dark-green/80 text-[15px] leading-relaxed text-justify flex-1">
          {cause.description}
        </p>
      </div>
    </motion.div>
  );
}
