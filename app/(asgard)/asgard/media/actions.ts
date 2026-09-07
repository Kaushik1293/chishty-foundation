"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface MediaRecord {
  id?: string;
  image_url: string | null;
  title: string | null;
  alt_text: string | null;
  caption: string | null;
  display_order: number | null;
  is_active: boolean | null;
  created_at?: string;
  updated_at?: string | null;
}

/**
 * READ: Get all media records with optional search & active status filtering
 */
export async function getMedia(options?: {
  search?: string;
  isActiveOnly?: boolean;
}) {
  try {
    const supabase = await createClient();

    let query = supabase
      .from("media")
      .select("*")
      .order("display_order", { ascending: true, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (options?.isActiveOnly) {
      query = query.eq("is_active", true);
    }

    if (options?.search && options.search.trim() !== "") {
      const term = `%${options.search.trim()}%`;
      query = query.or(`title.ilike.${term},alt_text.ilike.${term},caption.ilike.${term}`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching media:", error);
      return [];
    }

    return (data || []) as MediaRecord[];
  } catch (error) {
    console.error("Failed to connect or fetch media:", error);
    return [];
  }
}

/**
 * READ: Get single media record by ID
 */
export async function getMediaById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("media")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching media ${id}:`, error);
    throw new Error(error.message);
  }

  return data as MediaRecord;
}

/**
 * CREATE: Add a new media item to Supabase
 */
export async function createMedia(
  payload: Omit<MediaRecord, "id" | "created_at" | "updated_at">
) {
  const supabase = await createClient();

  const newRecord = {
    image_url: payload.image_url || null,
    title: payload.title || null,
    alt_text: payload.alt_text || null,
    caption: payload.caption || null,
    display_order: payload.display_order ?? 0,
    is_active: payload.is_active ?? true,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("media")
    .insert([newRecord])
    .select()
    .single();

  if (error) {
    console.error("Error creating media:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/media");
  revalidatePath("/gallery");
  return { success: true, data: data as MediaRecord };
}

/**
 * UPDATE: Edit existing media item in Supabase
 */
export async function updateMedia(
  id: string,
  payload: Partial<Omit<MediaRecord, "id" | "created_at">>
) {
  const supabase = await createClient();

  const updatedFields: Record<string, any> = {
    ...payload,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("media")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating media ${id}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/media");
  revalidatePath("/gallery");
  return { success: true, data: data as MediaRecord };
}

/**
 * DELETE: Remove media item by ID
 */
export async function deleteMedia(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("media").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting media ${id}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/media");
  revalidatePath("/gallery");
  return { success: true };
}

/**
 * QUICK TOGGLE: Active Status (is_active)
 */
export async function toggleMediaActiveStatus(
  id: string,
  currentStatus: boolean | null
) {
  return updateMedia(id, { is_active: !currentStatus });
}
