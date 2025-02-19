import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import ContactUs from '../components/contact-us/ContactUs'
import { MobileContextProvider } from '../components/mobile-context/MobileContext'

function ContactUsPage() {
  return (
    <div>
      <MobileContextProvider>
        <Navbar/>
        <ContactUs/>
        <Footer/>
      </MobileContextProvider>
    </div>
  )
}

export default ContactUsPage