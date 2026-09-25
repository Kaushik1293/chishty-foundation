"use server";

import { createClient } from "@/src/utils/supabase/server";
import { createClient as createDirectClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://liefgpgxctgnntokernd.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_VgNPF1O9ksecEUlos4oHUw_XvMig14_";

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
      if (data && data.length > 0) return data.length;

      // Fallback with direct client
      const direct = createDirectClient(supabaseUrl, supabaseKey);
      const directRes = await direct.from(table).select("id");
      return directRes.data?.length ?? 0;
    }

    return count;
  } catch (err) {
    console.error(`Error counting table ${table}:`, err);
    try {
      const direct = createDirectClient(supabaseUrl, supabaseKey);
      const directRes = await direct.from(table).select("id");
      return directRes.data?.length ?? 0;
    } catch {
      return 0;
    }
  }
}

/**
 * Server action to fetch exact record counts for all Asgard CMS modules
 */
export async function getSidebarCounts(): Promise<SidebarCounts> {
  try {
    let supabase: any;
    try {
      supabase = await createClient();
    } catch {
      supabase = createDirectClient(supabaseUrl, supabaseKey);
    }

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
