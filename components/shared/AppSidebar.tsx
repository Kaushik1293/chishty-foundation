"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, LogOut, ChevronRight, MonitorCog, BookOpenText, Newspaper, } from "lucide-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, } from "@/components/ui/sidebar";

import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from "@/components/ui/collapsible";

import { cn } from "@/lib/utils";

const badgeColors = {
    navy: "bg-[#13294B] text-[#E8C77A]",
    forest: "bg-[#123527] text-[#E8C77A]",
    terracotta: "bg-[#B3541E] text-[#FBF1DD]",
    maroon: "bg-[#7C1D43] text-[#F3D9C4]",
};

const items = [
    {
        title: "Dashboard",
        url: "/asgard/dashboard",
        icon: Home,
        badge: badgeColors.navy,
    },
    {
        title: "Content",
        icon: MonitorCog,
        badge: badgeColors.forest,
        items: [
            {
                title: "Banners",
                url: "/asgard/content/banners",
            },
        ],
    },
    {
        title: "Academics",
        icon: BookOpenText,
        badge: badgeColors.terracotta,
        items: [
            {
                title: "Batches",
                url: "/asgard/academics/batches",
            },
            {
                title: "Batch Regions",
                url: "/asgard/academics/batch-regions",
            },
            {
                title: "Courses",
                url: "/asgard/academics/courses",
            },
        ],
    },
    {
        title: "Blogs",
        icon: Newspaper,
        url: "/asgard/blogs",
        badge: badgeColors.maroon,
    },
];

// Small mandala-style divider, echoing the ornamental rules used
// between sections on the marketing site
function OrnamentDivider() {
    return (
        <div className="flex items-center justify-center gap-2 py-3 opacity-70">
            <span className="h-px w-6 bg-linear-to-r from-transparent to-[#C08A34]/70" />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="2" fill="#C08A34" />
                <circle cx="7" cy="7" r="5.5" stroke="#C08A34" strokeWidth="0.75" />
            </svg>
            <span className="h-px w-6 bg-linear-to-l from-transparent to-[#C08A34]/70" />
        </div>
    );
}

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <Sidebar
            className={cn(
                "border-r border-[#C08A34]/20 bg-[#FBF6EA]/95 backdrop-blur-xl",
                "text-[#2C2A24]"
            )}
        >
            {/* Heritage Header */}
            <SidebarHeader className="border-b border-[#C08A34]/20 px-5 py-5">
                <div className="flex items-center gap-3">
                    <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#123527] ring-1 ring-[#C08A34]/40">
                        <Image
                            src="/logo.svg"
                            alt="Asgard Logo"
                            width={20}
                            height={20}
                            className="object-contain"
                            priority
                        />
                    </div>
                    <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                        <p className="truncate font-serif text-[15px] font-semibold tracking-wide text-[#123527]">
                            Chishty Foundation
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#C08A34]">
                            Admin Panel
                        </p>
                    </div>
                </div>
            </SidebarHeader>

            {/* Navigation */}
            <SidebarContent className="px-4 py-5">
                <OrnamentDivider />

                <nav className="space-y-1">
                    {items.map((item) => {
                        if (item.items) {
                            const isActive = item.items.some((sub) =>
                                pathname.startsWith(sub.url)
                            );

                            return (
                                <Collapsible
                                    key={item.title}
                                    defaultOpen={isActive}
                                    className="group/collapsible"
                                >
                                    <CollapsibleTrigger
                                        className={cn(
                                            "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition-all duration-200",
                                            "hover:bg-[#123527]/6 text-[#5B5646]",
                                            isActive && "bg-[#123527]/8 text-[#123527]"
                                        )}
                                    >
                                        <span
                                            className={cn(
                                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                                                item.badge
                                            )}
                                        >
                                            <item.icon className="h-3.5 w-3.5" />
                                        </span>
                                        <span className="flex-1 text-left">{item.title}</span>
                                        <ChevronRight
                                            className={cn(
                                                "h-4 w-4 shrink-0 text-[#C08A34]/70 transition-transform duration-200",
                                                "group-data-[state=open]/collapsible:rotate-90"
                                            )}
                                        />
                                    </CollapsibleTrigger>

                                    <CollapsibleContent className="relative mt-1 before:absolute before:left-[1.6rem] before:top-0 before:h-full before:w-px before:bg-[#C08A34]/25">
                                        <div className="space-y-0.5 py-0.5">
                                            {item.items.map((sub) => {
                                                const active = pathname === sub.url;

                                                return (
                                                    <Link
                                                        key={sub.url}
                                                        href={sub.url}
                                                        className={cn(
                                                            "ml-7 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                                                            active
                                                                ? "bg-[#C08A34]/12 text-[#8A5A12] font-semibold"
                                                                : "text-[#6B6455] hover:bg-[#123527]/5 hover:text-[#2C2A24]"
                                                        )}
                                                    >
                                                        <span
                                                            className={cn(
                                                                "h-1.5 w-1.5 rounded-full transition-colors",
                                                                active ? "bg-[#C08A34]" : "bg-[#C08A34]/0"
                                                            )}
                                                        />
                                                        {sub.title}
                                                    </Link>
                                                );
                                            })}
                                        </div>
                                    </CollapsibleContent>
                                </Collapsible>
                            );
                        }

                        const active = pathname === item.url;

                        return (
                            <Link
                                key={item.url}
                                href={item.url}
                                className={cn(
                                    "flex items-center gap-3 rounded-xl px-2.5 py-2.5 text-sm font-medium transition-all duration-200",
                                    active
                                        ? "bg-[#123527] text-[#F3EAD3] shadow-sm shadow-[#123527]/20"
                                        : "text-[#5B5646] hover:bg-[#123527]/6 hover:text-[#123527]"
                                )}
                            >
                                <span
                                    className={cn(
                                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
                                        active ? "bg-[#C08A34] text-[#123527]" : item.badge
                                    )}
                                >
                                    <item.icon className="h-3.5 w-3.5" />
                                </span>
                                <span>{item.title}</span>
                            </Link>
                        );
                    })}
                </nav>
            </SidebarContent>

            {/* Footer */}
            <SidebarFooter className="border-t border-[#C08A34]/20 p-4">
                <div className="flex items-center gap-3 rounded-2xl border border-[#C08A34]/25 bg-[#123527]/4 p-3 backdrop-blur-md group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-tr from-[#C08A34] to-[#E8C77A] text-xs font-semibold text-[#123527] ring-2 ring-[#C08A34]/30">
                        A
                    </div>

                    <div className="flex-1 min-w-0 group-data-[collapsible=icon]:hidden animate-in fade-in duration-300">
                        <p className="text-xs font-semibold text-[#123527] truncate">
                            Admin Portal
                        </p>
                        <p className="text-[11px] text-[#6B6455] truncate">
                            admin@example.com
                        </p>
                    </div>

                    <button className="rounded-lg p-1.5 text-[#6B6455] transition-colors hover:bg-[#7C1D43]/10 hover:text-[#7C1D43] group-data-[collapsible=icon]:hidden">
                        <LogOut className="h-4 w-4" />
                    </button>
                </div>
            </SidebarFooter>
        </Sidebar>
    );
}