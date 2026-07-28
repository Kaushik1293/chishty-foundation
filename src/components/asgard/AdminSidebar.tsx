"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Calendar,
  Users,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles,
  ShieldCheck,
  Menu,
  X,
} from "lucide-react";

import whiteLogo from "../../assets/images/homepage/white-logo.png";
import star from "../../assets/images/homepage/vectors/common/gold-star.svg";

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

export default function AdminSidebar({
  isMobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = [
    {
      label: "Dashboard",
      href: "/asgard",
      icon: LayoutDashboard,
      badge: "Overview",
    },
    {
      label: "Events Management",
      href: "/events",
      icon: Calendar,
      badge: "CRUD",
    },
    {
      label: "Partners Management",
      href: "/partners",
      icon: Users,
      badge: "CRUD",
    },
  ];

  const handleLogout = () => {
    // Simulated logout action
    router.push("/login");
  };

  const isCurrentActive = (href: string) => {
    if (href === "/asgard") {
      return pathname === "/asgard";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-[#0A3231] text-white border-r border-[#BD8C3B]/30 relative shadow-2xl select-none">
      {/* Top Header & Brand */}
      <div>
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <Link
            href="/asgard"
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#BD8C3B] to-[#AD4D27] p-0.5 shadow-lg shrink-0 flex items-center justify-center">
              <motion.img
                src={star.src || star}
                alt="Chishty Logo"
                className="w-6 h-6 object-contain"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-cormorant font-bold text-xl tracking-wider text-[#FFD56C]">
                    ASGARD
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#BD8C3B]/30 text-[#FFD56C] font-mono border border-[#BD8C3B]/40">
                    CMS
                  </span>
                </div>
                <span className="text-[11px] text-white/60 font-satoshi">
                  Chishty Foundation
                </span>
              </motion.div>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 hover:bg-[#BD8C3B] text-white/80 hover:text-white transition-colors"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Navigation Section */}
        <div className="px-3 py-6 space-y-1">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold tracking-wider text-[#BD8C3B] uppercase font-satoshi mb-2">
              Main Menu
            </p>
          )}

          {navItems.map((item) => {
            const active = isCurrentActive(item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group font-satoshi text-sm font-medium ${
                  active
                    ? "text-[#FFD56C] font-semibold"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {/* Active Indicator Backdrop */}
                {active && (
                  <motion.div
                    layoutId="activeSidebarTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#BD8C3B]/25 to-[#BD8C3B]/10 rounded-xl border border-[#BD8C3B]/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div
                  className={`relative z-10 p-2 rounded-lg transition-colors ${
                    active
                      ? "bg-[#BD8C3B] text-[#0A3231]"
                      : "bg-white/5 text-white/80 group-hover:bg-white/10 group-hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>

                {!isCollapsed && (
                  <div className="relative z-10 flex items-center justify-between flex-1 overflow-hidden">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${
                          active
                            ? "bg-[#BD8C3B] text-[#0A3231]"
                            : "bg-white/10 text-white/60 group-hover:text-white"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}

                {/* Hover Tooltip when collapsed */}
                {isCollapsed && (
                  <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-[#0A3231] text-white text-xs font-satoshi shadow-xl border border-[#BD8C3B]/40 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom User & Website Quick Actions */}
      <div className="p-3 border-t border-white/10 space-y-2">
        {/* Live Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs transition-colors group ${
            isCollapsed ? "justify-center" : ""
          }`}
          title="View Live Website"
        >
          <ExternalLink className="w-4 h-4 text-[#BD8C3B] shrink-0" />
          {!isCollapsed && (
            <span className="font-satoshi truncate">View Live Website</span>
          )}
        </a>

        {/* User Card */}
        <div
          className={`flex items-center gap-3 p-2.5 rounded-xl bg-black/20 border border-white/10 ${
            isCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#BD8C3B] to-[#FFD56C] text-[#0A3231] font-bold text-xs flex items-center justify-center shrink-0 border border-white/20">
              AD
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-white truncate">
                    Administrator
                  </span>
                  <ShieldCheck className="w-3 h-3 text-[#FFD56C] shrink-0" />
                </div>
                <span className="text-[10px] text-white/50 truncate">
                  admin@chishty.org
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Backdrop & Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onMobileClose}
              className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-72 z-50"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
