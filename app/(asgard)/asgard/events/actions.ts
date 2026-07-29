"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface EventRecord {
  id?: number;
  is_featured: boolean;
  title: string | null;
  slug: string | null;
  short_description: string | null;
  description: string | null;
  banner_image: string | null;
  icon: string | null;
  event_date: string | null;
  is_active: boolean | null;
  created_at?: string;
  updated_at?: string | null;
}

/**
 * Generate a URL-friendly slug from title
 */
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

/**
 * READ: Fetch all events with optional filters (Search, Active, Featured)
 */
export async function getEvents(options?: {
  search?: string;
  isActiveOnly?: boolean;
  isFeaturedOnly?: boolean;
}) {
  const supabase = await createClient();

  let query = supabase.from("events").select("*").order("created_at", { ascending: false });

  if (options?.isActiveOnly) {
    query = query.eq("is_active", true);
  }

  if (options?.isFeaturedOnly) {
    query = query.eq("is_featured", true);
  }

  if (options?.search && options.search.trim() !== "") {
    const term = `%${options.search.trim()}%`;
    query = query.or(`title.ilike.${term},short_description.ilike.${term},description.ilike.${term}`);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching events:", error);
    throw new Error(error.message);
  }

  return (data as EventRecord[]) ?? [];
}

/**
 * READ: Fetch single event by ID
 */
export async function getEventById(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw new Error(error.message);
  }

  return data as EventRecord;
}

/**
 * READ: Fetch single event by slug
 */
export async function getEventBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching event by slug ${slug}:`, error);
    return null;
  }

  return data as EventRecord;
}

/**
 * CREATE: Add a new event to Supabase
 */
export async function createEvent(payload: Omit<EventRecord, "id" | "created_at" | "updated_at">) {
  const supabase = await createClient();

  const generatedSlug = payload.slug && payload.slug.trim() !== ""
    ? slugify(payload.slug)
    : payload.title
      ? slugify(payload.title)
      : `event-${Date.now()}`;

  const newRecord = {
    is_featured: payload.is_featured ?? false,
    title: payload.title || null,
    slug: generatedSlug,
    short_description: payload.short_description || null,
    description: payload.description || null,
    banner_image: payload.banner_image || null,
    icon: payload.icon || null,
    event_date: payload.event_date || null,
    is_active: payload.is_active ?? true,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("events")
    .insert([newRecord])
    .select()
    .single();

  if (error) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/events");
  revalidatePath("/events");
  return { success: true, data: data as EventRecord };
}

/**
 * UPDATE: Edit existing event in Supabase
 */
export async function updateEvent(id: number, payload: Partial<Omit<EventRecord, "id" | "created_at">>) {
  const supabase = await createClient();

  const updatedFields: Record<string, any> = {
    ...payload,
    updated_at: new Date().toISOString(),
  };

  if (payload.title && (!payload.slug || payload.slug.trim() === "")) {
    updatedFields.slug = slugify(payload.title);
  } else if (payload.slug) {
    updatedFields.slug = slugify(payload.slug);
  }

  const { data, error } = await supabase
    .from("events")
    .update(updatedFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating event ${id}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/events");
  revalidatePath("/events");
  return { success: true, data: data as EventRecord };
}

/**
 * QUICK TOGGLE: Toggle active status (is_active)
 */
export async function toggleEventActiveStatus(id: number, currentStatus: boolean | null) {
  return updateEvent(id, { is_active: !currentStatus });
}

/**
 * QUICK TOGGLE: Toggle featured status (is_featured)
 */
export async function toggleEventFeaturedStatus(id: number, currentStatus: boolean) {
  return updateEvent(id, { is_featured: !currentStatus });
}

/**
 * DELETE: Remove an event by ID
 */
export async function deleteEvent(id: number) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting event ${id}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/events");
  revalidatePath("/events");
  return { success: true };
}
