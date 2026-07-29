"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface PartnerRecord {
  id?: number;
  name: string | null;
  logo_url: string | null;
  website_url: string | null;
  display_order: number | null;
  is_active: boolean | null;
  created_at?: string;
  updated_at?: string | null;
}

/**
 * READ: Get all partners with optional search & active status filtering
 */
export async function getPartners(options?: {
  search?: string;
  isActiveOnly?: boolean;
}) {
  const supabase = await createClient();

  let query = supabase
    .from("partners")
    .select("*")
    .order("display_order", { ascending: true, nullsFirst: false });

  if (options?.isActiveOnly) {
    query = query.eq("is_active", true);
  }

  if (options?.search && options.search.trim() !== "") {
    const term = `%${options.search.trim()}%`;
    query = query.or(`name.ilike.${term},website_url.ilike.${term}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching partners:", error);
    throw new Error(error.message);
  }

  return (data as PartnerRecord[]) ?? [];
}

/**
 * READ: Get single partner by ID
 */
export async function getPartnerById(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching partner ${id}:`, error);
    throw new Error(error.message);
  }

  return data as PartnerRecord;
}

/**
 * CREATE: Add new partner to Supabase
 */
export async function createPartner(
  payload: Omit<PartnerRecord, "id" | "created_at" | "updated_at">
) {
  const supabase = await createClient();

  const newRecord = {
    name: payload.name || null,
    logo_url: payload.logo_url || null,
    website_url: payload.website_url || null,
    display_order: payload.display_order ?? 0,
    is_active: payload.is_active ?? true,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("partners")
    .insert([newRecord])
    .select()
    .single();

  if (error) {
    console.error("Error creating partner:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/partners");
  revalidatePath("/");
  return { success: true, data: data as PartnerRecord };
}

/**
 * UPDATE: Edit existing partner in Supabase
 */
export async function updatePartner(
  id: number,
  payload: Partial<Omit<PartnerRecord, "id" | "created_at">>
) {
  const supabase = await createClient();

  const updatedFields: Record<string, any> = {
    ...payload,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("partners")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating partner ${id}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/partners");
  revalidatePath("/");
  return { success: true, data: data as PartnerRecord };
}

/**
 * QUICK TOGGLE: Toggle active status (is_active)
 */
export async function togglePartnerActiveStatus(
  id: number,
  currentStatus: boolean | null
) {
  return updatePartner(id, { is_active: !currentStatus });
}

/**
 * DELETE: Remove partner by ID
 */
export async function deletePartner(id: number) {
  const supabase = await createClient();

  const { error } = await supabase.from("partners").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting partner ${id}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/partners");
  revalidatePath("/");
  return { success: true };
}
