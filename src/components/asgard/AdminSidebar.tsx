"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Calendar, Users, ExternalLink, ChevronLeft, ChevronRight, LogOut, Sparkles, ShieldCheck, Menu, X, } from "lucide-react";

import whiteLogo from "../../assets/images/homepage/white-logo.png";
import star from "../../assets/images/logo-icon.png";

interface AdminSidebarProps {
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

import { createClient } from "@/src/utils/supabase/client";
import { useEffect } from "react";

export default function AdminSidebar({
  isMobileOpen = false,
  onMobileClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>("admin@chishty.org");
  const [userName, setUserName] = useState<string>("Administrator");

  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || null);
        setUserName(user.user_metadata?.full_name || user.email?.split("@")[0] || "Administrator");
      }
    }
    getUser();
  }, []);

  const navItems = [
    {
      label: "Dashboard",
      href: "/asgard/dashboard",
      icon: LayoutDashboard,
      badge: "Overview",
    },
    {
      label: "Events Management",
      href: "/asgard/events",
      icon: Calendar,
      badge: "CRUD",
    },
    {
      label: "Partners Management",
      href: "/asgard/partners",
      icon: Users,
      badge: "CRUD",
    },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/asgard/login");
    router.refresh();
  };

  const isCurrentActive = (href: string) => {
    if (href === "/asgard") {
      return pathname === "/asgard";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full justify-between bg-dark-green text-white border-r border-dark-yellow/30 relative shadow-2xl select-none">
      {/* Top Header & Brand */}
      <div>
        <div className="p-5 flex items-center justify-between border-b border-white/10">
          <Link
            href="/asgard"
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-white p-0.5 shadow-lg shrink-0 flex items-center justify-center">
              <motion.img
                src={star.src}
                alt="Chishty Logo"
                className="w-6 h-6 object-contain"
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
                  <span className="font-satoshi font-bold text-xl tracking-wider text-light-yellow">
                    ADMIN
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-dark-yellow/30 text-light-yellow font-mono border border-dark-yellow/40">
                    CMS
                  </span>
                </div>
                <span className="text-white text-sm font-satoshi">
                  Chishty Foundation
                </span>
              </motion.div>
            )}
          </Link>

          {/* Desktop collapse toggle */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 hover:bg-dark-yellow text-white/80 hover:text-white transition-colors"
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
            <p className="px-3 text-[11px] font-semibold tracking-wider text-dark-yellow uppercase font-satoshi mb-2">
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
                className={`relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group font-satoshi text-sm font-medium ${active
                  ? "text-light-yellow font-semibold"
                  : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
              >
                {/* Active Indicator Backdrop */}
                {active && (
                  <motion.div
                    layoutId="activeSidebarTab"
                    className="absolute inset-0 bg-linear-to-r from-dark-yellow/25 to-dark-yellow/10 rounded-xl border border-dark-yellow/50"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                <div
                  className={`relative z-10 p-2 rounded-lg transition-colors ${active
                    ? "bg-dark-yellow text-dark-green"
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
                        className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-medium ${active
                          ? "bg-dark-yellow text-dark-green"
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
                  <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-dark-green text-white text-xs font-satoshi shadow-xl border border-dark-yellow/40 whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50">
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
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs transition-colors group ${isCollapsed ? "justify-center" : ""
            }`}
          title="View Live Website"
        >
          <ExternalLink className="w-4 h-4 text-dark-yellow shrink-0" />
          {!isCollapsed && (
            <span className="font-satoshi truncate">View Live Website</span>
          )}
        </a>

        {/* User Card */}
        <div
          className={`flex items-center gap-3 p-2.5 rounded-xl bg-black/20 border border-white/10 ${isCollapsed ? "justify-center" : "justify-between"
            }`}
        >
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-dark-yellow to-light-yellow text-dark-green font-bold text-xs flex items-center justify-center shrink-0 border border-white/20 uppercase">
              {userName.slice(0, 2)}
            </div>
            {!isCollapsed && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-semibold text-white truncate">
                    {userName}
                  </span>
                  <ShieldCheck className="w-3 h-3 text-light-yellow shrink-0" />
                </div>
                <span className="text-[10px] text-white/50 truncate">
                  {userEmail}
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
        className={`hidden md:block fixed top-0 left-0 bottom-0 z-40 transition-all duration-300 ${isCollapsed ? "w-20" : "w-64"
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
