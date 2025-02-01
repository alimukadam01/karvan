import React from 'react'
import './ContactUs.css'
import { contactUsImage } from '../assets/assetRegistry'

function ContactUs() {
  return (
    <div className='contact-us-container'>
        <div className='contact-us-col1'>
            <h1>Have some queries, suggestions or are just eager to know more?</h1>
            <h2>Get in touch with us from any of the channels below</h2>
        </div>
        <div className="contact-us-col2">
            <div className="contact-us-image-container">
                <img src={ contactUsImage } alt='/' />
            </div>
        </div>
    </div>
  )
}

export default ContactUs