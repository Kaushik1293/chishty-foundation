import React from 'react'
import GetInvolvedHero from '../components/getInvolved/GetInvolvedHero'
import WhyGetInvolved from '../components/getInvolved/WhyGetInvolved'
import EventSection from '../components/sections/homepage/EventSection'
import { IEvent } from '../types'
import { getEvents } from '@/app/(web)/action'
import AboutCTASection from '../components/about/AboutCTASection'
import WaysToGetInvolved from '../components/getInvolved/WaysToGetInvolved'

const GetInvolvedContainer = async () => {

  const events = await getEvents() as IEvent[];

  return (
    <div>
      <GetInvolvedHero />

      <WhyGetInvolved />

      <WaysToGetInvolved/>

      <EventSection events={events} />

      <AboutCTASection />

    </div>
  )
}

export default GetInvolvedContainer