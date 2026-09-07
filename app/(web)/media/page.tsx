import React from "react";
import type { Metadata } from "next";
import MediaContainer from "@/src/containers/MediaContainer";

export const metadata: Metadata = {
  title: "Media & Visual Archives | Chishty Foundation",
  description:
    "Explore the visual archives, field photographs, peace delegations, and community outreach moments captured by Chishty Foundation.",
};

export default function MediaPage() {
  return <MediaContainer />;
}
