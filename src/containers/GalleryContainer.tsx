import React from "react";
import GalleryHero from "../components/gallery/GalleryHero";
import GalleryGrid from "../components/gallery/GalleryGrid";
import AboutCTASection from "../components/about/AboutCTASection";
import { getMedia, MediaRecord } from "@/app/(asgard)/asgard/media/actions";

export default async function GalleryContainer() {
  let mediaItems: MediaRecord[] = [];
  try {
    mediaItems = await getMedia({ isActiveOnly: true });
  } catch (err) {
    console.error("Error loading media for gallery page:", err);
  }

  return (
    <div className="min-h-screen bg-beige font-satoshi">
      <GalleryHero />
      <GalleryGrid mediaItems={mediaItems} />
      <AboutCTASection />
    </div>
  );
}

