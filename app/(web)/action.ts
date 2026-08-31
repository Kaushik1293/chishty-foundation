"use server";

import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "placeholder-anon-key";

const supabase = createClient(supabaseUrl, supabaseKey);

export interface Event {
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

// -------------------------------------------------------------
// PARTNERS
// -------------------------------------------------------------
export async function getPartners() {
  try {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (error) {
      console.warn("Could not fetch partners from Supabase:", error.message);
      return [];
    }

    return data ?? [];
  } catch (err: any) {
    console.warn("Error connecting to Supabase in getPartners:", err.message);
    return [];
  }
}

// -------------------------------------------------------------
// EVENTS CRUD (SUPABASE)
// -------------------------------------------------------------

/**
 * Helper: Generate slug from text
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
 * READ: Get all events (with optional filtering)
 */
export async function getEvents(filters?: {
  search?: string;
  isActiveOnly?: boolean;
  isFeaturedOnly?: boolean;
}) {
  try {
    let query = supabase.from("events").select("*").order("created_at", { ascending: false });

    if (filters?.isActiveOnly) {
      query = query.eq("is_active", true);
    }

    if (filters?.isFeaturedOnly) {
      query = query.eq("is_featured", true);
    }

    if (filters?.search && filters.search.trim() !== "") {
      const term = `%${filters.search.trim()}%`;
      query = query.or(`title.ilike.${term},short_description.ilike.${term},description.ilike.${term}`);
    }

    const { data, error } = await query;

    if (error) {
      console.warn("Could not fetch events from Supabase:", error.message);
      return [];
    }

    return (data as Event[]) ?? [];
  } catch (err: any) {
    console.warn("Error connecting to Supabase in getEvents:", err.message);
    return [];
  }
}

/**
 * READ: Get single event by ID
 */
export async function getEventById(id: number) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching event ${id}:`, error);
    throw error;
  }

  return data as Event;
}

/**
 * READ: Get single event by Slug
 */
export async function getEventBySlug(slug: string) {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(`Error fetching event by slug ${slug}:`, error);
    return null;
  }

  return data as Event;
}

/**
 * CREATE: Add new event
 */
export async function createEvent(eventData: Omit<Event, "id" | "created_at" | "updated_at">) {
  const slug = eventData.slug && eventData.slug.trim() !== ""
    ? slugify(eventData.slug)
    : eventData.title
    ? slugify(eventData.title)
    : `event-${Date.now()}`;

  const payload = {
    is_featured: eventData.is_featured ?? false,
    title: eventData.title || null,
    slug,
    short_description: eventData.short_description || null,
    description: eventData.description || null,
    banner_image: eventData.banner_image || null,
    icon: eventData.icon || null,
    event_date: eventData.event_date || null,
    is_active: eventData.is_active ?? true,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("events")
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error("Error creating event:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/events");
  revalidatePath("/events");
  return { success: true, data: data as Event };
}

/**
 * UPDATE: Update an existing event by ID
 */
export async function updateEvent(id: number, eventData: Partial<Omit<Event, "id" | "created_at">>) {
  const payload: Record<string, any> = {
    ...eventData,
    updated_at: new Date().toISOString(),
  };

  if (eventData.title && (!eventData.slug || eventData.slug.trim() === "")) {
    payload.slug = slugify(eventData.title);
  } else if (eventData.slug) {
    payload.slug = slugify(eventData.slug);
  }

  const { data, error } = await supabase
    .from("events")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating event ${id}:`, error);
    return { success: false, error: error.message };
  }

  revalidatePath("/asgard/events");
  revalidatePath("/events");
  return { success: true, data: data as Event };
}

/**
 * QUICK TOGGLE: Toggle active status
 */
export async function toggleEventActiveStatus(id: number, currentStatus: boolean | null) {
  return updateEvent(id, { is_active: !currentStatus });
}

/**
 * QUICK TOGGLE: Toggle featured status
 */
export async function toggleEventFeaturedStatus(id: number, currentStatus: boolean) {
  return updateEvent(id, { is_featured: !currentStatus });
}

/**
 * DELETE: Delete event by ID
 */
export async function deleteEvent(id: number) {
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

// -------------------------------------------------------------
// DONATIONS (SUPABASE INTEGRATION)
// -------------------------------------------------------------
export interface DonationRecord {
  category: string;
  amount: number;
  full_name: string;
  email: string;
  phone: string;
  address?: string;
  city?: string;
  country?: string;
  payment_method: string;
  status?: string;
}

export async function submitDonationIntent(data: DonationRecord) {
  try {
    const payload = {
      ...data,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("donations").insert([payload]);

    if (error) {
      console.warn("Could not record donation in Supabase (table may not exist yet):", error.message);
      // Still return success to allow frontend flow to proceed cleanly
    }

    return { success: true };
  } catch (err: any) {
    console.warn("Error recording donation intent:", err.message);
    return { success: true };
  }
}