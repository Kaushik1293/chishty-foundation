import React from 'react';
import AboutCTASection from '../components/about/AboutCTASection';
import CauseHeroSection from '../components/causes/CauseHeroSection';
import CauseCard from '../components/causes/CauseCard';
import { getCauses } from '@/app/(asgard)/asgard/causes/actions';

export default async function CausesContainer() {
  const causes = await getCauses({ isActiveOnly: true });

  return (
    <div className="min-h-screen font-satoshi">
      <CauseHeroSection />

      <div className="container mx-auto px-4 md:px-6 mb-32 mt-20">
        {causes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {causes.map((cause, index) => (
              <CauseCard key={cause.id} cause={cause} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-stroke shadow-sm">
            <h3 className="text-2xl font-bold text-dark-green mb-2">No Active Campaigns</h3>
            <p className="text-dark-green/60">Please check back later for updates on our latest initiatives.</p>
          </div>
        )}
      </div>

      <AboutCTASection />
    </div>
  );
}
