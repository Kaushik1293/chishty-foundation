"use server";

import { createClient } from "@/src/utils/supabase/server";

export interface SidebarCounts {
  events: number;
  partners: number;
  causes: number;
  insights: number;
  media: number;
  donations: number;
}

async function getCountForTable(supabase: any, table: string): Promise<number> {
  try {
    const { count, error } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });

    if (error || count === null || count === undefined) {
      const { data } = await supabase.from(table).select("id");
      return data?.length ?? 0;
    }

    return count;
  } catch (err) {
    console.error(`Error counting table ${table}:`, err);
    return 0;
  }
}

/**
 * Server action to fetch exact record counts for all Asgard CMS modules
 */
export async function getSidebarCounts(): Promise<SidebarCounts> {
  try {
    const supabase = await createClient();

    const [events, partners, causes, insights, media, donationsCount] = await Promise.all([
      getCountForTable(supabase, "events"),
      getCountForTable(supabase, "partners"),
      getCountForTable(supabase, "causes"),
      getCountForTable(supabase, "insights"),
      getCountForTable(supabase, "media"),
      getCountForTable(supabase, "donations"),
    ]);

    return {
      events,
      partners,
      causes,
      insights,
      media,
      donations: donationsCount ?? 0,
    };
  } catch (error) {
    console.error("Failed to fetch sidebar counts:", error);
    return {
      events: 0,
      partners: 0,
      causes: 0,
      insights: 0,
      media: 0,
      donations: 0,
    };
  }
}
