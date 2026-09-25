import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://liefgpgxctgnntokernd.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "sb_publishable_VgNPF1O9ksecEUlos4oHUw_XvMig14_";

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );