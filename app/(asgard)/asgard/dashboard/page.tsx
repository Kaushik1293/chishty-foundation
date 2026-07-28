"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Users, Plus, ArrowRight, TrendingUp, Award, Globe, Database, CheckCircle2, Clock, Sparkles, } from "lucide-react";

export default function AsgardDashboardPage() {
  const stats = [
    {
      title: "Total Events",
      value: "24",
      change: "+4 this month",
      icon: Calendar,
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/40",
      iconColor: "text-dark-yellow",
      href: "/events",
    },
    {
      title: "Active Partners",
      value: "18",
      change: "+2 new allies",
      icon: Users,
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/40",
      iconColor: "text-emerald-600",
      href: "/asgard/partners",
    },
    {
      title: "Upcoming Campaigns",
      value: "6",
      change: "Next: Winter Relief",
      icon: TrendingUp,
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/40",
      iconColor: "text-blue-600",
      href: "/events",
    },
    {
      title: "Global Reach",
      value: "15+ Countries",
      change: "Humanitarian Aid",
      icon: Globe,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/40",
      iconColor: "text-purple-600",
      href: "/asgard/partners",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "event",
      title: "Annual Education Drive 2026",
      action: "Published new event",
      time: "2 hours ago",
      status: "Published",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
    {
      id: 2,
      type: "partner",
      title: "Global Relief Alliance",
      action: "Updated partnership details",
      time: "5 hours ago",
      status: "Active Partner",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    },
    {
      id: 3,
      type: "event",
      title: "Free Healthcare & Medical Camp",
      action: "Saved draft",
      time: "1 day ago",
      status: "Draft",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    },
  ];

  return (
    <div className="space-y-8 font-satoshi">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-6 md:p-8 rounded-3xl bg-linear-to-r from-dark-green via-[#114B4A] to-dark-green text-white shadow-xl overflow-hidden border border-dark-yellow/40"
      >
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-dark-yellow/20 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-yellow/20 border border-dark-yellow/40 text-light-yellow text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Asgard CMS v2.0 Ready</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-cormorant leading-tight">
            Welcome to <span className="text-light-yellow">Asgard</span> Content Management System
          </h2>

          <p className="text-sm text-white/80 leading-relaxed">
            Manage your Foundation’s dynamic Events and Partner network effortlessly.
            Create, update, filter, and track all operations with instant UI feedback.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/events"
              className="px-5 py-2.5 rounded-xl bg-linear-to-r from-dark-yellow to-rust-orange text-white font-semibold text-xs shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Manage Events CRUD</span>
            </Link>

            <Link
              href="/asgard/partners"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-light-yellow" />
              <span>Manage Partners CRUD</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                href={stat.href}
                className={`block p-5 rounded-2xl bg-white border border-stroke shadow-sm hover:shadow-md hover:border-dark-yellow/50 transition-all group relative overflow-hidden`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-dark-green/60 uppercase tracking-wider">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold font-cormorant text-dark-green mt-1">
                      {stat.value}
                    </p>
                  </div>

                  <div
                    className={`p-3 rounded-xl bg-linear-to-br ${stat.color} border ${stat.borderColor} ${stat.iconColor} group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stroke/60 flex items-center justify-between text-xs">
                  <span className="text-dark-green/70">{stat.change}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-dark-yellow group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* CRUD Quick Navigation Cards & Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Action Navigation Cards */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-xl font-bold font-cormorant text-dark-green">
            Content Management Operations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Events Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-stroke shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-dark-green text-light-yellow flex items-center justify-center shadow-md">
                  <Calendar className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold font-cormorant text-dark-green">
                  Events Management
                </h4>
                <p className="text-xs text-dark-green/70 leading-relaxed">
                  Full CRUD table for creating, updating dates, category filtering,
                  capacity tracking, and publishing foundation events.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/events"
                  className="w-full py-2.5 px-4 rounded-xl bg-dark-green hover:bg-dark-green/90 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Open Events Manager</span>
                  <ArrowRight className="w-4 h-4 text-dark-yellow" />
                </Link>
              </div>
            </motion.div>

            {/* Partners Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-stroke shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-dark-yellow text-dark-green flex items-center justify-center shadow-md">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-2xl font-bold font-cormorant text-dark-green">
                  Partners Management
                </h4>
                <p className="text-xs text-dark-green/70 leading-relaxed">
                  Full CRUD table for managing corporate sponsors, humanitarian allies,
                  NGO categories, and contact information.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/asgard/partners"
                  className="w-full py-2.5 px-4 rounded-xl bg-dark-yellow hover:bg-dark-yellow/90 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <span>Open Partners Manager</span>
                  <ArrowRight className="w-4 h-4 text-dark-green" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-white border border-stroke rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stroke">
              <h3 className="text-lg font-bold font-cormorant text-dark-green">
                Recent CMS Activity
              </h3>
              <Clock className="w-4 h-4 text-dark-yellow" />
            </div>

            <div className="divide-y divide-stroke/60 py-2">
              {recentActivity.map((item) => (
                <div key={item.id} className="py-3 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${item.badgeColor}`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[10px] text-dark-green/50">
                      {item.time}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-dark-green">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-dark-green/70">
                    {item.action}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-stroke text-center">
            <div className="inline-flex items-center gap-1.5 text-xs text-dark-green/60">
              <Database className="w-3.5 h-3.5 text-emerald-600" />
              <span>Real-time State Sync Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
