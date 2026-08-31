import React from "react";
import DonationHeroSection from "../components/donation/DonationHeroSection";
import DonationFormSection from "../components/donation/DonationFormSection";
import DonationImpactSection from "../components/donation/DonationImpactSection";

const DonationContainer = () => {
  return (
    <div className="min-h-screen bg-beige">
      <DonationHeroSection />
      <DonationFormSection />
      <DonationImpactSection />
    </div>
  );
};

export default DonationContainer;
