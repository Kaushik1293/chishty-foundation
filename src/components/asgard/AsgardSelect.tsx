"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";

export interface OptionItem {
  label: string;
  value: string;
}

interface AsgardSelectProps {
  options: OptionItem[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
}

export default function AsgardSelect({
  options,
  value,
  onChange,
  icon,
  placeholder = "Select...",
  className = "",
}: AsgardSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      {/* Dropdown Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-2.5 py-2 px-3.5 bg-beige border border-stroke hover:border-dark-yellow/60 rounded-xl text-xs text-dark-green font-satoshi font-medium transition-all shadow-xs cursor-pointer focus:outline-none focus:border-dark-yellow"
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-dark-yellow transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Floating Options Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 right-0 sm:right-auto sm:min-w-[160px] mt-1.5 bg-white border border-stroke shadow-xl rounded-xl p-1.5 z-50 overflow-hidden font-satoshi"
          >
            <div className="space-y-0.5 max-h-60 overflow-y-auto">
              {options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2 text-xs rounded-lg transition-colors cursor-pointer text-left ${
                      isSelected
                        ? "bg-dark-yellow/15 text-dark-green font-semibold"
                        : "text-dark-green/80 hover:bg-beige hover:text-dark-green"
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-dark-yellow shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
