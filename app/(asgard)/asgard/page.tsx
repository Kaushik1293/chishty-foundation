import { redirect } from "next/navigation";
import { createClient } from "@/src/utils/supabase/server";

export default async function AsgardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/asgard/dashboard");
  } else {
    redirect("/asgard/login");
  }
}
