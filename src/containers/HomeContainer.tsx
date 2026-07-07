import React from 'react'
import HeroBanner from '../components/sections/homepage/HeroBanner'
import ServicePillarsSection from '../components/sections/homepage/ServicePillarsSection'
import AboutusSection from '../components/sections/homepage/AboutusSection'
import WhatWeDoSection from '../components/sections/homepage/WhatWeDoSection'
import OurPartnersSection from '../components/sections/homepage/OurPartnersSection'
import EventSection from '../components/sections/homepage/EventSection'

const HomeContainer = () => {
    return (
        <div>
            <HeroBanner />

            <ServicePillarsSection />

            <AboutusSection />

            <WhatWeDoSection />

            <OurPartnersSection />

            <EventSection/>
        </div>
    )
}

export default HomeContainer