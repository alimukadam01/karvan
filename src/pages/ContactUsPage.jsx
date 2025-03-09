import React from 'react'
import Navbar from '../components/navbar/Navbar'
import ContactUs from '../components/contact-us/ContactUs'
import { MobileContextProvider } from '../components/mobile-context/MobileContext'
import { resetScroll } from '../services/utils'  

function ContactUsPage() {
  resetScroll()
  
  return (
    <div>
      <MobileContextProvider>
        <Navbar/>
        <ContactUs/>
      </MobileContextProvider>
    </div>
  )
}

export default ContactUsPage