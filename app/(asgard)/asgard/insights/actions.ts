"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface InsightRecord {
  id?: string;
  title: string | null;
  description: string | null;
  image_url: string | null;
  document_url: string | null;
  category: string | null;
  display_order: number | null;
  is_active: boolean | null;
  created_at?: string;
  updated_at?: string | null;
}

/**
 * READ: Get all insights with optional search, category & active status filtering
 */
export async function getInsights(options?: {
  search?: string;
  category?: string;
  isActiveOnly?: boolean;
}) {
  try {
    const supabase = await createClient();

    let query = supabase
      .from("insights")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (options?.isActiveOnly) {
      query = query.eq("is_active", true);
    }

    if (options?.category && options.category !== "All") {
      query = query.eq("category", options.category);
    }

    if (options?.search && options.search.trim() !== "") {
      const term = `%${options.search.trim()}%`;
      query = query.or(`title.ilike.${term},description.ilike.${term},category.ilike.${term}`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching insights:", error);
      return [];
    }

    return (data || []) as InsightRecord[];
  } catch (error) {
    console.error("Failed to connect or fetch insights:", error);
    return [];
  }
}

/**
 * READ: Get single insight by ID
 */
export async function getInsightById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("insights")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching insight ${id}:`, error);
    throw new Error(error.message);
  }

  return data as InsightRecord;
}

/**
 * CREATE: Add a new insight to Supabase
 */
export async function createInsight(
  payload: Omit<InsightRecord, "id" | "created_at" | "updated_at">
) {
  const supabase = await createClient();

  const newRecord = {
    title: payload.title || null,
    description: payload.description || null,
    image_url: payload.image_url || null,
    document_url: payload.document_url || null,
    category: payload.category || null,
    display_order: payload.display_order ?? 0,
    is_active: payload.is_active ?? true,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("insights")
    .insert([newRecord])
    .select()
    .single();

  if (error) {
    console.error("Error creating insight:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/insights");
  revalidatePath("/insights");
  return { success: true, data: data as InsightRecord };
}

/**
 * UPDATE: Edit existing insight in Supabase
 */
export async function updateInsight(
  id: string,
  payload: Partial<Omit<InsightRecord, "id" | "created_at">>
) {
  const supabase = await createClient();

  const updatedFields: Record<string, any> = {
    ...payload,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("insights")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating insight ${id}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/insights");
  revalidatePath("/insights");
  return { success: true, data: data as InsightRecord };
}

/**
 * DELETE: Remove insight by ID
 */
export async function deleteInsight(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("insights").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting insight ${id}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/insights");
  revalidatePath("/insights");
  return { success: true };
}

/**
 * QUICK TOGGLE: Active Status (is_active)
 */
export async function toggleInsightActiveStatus(
  id: string,
  currentStatus: boolean | null
) {
  return updateInsight(id, { is_active: !currentStatus });
}
