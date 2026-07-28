"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import AdminSidebar from "@/src/components/asgard/AdminSidebar";
import AdminHeader from "@/src/components/asgard/AdminHeader";

export default function AsgardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (pathname === "/asgard/login") {
    return <main className="min-h-screen bg-dark-green">{children}</main>;
  }

  return (
    <div className="min-h-screen bg-beige text-dark-green font-satoshi flex flex-col md:flex-row antialiased">
      <AdminSidebar
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      <div className="flex-1 flex flex-col md:pl-64 min-w-0 transition-all duration-300">
        <AdminHeader onMobileMenuToggle={() => setIsMobileOpen(true)} />
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full ">
          {children}
        </main>
      </div>
    </div>
  );
}
