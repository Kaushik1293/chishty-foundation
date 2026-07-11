"use server";

import { supabase } from "@/src/utils/supabase/public";

export async function getPartners() {
  const { data, error } = await supabase
    .from("partners")
    .select("*")
    .eq("is_active", true)
    .order("display_order");

  if (error) throw error;

  return data ?? [];
}

export async function getEvents() {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("is_active", true)
    .order("event_date");

  if (error) throw error;

  return data ?? [];
}
