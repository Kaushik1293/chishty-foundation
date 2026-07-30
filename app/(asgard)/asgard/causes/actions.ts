"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface CauseRecord {
  id?: number;
  description: string | null;
  image: string | null;
  display_order: number | null;
  is_active: boolean | null;
  created_at?: string;
}

/**
 * READ: Get all causes with optional active status filtering
 */
export async function getCauses(options?: {
  isActiveOnly?: boolean;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("causes")
    .select("*")
    .order("display_order", { ascending: true, nullsFirst: false });

  if (options?.isActiveOnly) {
    query = query.eq("is_active", true);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching causes:", error);
    throw new Error(error.message);
  }

  return data as CauseRecord[];
}

/**
 * CREATE: Add a new cause
 */
export async function createCause(causeData: CauseRecord) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("causes")
    .insert([
      {
        description: causeData.description,
        image: causeData.image,
        display_order: causeData.display_order,
        is_active: causeData.is_active,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating cause:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/(asgard)/asgard/causes", "page");
  revalidatePath("/(web)/causes", "page");
  return { success: true, data };
}

/**
 * UPDATE: Update an existing cause
 */
export async function updateCause(id: number, updates: Partial<CauseRecord>) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("causes")
    .update({
      description: updates.description,
      image: updates.image,
      display_order: updates.display_order,
      is_active: updates.is_active,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating cause:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/(asgard)/asgard/causes", "page");
  revalidatePath("/(web)/causes", "page");
  return { success: true, data };
}

/**
 * DELETE: Remove a cause by ID
 */
export async function deleteCause(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("causes").delete().eq("id", id);

  if (error) {
    console.error("Error deleting cause:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/(asgard)/asgard/causes", "page");
  revalidatePath("/(web)/causes", "page");
  return { success: true };
}

/**
 * QUICK TOGGLE: Active Status
 */
export async function toggleCauseActiveStatus(id: number, currentStatus: boolean | null) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("causes")
    .update({ is_active: !currentStatus })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error toggling cause active status:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/(asgard)/asgard/causes", "page");
  revalidatePath("/(web)/causes", "page");
  return { success: true, data };
}
