import React from 'react';
import AboutCTASection from '../components/about/AboutCTASection';
import CauseHeroSection from '../components/causes/CauseHeroSection';
import CauseCard from '../components/causes/CauseCard';
import { getCauses } from '@/app/(asgard)/asgard/causes/actions';
import { defaultCauses } from '@/src/data/defaultCauses';

export default async function CausesContainer() {
  let causes: any[] = [];
  try {
    causes = await getCauses({ isActiveOnly: true });
  } catch (e) {
    console.error("Error loading causes, using defaults:", e);
  }

  const displayCauses = causes && causes.length > 0 ? causes : defaultCauses;

  return (
    <div className="min-h-screen font-satoshi">
      <CauseHeroSection />

      <div className="container mx-auto px-4 md:px-6 mb-32 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {displayCauses.map((cause, index) => (
            <CauseCard key={cause.id || index} cause={cause} index={index} />
          ))}
        </div>
      </div>

      <AboutCTASection />
    </div>
  );
}
