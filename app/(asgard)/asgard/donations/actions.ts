"use server";

import { createClient } from "@/src/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface DonationRecord {
  id?: string | number;
  category: string;
  amount: number;
  full_name: string;
  email: string;
  phone: string;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  payment_method: string;
  payment_id?: string | null;
  razorpay_order_id?: string | null;
  razorpay_signature?: string | null;
  status: "completed" | "pending" | "failed" | "refunded";
  notes?: string | null;
  created_at?: string;
}

/**
 * READ: Get all donations with optional filters
 */
export async function getDonations(options?: {
  search?: string;
  status?: string;
  category?: string;
  paymentMethod?: string;
}) {
  try {
    const supabase = await createClient();

    let query = supabase
      .from("donations")
      .select("*")
      .order("created_at", { ascending: false });

    if (options?.status && options.status !== "All") {
      query = query.eq("status", options.status.toLowerCase());
    }

    if (options?.category && options.category !== "All") {
      query = query.eq("category", options.category);
    }

    if (options?.paymentMethod && options.paymentMethod !== "All") {
      query = query.eq("payment_method", options.paymentMethod);
    }

    const { data, error } = await query;

    if (error) {
      console.warn("Could not fetch donations from Supabase:", error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data as DonationRecord[];
  } catch (error) {
    console.error("Failed to connect or fetch donations:", error);
    return [];
  }
}

/**
 * CREATE: Record a new donation (e.g. offline/cash/bank transfer)
 */
export async function createDonation(donationData: Omit<DonationRecord, "id">) {
  try {
    const supabase = await createClient();

    const payload = {
      category: donationData.category,
      amount: Number(donationData.amount),
      full_name: donationData.full_name,
      email: donationData.email,
      phone: donationData.phone,
      address: donationData.address || null,
      city: donationData.city || null,
      country: donationData.country || "India",
      payment_method: donationData.payment_method || "Offline / Bank Transfer",
      payment_id: donationData.payment_id || `OFFLINE_${Date.now()}`,
      razorpay_order_id: donationData.razorpay_order_id || null,
      razorpay_signature: donationData.razorpay_signature || null,
      status: donationData.status || "completed",
      notes: donationData.notes || null,
      created_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from("donations")
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.error("Error creating donation entry in Supabase:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/asgard/donations");
    revalidatePath("/asgard/dashboard");
    return { success: true, data: data as DonationRecord };
  } catch (err: any) {
    console.error("Error creating donation:", err);
    return { success: false, error: err.message || "Failed to create donation" };
  }
}

/**
 * UPDATE: Update an existing donation
 */
export async function updateDonation(
  id: string | number,
  updates: Partial<DonationRecord>
) {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("donations")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating donation in Supabase:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/asgard/donations");
    revalidatePath("/asgard/dashboard");
    return { success: true, data: data as DonationRecord };
  } catch (err: any) {
    console.error("Error updating donation:", err);
    return { success: false, error: err.message || "Failed to update donation" };
  }
}

/**
 * UPDATE STATUS: Toggle / Update status and optional notes
 */
export async function updateDonationStatus(
  id: string | number,
  status: "completed" | "pending" | "failed" | "refunded",
  notes?: string
) {
  return updateDonation(id, {
    status,
    ...(notes !== undefined ? { notes } : {}),
  });
}

/**
 * DELETE: Remove a donation record
 */
export async function deleteDonation(id: string | number) {
  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("donations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting donation in Supabase:", error);
      return { success: false, error: error.message };
    }

    revalidatePath("/asgard/donations");
    revalidatePath("/asgard/dashboard");
    return { success: true };
  } catch (err: any) {
    console.error("Error deleting donation:", err);
    return { success: false, error: err.message || "Failed to delete donation" };
  }
}
