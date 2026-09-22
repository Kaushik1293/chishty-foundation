"use server";

import { createClient as createSSRClient } from "@/src/utils/supabase/server";
import { createClient as createDirectClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://liefgpgxctgnntokernd.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_VgNPF1O9ksecEUlos4oHUw_XvMig14_";

export interface DonationRecord {
  id?: string;
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  amount: number;
  currency?: string;
  donation_type: string;
  message?: string | null;
  is_anonymous?: boolean;
  payment_status:
    | "success"
    | "completed"
    | "pending"
    | "failed"
    | "cancelled"
    | "refunded"
    | string;
  payment_method?: string | null;
  transaction_id?: string | null;
  order_id?: string | null;
  admin_notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Returns a direct Supabase client (reliable for querying table directly)
 */
function getDirectClient() {
  return createDirectClient(supabaseUrl, supabaseKey);
}

/**
 * Helper to get a working Supabase client with fallback
 */
async function getSupabaseInstance() {
  try {
    return await createSSRClient();
  } catch (err) {
    console.warn("[Asgard Donations] SSR client creation failed, using direct client:", err);
    return getDirectClient();
  }
}

/**
 * READ: Get all donations with optional filters from Supabase
 */
export async function getDonations(options?: {
  search?: string;
  status?: string;
  category?: string;
  paymentMethod?: string;
}) {
  try {
    console.log("[Asgard Donations] Fetching donations with options:", options);
    
    // Use direct client first to bypass any session-based RLS restrictions on admin reading
    const directClient = getDirectClient();
    let query = directClient
      .from("donations")
      .select("*")
      .order("created_at", { ascending: false });

    if (options?.status && options.status !== "All") {
      query = query.eq("payment_status", options.status.toLowerCase());
    }

    if (options?.category && options.category !== "All") {
      query = query.eq("donation_type", options.category);
    }

    if (options?.paymentMethod && options.paymentMethod !== "All") {
      query = query.eq("payment_method", options.paymentMethod);
    }

    let { data, error } = await query;

    // If direct client had an issue or returned no data, fallback to SSR client
    if (error || !data || data.length === 0) {
      if (error) {
        console.warn("[Asgard Donations] Direct client query had error:", error.message, "- trying SSR client fallback");
      }
      try {
        const ssrClient = await getSupabaseInstance();
        let retryQuery = ssrClient
          .from("donations")
          .select("*")
          .order("created_at", { ascending: false });

        if (options?.status && options.status !== "All") {
          retryQuery = retryQuery.eq("payment_status", options.status.toLowerCase());
        }
        if (options?.category && options.category !== "All") {
          retryQuery = retryQuery.eq("donation_type", options.category);
        }
        if (options?.paymentMethod && options.paymentMethod !== "All") {
          retryQuery = retryQuery.eq("payment_method", options.paymentMethod);
        }

        const retryRes = await retryQuery;
        if (!retryRes.error && retryRes.data && retryRes.data.length > 0) {
          data = retryRes.data;
          error = null;
        } else if (retryRes.error) {
          console.error("[Asgard Donations] SSR fallback also returned error:", retryRes.error.message);
        }
      } catch (fallbackErr) {
        console.error("[Asgard Donations] SSR fallback exception:", fallbackErr);
      }
    }

    if (error) {
      console.error("[Asgard Donations] Error fetching donations from Supabase:", error);
      return [];
    }

    console.log(`[Asgard Donations] Successfully fetched ${data?.length ?? 0} donations.`);
    return (data || []) as DonationRecord[];
  } catch (error) {
    console.error("[Asgard Donations] Unexpected failure to connect or fetch donations:", error);
    return [];
  }
}

/**
 * CREATE: Record a new manual / offline donation (Admin entry)
 */
export async function createDonation(donationData: {
  donor_name: string;
  donor_email: string;
  donor_phone: string;
  amount: number;
  currency?: string;
  donation_type?: string;
  message?: string | null;
  is_anonymous?: boolean;
  payment_method?: string;
  payment_status?: string;
  admin_notes?: string | null;
}) {
  try {
    const directClient = getDirectClient();

    const payload = {
      donor_name: donationData.donor_name.trim(),
      donor_email: donationData.donor_email.trim(),
      donor_phone: donationData.donor_phone.trim(),
      amount: Number(donationData.amount),
      currency: donationData.currency || "INR",
      donation_type: donationData.donation_type || "General",
      message: donationData.message?.trim() || null,
      is_anonymous: Boolean(donationData.is_anonymous),
      payment_status: donationData.payment_status || "pending",
      payment_method: donationData.payment_method || "Offline / Cash",
      transaction_id: null,
      order_id: null,
      admin_notes: donationData.admin_notes?.trim() || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await directClient
      .from("donations")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("[Asgard Donations] Error creating donation entry in Supabase:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/asgard/donations");
    revalidatePath("/asgard/dashboard");
    return { success: true, data: data as DonationRecord };
  } catch (err: any) {
    console.error("[Asgard Donations] Error creating donation:", err);
    return { success: false, error: err.message || "Failed to create donation" };
  }
}

/**
 * UPDATE: Update an existing donation's editable details (donor info, type, message, admin notes)
 * Does NOT allow changing transaction_id, order_id, payment_method, or payment_status
 */
export async function updateDonation(
  id: string,
  updates: {
    donor_name?: string;
    donor_email?: string;
    donor_phone?: string;
    donation_type?: string;
    message?: string | null;
    is_anonymous?: boolean;
    admin_notes?: string | null;
  }
) {
  try {
    const directClient = getDirectClient();

    const payload: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };

    if (updates.donor_name !== undefined) payload.donor_name = updates.donor_name.trim();
    if (updates.donor_email !== undefined) payload.donor_email = updates.donor_email.trim();
    if (updates.donor_phone !== undefined) payload.donor_phone = updates.donor_phone.trim();
    if (updates.donation_type !== undefined) payload.donation_type = updates.donation_type;
    if (updates.message !== undefined) payload.message = updates.message?.trim() || null;
    if (updates.is_anonymous !== undefined) payload.is_anonymous = Boolean(updates.is_anonymous);
    if (updates.admin_notes !== undefined) payload.admin_notes = updates.admin_notes?.trim() || null;

    const { data, error } = await directClient
      .from("donations")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("[Asgard Donations] Error updating donation in Supabase:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/asgard/donations");
    revalidatePath("/asgard/dashboard");
    return { success: true, data: data as DonationRecord };
  } catch (err: any) {
    console.error("[Asgard Donations] Error updating donation:", err);
    return { success: false, error: err.message || "Failed to update donation" };
  }
}

/**
 * DELETE: Remove a donation record
 */
export async function deleteDonation(id: string) {
  try {
    const directClient = getDirectClient();

    const { error } = await directClient
      .from("donations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("[Asgard Donations] Error deleting donation in Supabase:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/asgard/donations");
    revalidatePath("/asgard/dashboard");
    return { success: true };
  } catch (err: any) {
    console.error("[Asgard Donations] Error deleting donation:", err);
    return { success: false, error: err.message || "Failed to delete donation" };
  }
}
