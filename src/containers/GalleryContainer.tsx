import React from "react";
import GalleryHero from "../components/gallery/GalleryHero";
import GalleryGrid from "../components/gallery/GalleryGrid";
import AboutCTASection from "../components/about/AboutCTASection";

export default function GalleryContainer() {
  return (
    <div className="min-h-screen bg-beige font-satoshi">
      <GalleryHero />
      <GalleryGrid />
      <AboutCTASection />
    </div>
  );
}
