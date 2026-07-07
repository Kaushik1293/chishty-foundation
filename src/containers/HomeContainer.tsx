import React from 'react'
import HeroBanner from '../components/sections/homepage/HeroBanner'
import ServicePillarsSection from '../components/sections/homepage/ServicePillarsSection'
import AboutusSection from '../components/sections/homepage/AboutusSection'
import WhatWeDoSection from '../components/sections/homepage/WhatWeDoSection'
import OurPartnersSection from '../components/sections/homepage/OurPartnersSection'

const HomeContainer = () => {
    return (
        <div>
            <HeroBanner />

            <ServicePillarsSection />

            <AboutusSection />

            <WhatWeDoSection />

            <OurPartnersSection />
        </div>
    )
}

export default HomeContainer