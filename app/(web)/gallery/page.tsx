import React from "react";
import type { Metadata } from "next";
import GalleryContainer from "@/src/containers/GalleryContainer";

export const metadata: Metadata = {
  title: "Programme & Field Gallery | Chishty Foundation",
  description:
    "Photographs and glimpses of Chishty Foundation's service initiatives — Education at Bab ul Ilm, free healthcare camps, daily langar, women empowerment and interfaith events.",
};

export default function GalleryPage() {
  return <GalleryContainer />;
}
