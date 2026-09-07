"use server";

import { createClient } from "@/src/utils/supabase/server";
import { randomUUID } from "crypto";

/**
 * Server action to upload files directly to Supabase Storage buckets
 * (e.g., 'insights', 'media', 'causes', 'events', 'partners')
 */
export async function uploadFile(
  formData: FormData,
  defaultBucket: string = "media"
): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const bucket = (formData.get("bucket") as string) || defaultBucket || "media";

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueId = randomUUID();
    const extension = file.name.split(".").pop() || "png";
    const filename = `${uniqueId}.${extension}`;

    const supabase = await createClient();

    // Upload directly to Supabase Storage bucket
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filename, buffer, {
        contentType: file.type || "application/octet-stream",
        upsert: true,
      });

    if (error) {
      console.error(`Error uploading to Supabase storage bucket "${bucket}":`, error);
      return { success: false, error: error.message };
    }

    // Retrieve public URL from Supabase Storage
    const { data: publicUrlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filename);

    if (!publicUrlData?.publicUrl) {
      return { success: false, error: "Failed to retrieve public URL from Supabase storage" };
    }

    return { success: true, url: publicUrlData.publicUrl };
  } catch (error: any) {
    console.error("Error in Supabase storage uploadFile:", error);
    return { success: false, error: error.message || "Failed to upload file to Supabase storage" };
  }
}
