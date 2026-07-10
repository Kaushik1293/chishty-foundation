"use server";

import { createClient } from "@/src/utils/supabase/server";

const getPartners = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (error) throw error;

    return data ?? [];
  } catch (error) {
    console.error("Error fetching partners:", error);
    throw error;
  }
};

const getEvents = async () => {
  try {
    const supabase = await createClient();

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_active", true)
      .order("event_date", { ascending: true });

    if (error) throw error;

    return data ?? [];
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export {
  getPartners,
  getEvents,
};