"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export async function uploadFile(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get("file") as File;
    if (!file) {
      return { success: false, error: "No file provided" };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const uniqueId = randomUUID();
    const extension = file.name.split(".").pop() || "png";
    const filename = `${uniqueId}.${extension}`;

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), "public", "uploads");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (e) {
      // Ignore if directory exists
    }

    // Write file to public/uploads
    const path = join(uploadsDir, filename);
    await writeFile(path, buffer);

    // Return the URL
    return { success: true, url: `/uploads/${filename}` };
  } catch (error: any) {
    console.error("Error uploading file:", error);
    return { success: false, error: error.message || "Failed to upload file" };
  }
}
