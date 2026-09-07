import React from "react";
import InsightsHero from "../components/insights/InsightsHero";
import InsightsGrid from "../components/insights/InsightsGrid";
import AboutCTASection from "../components/about/AboutCTASection";
import { getInsights, InsightRecord } from "@/app/(asgard)/asgard/insights/actions";
import { defaultInsights } from "@/src/data/defaultInsights";

export default async function InsightsContainer() {
  let insights: InsightRecord[] = [];
  try {
    insights = await getInsights({ isActiveOnly: true });
  } catch (err) {
    console.error("Error loading insights for frontend:", err);
  }

  const displayInsights =
    insights && insights.length > 0 ? insights : (defaultInsights as InsightRecord[]);

  return (
    <div className="min-h-screen bg-beige font-satoshi">
      <InsightsHero />
      <InsightsGrid insights={displayInsights} />
      <AboutCTASection />
    </div>
  );
}
