"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar, Users, Heart, Plus, ArrowRight, TrendingUp, Award, Globe, Database, CheckCircle2, Clock, Sparkles, Star, ExternalLink, Loader2, RefreshCw, BookOpen, Image as ImageIcon, HandHeart, Coins
} from "lucide-react";
import { getEvents, Event as SupabaseEvent } from "@/app/(web)/action";
import { getPartners, PartnerRecord } from "@/app/(asgard)/asgard/partners/actions";
import { getCauses, CauseRecord } from "@/app/(asgard)/asgard/causes/actions";
import { getInsights, InsightRecord } from "@/app/(asgard)/asgard/insights/actions";
import { getMedia, MediaRecord } from "@/app/(asgard)/asgard/media/actions";
import { getDonations, DonationRecord } from "@/app/(asgard)/asgard/donations/actions";
import { formatDateDDMMYYYY } from "@/src/utils/formatDate";

export default function AsgardDashboardPage() {
  const [events, setEvents] = useState<SupabaseEvent[]>([]);
  const [partners, setPartners] = useState<PartnerRecord[]>([]);
  const [causes, setCauses] = useState<CauseRecord[]>([]);
  const [insights, setInsights] = useState<InsightRecord[]>([]);
  const [media, setMedia] = useState<MediaRecord[]>([]);
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadDashboardData = async () => {
    setIsLoading(true);
    try {
      const [eventsData, partnersData, causesData, insightsData, mediaData, donationsData] = await Promise.all([
        getEvents(),
        getPartners(),
        getCauses(),
        getInsights(),
        getMedia(),
        getDonations(),
      ]);
      setEvents(eventsData);
      setPartners(partnersData);
      setCauses(causesData);
      setInsights(insightsData);
      setMedia(mediaData);
      setDonations(donationsData);
    } catch (err) {
      console.error("Error loading dashboard metrics from Supabase:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const totalEvents = events.length;
  const activeEvents = events.filter((e) => e.is_active).length;
  const featuredEvents = events.filter((e) => e.is_featured).length;

  const totalPartners = partners.length;
  const activePartners = partners.filter((p) => p.is_active).length;

  const totalCauses = causes.length;
  const activeCauses = causes.filter((c) => c.is_active).length;

  const totalInsights = insights.length;
  const activeInsights = insights.filter((i) => i.is_active).length;

  const totalMedia = media.length;
  const activeMedia = media.filter((m) => m.is_active).length;

  const totalDonations = donations.length;
  const completedDonations = donations.filter((d) => {
    const s = (d.payment_status || "").toLowerCase();
    return s === "success" || s === "completed";
  });
  const totalAmountRaised = completedDonations.reduce((sum, d) => sum + Number(d.amount || 0), 0);

  const stats = [
    {
      title: "Donations Raised",
      value: isLoading ? "..." : `₹${totalAmountRaised.toLocaleString("en-IN")}`,
      subtitle: `${completedDonations.length} Received • ${totalDonations} Logs`,
      icon: HandHeart,
      color: "from-amber-500/20 to-yellow-500/20",
      borderColor: "border-dark-yellow/50",
      iconColor: "text-dark-yellow",
      href: "/asgard/donations",
    },
    {
      title: "Total Events",
      value: isLoading ? "..." : String(totalEvents),
      subtitle: `${activeEvents} Active • ${featuredEvents} Featured`,
      icon: Calendar,
      color: "from-amber-500/20 to-orange-500/20",
      borderColor: "border-amber-500/40",
      iconColor: "text-dark-yellow",
      href: "/asgard/events",
    },
    {
      title: "Active Partners",
      value: isLoading ? "..." : String(activePartners),
      subtitle: `${totalPartners} Total Registered Allies`,
      icon: Users,
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/40",
      iconColor: "text-emerald-600",
      href: "/asgard/partners",
    },
    {
      title: "Active Causes",
      value: isLoading ? "..." : String(activeCauses),
      subtitle: `${totalCauses} Total Causes & Campaigns`,
      icon: Heart,
      color: "from-rose-500/20 to-red-500/20",
      borderColor: "border-rose-500/40",
      iconColor: "text-rose-600",
      href: "/asgard/causes",
    },
    {
      title: "Insights",
      value: isLoading ? "..." : String(totalInsights),
      subtitle: `${activeInsights} Active Publications`,
      icon: BookOpen,
      color: "from-blue-500/20 to-indigo-500/20",
      borderColor: "border-blue-500/40",
      iconColor: "text-blue-600",
      href: "/asgard/insights",
    },
    {
      title: "Media Assets",
      value: isLoading ? "..." : String(totalMedia),
      subtitle: `${activeMedia} Active In Gallery`,
      icon: ImageIcon,
      color: "from-purple-500/20 to-violet-500/20",
      borderColor: "border-purple-500/40",
      iconColor: "text-purple-600",
      href: "/asgard/media",
    },
  ];

  return (
    <div className="space-y-8 font-satoshi">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative p-6 md:p-8 rounded-3xl bg-linear-to-r from-dark-green via-[#114B4A] to-dark-green text-white shadow-xl overflow-hidden border border-dark-yellow/40"
      >

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-dark-yellow/20 border border-dark-yellow/40 text-light-yellow text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Database Connected</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold font-satoshi leading-tight">
            Welcome to <span className="text-light-yellow">Chishty Foundation</span> Admin Portal
          </h2>

          <p className="text-base sm:text-lg text-white/90 leading-relaxed font-normal">
            Manage Chishty Foundation’s Events, Partners, Causes, Insights, and Media in real-time.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/asgard/donations"
              className="px-5 py-2.5 rounded-xl bg-linear-to-r from-dark-yellow to-rust-orange text-white font-semibold text-sm shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
            >
              <HandHeart className="w-4 h-4" />
              <span>Donations ({totalDonations})</span>
            </Link>

            <Link
              href="/asgard/events"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 text-light-yellow" />
              <span>Events ({totalEvents})</span>
            </Link>

            <Link
              href="/asgard/partners"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Users className="w-4 h-4 text-light-yellow" />
              <span>Partners ({totalPartners})</span>
            </Link>

            <Link
              href="/asgard/causes"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Heart className="w-4 h-4 text-light-yellow" />
              <span>Causes ({totalCauses})</span>
            </Link>

            <Link
              href="/asgard/insights"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-light-yellow" />
              <span>Insights ({totalInsights})</span>
            </Link>

            <Link
              href="/asgard/media"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4 text-light-yellow" />
              <span>Media ({totalMedia})</span>
            </Link>

            <button
              onClick={loadDashboardData}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm transition-colors ml-auto cursor-pointer flex items-center gap-1.5"
              title="Refresh Metrics"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-dark-yellow" : ""}`} />
              <span className="text-xs font-medium hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
                className="block p-5 rounded-2xl bg-white border border-stroke shadow-sm hover:shadow-md hover:border-dark-yellow/50 transition-all group relative overflow-hidden h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-dark-green/60 uppercase tracking-wider">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold font-satoshi text-dark-green mt-1">
                        {stat.value}
                      </p>
                    </div>

                    <div
                      className={`p-2.5 rounded-xl bg-linear-to-br ${stat.color} border ${stat.borderColor} ${stat.iconColor} group-hover:scale-110 transition-transform shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-stroke/60 flex items-center justify-between text-xs">
                  <span className="text-dark-green/80 font-medium truncate text-[11px]">{stat.subtitle}</span>
                  <ArrowRight className="w-4 h-4 text-dark-yellow group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold font-satoshi text-dark-green">
            Content Operations
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Donations Operation */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-stroke shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-linear-to-br from-dark-yellow to-rust-orange text-white flex items-center justify-center shadow-md">
                  <HandHeart className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-dark-green text-sm mb-1 group-hover:text-dark-yellow transition-colors">
                  Donations Management
                </h4>
                <p className="text-sm text-dark-green/80 leading-relaxed font-normal">
                  View and verify online UPI / Card / PayPal contributions, record manual offline receipts, and export CSV financial reports.
                </p>
              </div>

              <div className="pt-6">
                <Link href="/asgard/donations">
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-dark-green group-hover:text-dark-yellow transition-colors">
                    <span>Manage Donations</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Events Operation */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-stroke shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-dark-green text-light-yellow flex items-center justify-center shadow-md">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-dark-green text-sm mb-1 group-hover:text-dark-yellow transition-colors">
                  Events
                </h4>
                <p className="text-sm text-dark-green/80 leading-relaxed font-normal">
                  Manage and publish foundation events, featured campaigns, banner images, and key dates.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/asgard/events"
                >
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-dark-green group-hover:text-dark-yellow transition-colors">
                    <span>Open Events</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Partners Operation */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-stroke shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-dark-yellow text-dark-green flex items-center justify-center shadow-md">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-dark-green text-sm mb-1 group-hover:text-dark-yellow transition-colors">
                  Partners
                </h4>
                <p className="text-sm text-dark-green/80 leading-relaxed font-normal">
                  Manage sponsor and partner organizations, logos, website links, and display order.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/asgard/partners"
                >
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-dark-green group-hover:text-dark-yellow transition-colors">
                    <span>Open Partners</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Causes Operation */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-stroke shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-rose-700 text-white flex items-center justify-center shadow-md">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-dark-green text-sm mb-1 group-hover:text-dark-yellow transition-colors">
                  Causes & Campaigns
                </h4>
                <p className="text-sm text-dark-green/80 leading-relaxed font-normal">
                  Update and manage charitable causes, display order, target impact projects, and visual banners.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/asgard/causes"
                >
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-dark-green group-hover:text-dark-yellow transition-colors">
                    <span>Open Causes</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Insights Operation */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-stroke shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center shadow-md">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-dark-green text-sm mb-1 group-hover:text-dark-yellow transition-colors">
                  Insights
                </h4>
                <p className="text-sm text-dark-green/80 leading-relaxed font-normal">
                  Publish foundation articles, research publications, document attachments, and category insights.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/asgard/insights"
                >
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-dark-green group-hover:text-dark-yellow transition-colors">
                    <span>Open Insights</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </motion.div>

            {/* Media Operation */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-white border border-stroke shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-700 text-white flex items-center justify-center shadow-md">
                  <ImageIcon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-dark-green text-sm mb-1 group-hover:text-dark-yellow transition-colors">
                  Media & Gallery
                </h4>
                <p className="text-sm text-dark-green/80 leading-relaxed font-normal">
                  Manage photos, gallery assets, alt text, and captions for the Chishty Foundation gallery.
                </p>
              </div>

              <div className="pt-6">
                <Link
                  href="/asgard/media"
                >
                  <div className="mt-4 flex items-center justify-between text-xs font-semibold text-dark-green group-hover:text-dark-yellow transition-colors">
                    <span>Open Media</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold font-satoshi text-dark-green">
              Live Database Preview
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-semibold">
              Synced
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-stroke shadow-sm space-y-4">
            {/* Recent Donations */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-dark-green/60 uppercase">
                  Recent Donations ({donations.slice(0, 3).length})
                </p>
                <Link
                  href="/asgard/donations"
                  className="text-[11px] text-dark-yellow font-semibold hover:underline"
                >
                  View All
                </Link>
              </div>
              {isLoading ? (
                <div className="py-4 text-center text-xs text-dark-green/50">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto text-dark-yellow mb-1" />
                  <span>Loading donations...</span>
                </div>
              ) : donations.length > 0 ? (
                <div className="space-y-2">
                  {donations.slice(0, 3).map((don, idx) => (
                    <div
                      key={don.id || idx}
                      className="p-2.5 rounded-xl bg-beige/60 border border-stroke flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-dark-green truncate">
                            {don.donor_name || (don.is_anonymous ? "Anonymous" : "Donor")}
                          </p>
                          <span className="text-[10px] font-mono text-dark-yellow font-bold">
                            ₹{Number(don.amount || 0).toLocaleString("en-IN")}
                          </span>
                        </div>
                        <p className="text-[10px] text-dark-green/60 truncate">
                          {don.donation_type} • {don.payment_method}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border shrink-0 ${(don.payment_status || "").toLowerCase() === "success" ||
                          (don.payment_status || "").toLowerCase() === "completed"
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : (don.payment_status || "").toLowerCase() === "pending"
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : (don.payment_status || "").toLowerCase() === "failed"
                              ? "bg-red-100 text-red-800 border-red-300"
                              : "bg-stone-100 text-stone-700 border-stone-300"
                          }`}
                      >
                        {(don.payment_status || "Pending").toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-dark-green/50 py-2">No donations recorded yet.</p>
              )}
            </div>

            {/* Recent Events */}
            <div className="pt-3 border-t border-stroke">
              <p className="text-xs font-bold text-dark-green/60 uppercase mb-2">
                Recent Events ({events.slice(0, 3).length})
              </p>
              {isLoading ? (
                <div className="py-4 text-center text-xs text-dark-green/50">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto text-dark-yellow mb-1" />
                  <span>Loading events...</span>
                </div>
              ) : events.length > 0 ? (
                <div className="space-y-2">
                  {events.slice(0, 3).map((evt) => (
                    <div
                      key={evt.id}
                      className="p-2.5 rounded-xl bg-beige/60 border border-stroke flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-dark-green truncate">
                          {evt.title}
                        </p>
                        <p className="text-[10px] text-dark-green/60 font-mono">
                          {formatDateDDMMYYYY(evt.event_date)}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border shrink-0 ${evt.is_active
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-slate-100 text-slate-700 border-slate-300"
                          }`}
                      >
                        {evt.is_active ? "Active" : "Draft"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-dark-green/50 py-2">No events created yet.</p>
              )}
            </div>

            {/* Recent Partners */}
            <div className="pt-3 border-t border-stroke">
              <p className="text-xs font-bold text-dark-green/60 uppercase mb-2">
                Recent Partners ({partners.slice(0, 3).length})
              </p>
              {isLoading ? (
                <div className="py-4 text-center text-xs text-dark-green/50">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto text-dark-yellow mb-1" />
                  <span>Loading partners...</span>
                </div>
              ) : partners.length > 0 ? (
                <div className="space-y-2">
                  {partners.slice(0, 3).map((ptr) => (
                    <div
                      key={ptr.id}
                      className="p-2.5 rounded-xl bg-beige/60 border border-stroke flex items-center justify-between text-xs"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-dark-green truncate">
                          {ptr.name}
                        </p>
                        <p className="text-[10px] text-dark-yellow truncate font-mono">
                          {ptr.website_url || "No website"}
                        </p>
                      </div>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border shrink-0 ${ptr.is_active
                          ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                          : "bg-slate-100 text-slate-700 border-slate-300"
                          }`}
                      >
                        {ptr.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-dark-green/50 py-2">No partners created yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
