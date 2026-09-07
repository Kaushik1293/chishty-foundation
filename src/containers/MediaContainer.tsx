import React from "react";
import MediaHero from "../components/media/MediaHero";
import MediaGrid from "../components/media/MediaGrid";
import AboutCTASection from "../components/about/AboutCTASection";
import { getMedia, MediaRecord } from "@/app/(asgard)/asgard/media/actions";
import { defaultMediaItems } from "@/src/data/defaultMedia";

export default async function MediaContainer() {
  let mediaItems: MediaRecord[] = [];
  try {
    mediaItems = await getMedia({ isActiveOnly: true });
  } catch (err) {
    console.error("Error loading media for frontend:", err);
  }

  const displayMedia =
    mediaItems && mediaItems.length > 0 ? mediaItems : (defaultMediaItems as MediaRecord[]);

  return (
    <div className="min-h-screen bg-beige font-satoshi">
      <MediaHero />
      <MediaGrid mediaItems={displayMedia} />
      <AboutCTASection />
    </div>
  );
}
