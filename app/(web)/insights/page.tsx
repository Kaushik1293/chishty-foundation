import React from "react";
import type { Metadata } from "next";
import InsightsContainer from "@/src/containers/InsightsContainer";

export const metadata: Metadata = {
  title: "Articles, Research & Insights | Chishty Foundation",
  description:
    "Explore spiritual discourses, research publications, and articles on universal brotherhood, interfaith harmony, and welfare initiatives by Chishty Foundation.",
};

export default function InsightsPage() {
  return <InsightsContainer />;
}
