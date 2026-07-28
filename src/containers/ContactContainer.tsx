import React from 'react'
import ContactHeroSection from '../components/contact/ContactHeroSection'
import ContactFormSection from '../components/contact/ContactFormSection'
import ContactMapSection from '../components/contact/ContactMapSection'

const ContactContainer = () => {
  return (
    <div>
      <ContactHeroSection/>

      <ContactFormSection/>

      <ContactMapSection/>
    </div>
  )
}

export default ContactContainer