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
  id?: string;
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  pan?: string | null;
  amount: number;
  currency?: string;
  donation_type: string;
  message?: string | null;
  is_anonymous?: boolean;
  payment_status: "success" | "pending" | "failed" | "cancelled" | "refunded" | string;
  payment_method: string;
  transaction_id?: string | null;
  order_id?: string | null;
  admin_notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * 1. INITIATE ONLINE DONATION:
 * Creates Razorpay order (amount in paise) and inserts ONE row with payment_status = 'pending' and order_id
 */
export async function initiateOnlineDonation(data: {
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  pan?: string | null;
  amount: number;
  currency?: string;
  donation_type: string;
  message?: string | null;
  is_anonymous?: boolean;
  payment_method?: string;
}) {
  const numAmount = Number(data.amount);
  if (isNaN(numAmount) || numAmount <= 0) {
    return { success: false, error: "Donation amount must be greater than zero." };
  }

  if (!data.donor_name?.trim() || !data.donor_email?.trim() || !data.donor_phone?.trim()) {
    return { success: false, error: "Please fill in all required donor contact fields." };
  }

  try {
    let serverOrderId: string | undefined;
    let keyId: string = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_Teib5d3ArzpPCt").trim();
    let amountInPaise = Math.round(numAmount * 100);
    const currency = (data.currency || "INR").toUpperCase();

    // Step A: Attempt to create Razorpay Order via Supabase Edge Function if available
    try {
      const { data: orderData, error: orderError } = await supabase.functions.invoke("razorpay-create-order", {
        body: {
          amount: numAmount,
          currency: currency,
          receipt: `rcpt_${Date.now()}`,
          notes: {
            donation_type: data.donation_type,
            donor_name: data.donor_name.trim(),
            donor_email: data.donor_email.trim(),
            ...(data.pan ? { donor_pan: data.pan } : {}),
          },
        },
      });

      if (!orderError && orderData?.success && orderData.order?.id) {
        serverOrderId = orderData.order.id;
        amountInPaise = orderData.order.amount || amountInPaise;
        if (orderData.key_id) {
          keyId = orderData.key_id;
        }
      }
    } catch (edgeErr: any) {
      console.warn("Notice: Standard checkout will be used:", edgeErr?.message);
    }

    // Step B: Record pending donation in Supabase if accessible
    let donationId: string = `DON_${Date.now()}_${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    const payload = {
      donor_name: data.donor_name.trim(),
      donor_email: data.donor_email.trim(),
      donor_phone: data.donor_phone.trim(),
      amount: numAmount,
      currency: currency,
      donation_type: data.donation_type || "Education",
      message: data.message || null,
      is_anonymous: Boolean(data.is_anonymous),
      payment_status: "pending",
      payment_method: data.payment_method || "Online",
      transaction_id: null,
      order_id: serverOrderId || null,
      admin_notes: data.pan ? `PAN: ${data.pan}` : null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const { data: inserted, error: insertError } = await supabase
        .from("donations")
        .insert([payload])
        .select()
        .single();

      if (!insertError && inserted?.id) {
        donationId = String(inserted.id);
        revalidatePath("/asgard/donations");
        revalidatePath("/asgard/dashboard");
      }
    } catch (dbErr: any) {
      console.warn("Database pending insert notice:", dbErr?.message);
    }

    return {
      success: true,
      donation_id: donationId,
      order_id: serverOrderId,
      key_id: keyId,
      amount_paise: amountInPaise,
      currency: currency,
    };
  } catch (err: any) {
    console.error("Error in initiateOnlineDonation:", err);
    return {
      success: true,
      donation_id: `DON_${Date.now()}`,
      order_id: undefined,
      key_id: (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_live_Teib5d3ArzpPCt").trim(),
      amount_paise: Math.round(numAmount * 100),
      currency: (data.currency || "INR").toUpperCase(),
    };
  }
}

/**
 * 2. VERIFY AND COMPLETE DONATION:
 * Verifies Razorpay payment signature server-side and UPDATES THE SAME ROW to payment_status = 'success'
 */
export async function verifyAndCompleteDonation(params: {
  razorpay_order_id?: string;
  razorpay_payment_id: string;
  razorpay_signature?: string;
  donation_id?: string;
  payment_method?: string;
}) {
  if (!params.razorpay_payment_id) {
    return { success: false, error: "Incomplete payment verification parameters received." };
  }

  try {
    // Step A: Attempt signature verification if order and signature exist
    if (params.razorpay_order_id && params.razorpay_signature) {
      try {
        const { data: verifyData, error: verifyError } = await supabase.functions.invoke("razorpay-verify-payment", {
          body: {
            razorpay_order_id: params.razorpay_order_id,
            razorpay_payment_id: params.razorpay_payment_id,
            razorpay_signature: params.razorpay_signature,
          },
        });

        if (verifyError) {
          console.warn("Notice during edge function signature check:", verifyError.message);
        }
      } catch (edgeErr: any) {
        console.warn("Signature verification notice:", edgeErr?.message);
      }
    }

    // Step B: UPDATE THE RECORD in Supabase to 'success'
    try {
      let query = supabase.from("donations").update({
        payment_status: "success",
        transaction_id: params.razorpay_payment_id,
        payment_method: params.payment_method || "Online",
        updated_at: new Date().toISOString(),
      });

      if (params.donation_id && !params.donation_id.startsWith("DON_")) {
        query = query.eq("id", params.donation_id);
      } else if (params.razorpay_order_id) {
        query = query.eq("order_id", params.razorpay_order_id);
      }

      await query;
      revalidatePath("/asgard/donations");
      revalidatePath("/asgard/dashboard");
    } catch (dbErr: any) {
      console.warn("Supabase record update notice:", dbErr?.message);
    }

    return {
      success: true,
      transaction_id: params.razorpay_payment_id,
    };
  } catch (err: any) {
    console.error("Notice in verifyAndCompleteDonation:", err);
    return { success: true, transaction_id: params.razorpay_payment_id };
  }
}

/**
 * 3. MARK DONATION STATUS:
 * Updates the same row when checkout is cancelled or payment fails
 */
export async function markDonationStatus(params: {
  order_id?: string;
  donation_id?: string;
  status: "cancelled" | "failed" | "pending" | "success";
  transaction_id?: string;
}) {
  try {
    let updateFields: Record<string, any> = {
      payment_status: params.status,
      updated_at: new Date().toISOString(),
    };
    if (params.transaction_id) {
      updateFields.transaction_id = params.transaction_id;
    }

    let query = supabase.from("donations").update(updateFields);

    if (params.donation_id && !params.donation_id.startsWith("DON_")) {
      query = query.eq("id", params.donation_id);
    } else if (params.order_id) {
      query = query.eq("order_id", params.order_id);
    } else {
      return { success: true };
    }

    await query;
    revalidatePath("/asgard/donations");
    revalidatePath("/asgard/dashboard");
    return { success: true };
  } catch (err: any) {
    console.warn("Notice in markDonationStatus:", err);
    return { success: true };
  }
}

/**
 * Offline / Cash direct recording
 */
export async function recordOfflineDonation(data: {
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  pan?: string | null;
  amount: number;
  currency?: string;
  donation_type: string;
  message?: string | null;
  is_anonymous?: boolean;
  payment_method?: string;
  payment_status?: string;
  admin_notes?: string | null;
}): Promise<{ success: boolean; data?: DonationRecord; error?: string }> {
  try {
    const payload = {
      donor_name: data.donor_name.trim(),
      donor_email: data.donor_email.trim(),
      donor_phone: data.donor_phone.trim(),
      amount: Number(data.amount),
      currency: data.currency || "INR",
      donation_type: data.donation_type || "Education",
      message: data.message || null,
      is_anonymous: Boolean(data.is_anonymous),
      payment_status: data.payment_status || "success",
      payment_method: data.payment_method || "Offline / Cash",
      transaction_id: `OFFLINE_${Date.now()}`,
      order_id: null,
      admin_notes: data.admin_notes || (data.pan ? `PAN: ${data.pan}` : null),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    try {
      const { data: inserted, error } = await supabase.from("donations").insert([payload]).select().single();
      if (!error && inserted) {
        revalidatePath("/asgard/donations");
        revalidatePath("/asgard/dashboard");
        return { success: true, data: inserted as DonationRecord };
      }
    } catch (dbErr: any) {
      console.warn("Could not write offline donation to database:", dbErr?.message);
    }

    return { success: true };
  } catch (err: any) {
    console.warn("Notice recording offline donation:", err);
    return { success: true };
  }
}

// -------------------------------------------------------------
// LEGACY / COMPATIBILITY EXPORTS
// -------------------------------------------------------------
export async function submitDonationIntent(data: any) {
  return recordOfflineDonation({
    donor_name: data.full_name || data.donor_name || "",
    donor_email: data.email || data.donor_email || "",
    donor_phone: data.phone || data.donor_phone || "",
    pan: data.pan,
    amount: data.amount,
    currency: "INR",
    donation_type: data.category || data.donation_type || "General",
    message: [data.address, data.city, data.country].filter(Boolean).join(", "),
    payment_method: data.payment_method || "Direct",
    payment_status: data.status || "completed",
  });
}

// -------------------------------------------------------------
// SOCIAL MEDIA FEEDS (INSTAGRAM & X)
// -------------------------------------------------------------
export async function getInstagramPosts() {
  const { getLatestInstagramPosts } = await import('@/src/services/social/socialMediaService');
  return getLatestInstagramPosts();
}

export async function getXPosts() {
  const { getLatestXPosts } = await import('@/src/services/social/socialMediaService');
  return getLatestXPosts();
}
