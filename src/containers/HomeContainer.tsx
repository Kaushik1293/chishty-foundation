import React from 'react'
import HeroBanner from '../components/sections/homepage/HeroBanner'
import ServicePillarsSection from '../components/sections/homepage/ServicePillarsSection'
import AboutusSection from '../components/sections/homepage/AboutusSection'
import WhatWeDoSection from '../components/sections/homepage/WhatWeDoSection'
import OurPartnersSection from '../components/sections/homepage/OurPartnersSection'
import EventSection from '../components/sections/homepage/EventSection'
import CTASection from '../components/sections/homepage/CTASection'
import { getEvents, getPartners } from '@/app/(web)/action'
import { IEvent, IPartner } from '../types'

const HomeContainer = async () => {

    const partners = await getPartners() as IPartner[];

    const events = await getEvents() as IEvent[];

    return (
        <div>
            <HeroBanner />

            <ServicePillarsSection />

            <AboutusSection />

            <WhatWeDoSection />

            <OurPartnersSection partners={partners} />

            <EventSection events={events} />

            <CTASection />
        </div>
    )
}

export default HomeContainer