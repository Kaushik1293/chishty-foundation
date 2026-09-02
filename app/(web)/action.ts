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
  payment_id?: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
  status?: string;
}

export async function submitDonationIntent(data: DonationRecord) {
  try {
    const payload = {
      ...data,
      status: data.status || (data.payment_id ? "completed" : "pending"),
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

/**
 * Server action to create a Razorpay Order via Orders API
 */
export async function createRazorpayOrder(params: {
  amount: number;
  currency?: string;
  receipt?: string;
  notes?: Record<string, string>;
}) {
  const keyId = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim();
  const keySecret = ("").trim();

  if (!keyId || !keySecret || keyId === "your_razorpay_key_id" || keySecret === "your_razorpay_key_secret") {
    return {
      success: false,
      error: "Razorpay credentials not configured. Please add your real Key ID and Key Secret in .env.local",
    };
  }

  const numAmount = Number(params.amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    return { success: false, error: "Invalid donation amount: must be greater than zero." };
  }

  const amountInPaise = Math.round(numAmount * 100);
  const currency = (params.currency || "INR").toUpperCase();

  try {
    const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${auth}`,
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency,
        receipt: params.receipt || `rcpt_${Date.now()}`,
        notes: params.notes || {},
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      const errMsg =
        res.status === 401
          ? "Razorpay authentication failed: Invalid Key ID or Key Secret."
          : data.error?.description || "Failed to create Razorpay order";
      return { success: false, error: errMsg };
    }

    return {
      success: true,
      order: {
        id: data.id as string,
        amount: data.amount as number,
        currency: data.currency as string,
      },
    };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to connect to Razorpay Orders API" };
  }
}

/**
 * Server action to securely verify Razorpay payment signature
 */
export async function verifyRazorpayPayment(params: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) {
  const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
  if (!keySecret) {
    return { success: false, error: "RAZORPAY_KEY_SECRET is not configured on server" };
  }

  if (!params.razorpay_order_id || !params.razorpay_payment_id || !params.razorpay_signature) {
    return { success: false, error: "Incomplete payment verification parameters" };
  }

  try {
    const crypto = await import("crypto");
    const body = `${params.razorpay_order_id}|${params.razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(body)
      .digest("hex");

    if (expectedSignature === params.razorpay_signature) {
      return { success: true };
    } else {
      return { success: false, error: "Payment verification failed: Signature mismatch" };
    }
  } catch (err: any) {
    return { success: false, error: err.message || "Error verifying payment signature" };
  }
}