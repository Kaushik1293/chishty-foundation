import React from "react";
import type { Metadata } from "next";
import DonationContainer from "@/src/containers/DonationContainer";

export const metadata: Metadata = {
  title: "Donate Online | 50% Tax Exemption (80G) | Chishty Foundation",
  description:
    "Support Chishty Foundation charitable initiatives including langar, child education, healthcare and community upliftment. 50% Tax Exemption available under Section 80G.",
};

export default function DonationPage() {
  return <DonationContainer />;
}
