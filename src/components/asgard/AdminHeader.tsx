"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  Bell,
  Search,
  Database,
  Sparkles,
  ChevronDown,
  User,
  Shield,
  LogOut,
  RefreshCw,
} from "lucide-react";

interface AdminHeaderProps {
  onMobileMenuToggle: () => void;
}

export default function AdminHeader({ onMobileMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Dynamic Page Title
  const getPageTitle = () => {
    if (pathname.includes("/events"))
      return {
        title: "Events Management",
        subtitle: "Create, view, update, and manage foundation events",
      };
    if (pathname.includes("/partners"))
      return {
        title: "Partners Management",
        subtitle: "Manage sponsors, NGO alliances, and global partners",
      };
    if (pathname.includes("/asgard"))
      return {
        title: "Asgard Admin Overview",
        subtitle: "Welcome back! Here is your quick performance breakdown",
      };
    return { title: "Admin Portal", subtitle: "Chishty Foundation CMS" };
  };

  const pageInfo = getPageTitle();

  const mockNotifications = [
    {
      id: 1,
      title: "New Partner Registration",
      desc: "Global Education Aid submitted partner inquiry",
      time: "10m ago",
      unread: true,
    },
    {
      id: 2,
      title: "Event Goal Reached",
      desc: "Annual Food Drive exceeded capacity target",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      title: "Database Sync",
      desc: "Supabase tables initialized & verified",
      time: "2h ago",
      unread: false,
    },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FCF8F4]/90 backdrop-blur-md border-b border-[#ECE2CB] px-4 md:px-8 py-4 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Trigger + Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl bg-[#0A3231]/5 text-[#0A3231] hover:bg-[#0A3231]/10 transition-colors"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <h1 className="text-xl md:text-2xl font-bold font-cormorant text-[#0A3231] leading-tight">
              {pageInfo.title}
            </h1>
            <p className="text-xs text-[#0A3231]/60 font-satoshi hidden sm:block">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Right: Quick Controls & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Supabase Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0A3231]/5 border border-[#BD8C3B]/40 text-xs font-satoshi font-medium text-[#0A3231]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Database className="w-3.5 h-3.5 text-[#BD8C3B]" />
            <span>Supabase Ready</span>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setIsNotifOpen(!isNotifOpen);
                setIsUserMenuOpen(false);
              }}
              className="relative p-2.5 rounded-xl bg-[#0A3231]/5 hover:bg-[#0A3231]/10 text-[#0A3231] transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4 md:w-5 md:h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#BD8C3B] rounded-full ring-2 ring-[#FCF8F4]" />
            </button>

            <AnimatePresence>
              {isNotifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-80 bg-[#FCF8F4] border border-[#ECE2CB] shadow-2xl rounded-2xl p-4 z-50 overflow-hidden"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#ECE2CB]">
                    <span className="font-cormorant font-bold text-lg text-[#0A3231]">
                      Notifications
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#BD8C3B]/20 text-[#0A3231] font-mono font-semibold">
                      3 New
                    </span>
                  </div>

                  <div className="divide-y divide-[#ECE2CB]/60 py-2">
                    {mockNotifications.map((n) => (
                      <div
                        key={n.id}
                        className="py-2.5 px-2 hover:bg-[#0A3231]/5 rounded-xl transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-[#0A3231]">
                            {n.title}
                          </p>
                          <span className="text-[10px] text-[#0A3231]/50">
                            {n.time}
                          </span>
                        </div>
                        <p className="text-xs text-[#0A3231]/70 mt-0.5 line-clamp-1">
                          {n.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-2 py-2 text-center text-xs font-semibold text-[#BD8C3B] hover:text-[#0A3231] transition-colors border-t border-[#ECE2CB] pt-3">
                    View All Activity
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl bg-[#0A3231] hover:bg-[#0A3231]/90 text-white transition-all shadow-md"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#BD8C3B] to-[#FFD56C] text-[#0A3231] font-bold text-xs flex items-center justify-center">
                A
              </div>
              <span className="text-xs font-semibold font-satoshi hidden sm:inline-block">
                Admin
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-white/70" />
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-56 bg-[#FCF8F4] border border-[#ECE2CB] shadow-2xl rounded-2xl p-2 z-50"
                >
                  <div className="px-3 py-2 border-b border-[#ECE2CB]">
                    <p className="text-xs font-bold text-[#0A3231]">
                      Super Administrator
                    </p>
                    <p className="text-[10px] text-[#0A3231]/60">
                      admin@chishty.org
                    </p>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <a
                      href="/asgard"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#0A3231] hover:bg-[#0A3231]/5 rounded-xl transition-colors font-medium"
                    >
                      <User className="w-4 h-4 text-[#BD8C3B]" />
                      <span>Admin Overview</span>
                    </a>
                    <a
                      href="/events"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-[#0A3231] hover:bg-[#0A3231]/5 rounded-xl transition-colors font-medium"
                    >
                      <Shield className="w-4 h-4 text-[#BD8C3B]" />
                      <span>Events Manager</span>
                    </a>
                  </div>

                  <div className="pt-1 border-t border-[#ECE2CB]">
                    <a
                      href="/login"
                      className="flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
