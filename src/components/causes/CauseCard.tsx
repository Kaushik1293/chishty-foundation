"use client";

import React from "react";
import { motion } from "framer-motion";
import { CauseRecord } from "@/app/(asgard)/asgard/causes/actions";
import { DefaultCause } from "@/src/data/defaultCauses";

interface CauseCardProps {
  cause: CauseRecord | DefaultCause;
  index: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Derives a clear, meaningful title from the existing cause content
 * without inventing new claims or programs.
 */
function deriveCauseTitle(cause: { title?: string; description?: string | null }): string {
  const customTitle = (cause as { title?: string }).title;
  if (customTitle && typeof customTitle === "string" && customTitle.trim()) {
    return customTitle.trim();
  }

  const desc = (cause.description || "").toLowerCase();

  if (desc.includes("interfaith") || desc.includes("faiths") || desc.includes("dialogue")) {
    return "Interfaith Harmony";
  }
  if (desc.includes("sewa") || desc.includes("selfless service") || desc.includes("no expectation of return")) {
    return "Sewa — Selfless Service";
  }
  if (desc.includes("education") || desc.includes("child") || desc.includes("school") || desc.includes("learn")) {
    return "Child Education";
  }
  if (desc.includes("sufism") || desc.includes("sufi") || desc.includes("purity of heart") || desc.includes("khwaja")) {
    return "The Path of Sufism";
  }
  if (desc.includes("community") || desc.includes("underprivileged") || desc.includes("upliftment")) {
    return "Community Upliftment";
  }
  if (desc.includes("hunger") || desc.includes("langar") || desc.includes("ration") || desc.includes("meal")) {
    return "Hunger Relief & Langar";
  }
  if (desc.includes("health") || desc.includes("medical") || desc.includes("doctor")) {
    return "Healthcare & Medical Aid";
  }
  if (desc.includes("women") || desc.includes("vocational") || desc.includes("livelihood")) {
    return "Women Empowerment & Livelihood";
  }
  if (desc.includes("environment") || desc.includes("tree") || desc.includes("clean-water")) {
    return "Environment & Sustainability";
  }

  // Fallback: extract the first clause (up to 4 words) from the description
  const cleanFirst = (cause.description || "").replace(/I prefer this response[.]?/gi, "").trim();
  const firstSentence = cleanFirst.split(/[.,!?;]/)[0]?.trim();
  if (firstSentence) {
    const words = firstSentence.split(/\s+/).slice(0, 4).join(" ");
    if (words.length > 2) return words;
  }

  return "Humanitarian Cause";
}

export default function CauseCard({ cause, index }: CauseCardProps) {
  const causeTitle = deriveCauseTitle(cause);
  // Remove AI leftover text completely
  const cleanDescription = (cause.description || "")
    .replace(/I prefer this response[.]?/gi, "")
    .trim();

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
            alt={causeTitle}
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
        <div className="w-12 h-1.5 bg-gradient-to-r from-dark-yellow to-rust-orange mb-4 rounded-full" />
        <h3 className="font-cormorant font-bold text-2xl text-dark-green mb-3">
          {causeTitle}
        </h3>
        <p className="text-dark-green/80 text-[15px] leading-relaxed flex-1">
          {cleanDescription}
        </p>
      </div>
    </motion.div>
  );
}
