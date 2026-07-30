"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@/src/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  Menu,
  Bell,
  Search,
  Database,
  Sparkles,
  ChevronDown,
  User,
  Shield,
  Heart,
  LayoutDashboard,
  Calendar,
  Users,
  LogOut,
  RefreshCw,
} from "lucide-react";

interface AdminHeaderProps {
  onMobileMenuToggle: () => void;
}

export default function AdminHeader({ onMobileMenuToggle }: AdminHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>("admin@chishty.org");
  const [userName, setUserName] = useState<string>("Admin");

  const supabase = createClient();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || null);
        setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "Admin");
      }
    }
    getUser();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    await supabase.auth.signOut();
    router.push("/asgard/login");
    router.refresh();
  };

  // Dynamic Page Title
  const getPageTitle = () => {
    if (pathname.includes("/asgard/causes") || pathname.includes("/causes"))
      return {
        title: "Causes & Campaigns",
        subtitle: "Create, view, update, and manage foundation causes and campaigns",
      };
    if (pathname.includes("/asgard/events") || pathname.includes("/events"))
      return {
        title: "Events Management",
        subtitle: "Create, view, update, and manage foundation events",
      };
    if (pathname.includes("/asgard/partners") || pathname.includes("/partners"))
      return {
        title: "Partners Management",
        subtitle: "Manage sponsors, NGO alliances, and global partners",
      };
    if (pathname === "/asgard")
      return {
        title: "Asgard Admin Overview",
        subtitle: "Welcome back! Here is your quick performance breakdown",
      };
    return { title: "Admin Portal", subtitle: "Chishty Foundation CMS" };
  };

  const pageInfo = getPageTitle();



  return (
    <header className="sticky top-0 z-30 bg-beige/90 backdrop-blur-md border-b border-stroke px-4 md:px-8 py-4 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Trigger + Page Title */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-xl bg-dark-green/5 text-dark-green hover:bg-dark-green/10 transition-colors"
            aria-label="Open mobile navigation"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-dark-yellow bg-dark-yellow/10 px-2.5 py-1 rounded-md border border-dark-yellow/30">
              Admin Portal
            </span>
            <span className="text-xs text-dark-green/40 font-bold">/</span>
            <h1 className="text-sm md:text-base font-bold font-satoshi text-dark-green tracking-wide">
              {pageInfo.title}
            </h1>
          </div>
        </div>

        {/* Right: Quick Controls & Profile */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Supabase Status Pill */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-dark-green/5 border border-dark-yellow/40 text-xs font-satoshi font-medium text-dark-green">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <Database className="w-3.5 h-3.5 text-dark-yellow" />
            <span>System Active</span>
          </div>

          {/* User Profile Pill */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => {
                setIsUserMenuOpen(!isUserMenuOpen);
                setIsNotifOpen(false);
              }}
              className="flex items-center gap-2.5 p-1.5 pl-2.5 rounded-xl bg-dark-green hover:bg-dark-green/90 text-white transition-all shadow-md cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-dark-yellow to-[#FFD56C] text-dark-green font-bold text-xs flex items-center justify-center uppercase">
                {userName.slice(0, 1)}
              </div>
              <span className="text-xs font-semibold font-satoshi hidden sm:inline-block">
                {userName}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-white/70 transition-transform duration-200 ${isUserMenuOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-3 w-56 bg-beige border border-stroke shadow-2xl rounded-2xl p-2 z-50"
                >
                  <div className="px-3 py-2 border-b border-stroke">
                    <p className="text-xs font-bold text-dark-green">
                      {userName}
                    </p>
                    <p className="text-[10px] text-dark-green/60">
                      {userEmail}
                    </p>
                  </div>

                  <div className="py-1 space-y-0.5">
                    <Link
                      href="/asgard/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-dark-green hover:bg-dark-green/5 rounded-xl transition-colors font-medium"
                    >
                      <LayoutDashboard className="w-4 h-4 text-dark-yellow" />
                      <span>Admin Overview</span>
                    </Link>
                    <Link
                      href="/asgard/events"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-dark-green hover:bg-dark-green/5 rounded-xl transition-colors font-medium"
                    >
                      <Calendar className="w-4 h-4 text-dark-yellow" />
                      <span>Events Manager</span>
                    </Link>
                    <Link
                      href="/asgard/partners"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-dark-green hover:bg-dark-green/5 rounded-xl transition-colors font-medium"
                    >
                      <Users className="w-4 h-4 text-dark-yellow" />
                      <span>Partners Manager</span>
                    </Link>
                    <Link
                      href="/asgard/causes"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-xs text-dark-green hover:bg-dark-green/5 rounded-xl transition-colors font-medium"
                    >
                      <Heart className="w-4 h-4 text-dark-yellow" />
                      <span>Causes & Campaigns</span>
                    </Link>
                  </div>

                  <div className="pt-1 border-t border-stroke">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors font-semibold cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
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
