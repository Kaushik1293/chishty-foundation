import React from 'react'
import AboutHeroBanner from '../components/about/AboutHeroBanner'
import AboutJourneySection from '../components/about/AboutJourneySection'
import AboutWhatWeDo from '../components/about/AboutWhatWeDo'
import OurPartnersSection from '../components/sections/homepage/OurPartnersSection'
import { getPartners } from '@/app/(web)/action'
import { IPartner } from '../types'
import AboutKPISection from '../components/about/AboutKPISection'
import AboutCTASection from '../components/about/AboutCTASection'

const AboutContainer = async () => {

    const partners = await getPartners() as IPartner[];

    return (
        <div>
            <AboutHeroBanner />

            <AboutJourneySection />

            <AboutWhatWeDo />

            <OurPartnersSection partners={partners} />

            <AboutKPISection/>

            <AboutCTASection/>
        </div>
    )
}

export default AboutContainer