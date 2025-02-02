import React from 'react'
import './ContactUs.css'
import { contactUsImage } from '../assets/assetRegistry'
import SendEmail from '../sendEmail/SendEmail'

function ContactUs() {
  return (
    <div className='contact-us-container'>
        <div className='contact-us-col1'>
            <div className="contact-us-title">
              <h1>Have some queries, suggestions or are just eager to know more?</h1>
              <h4>Get in touch with us at any of the channels below.</h4>
            </div>

            <div className="contact-us-content">
              <div className="contact-us-email-container">
                <SendEmail/>
              </div>
              <div className="contact-info-container">
                <div className='contact-info-section'>
                  <h5>For Complaints and Queries, Reach out to us at</h5>
                  <div className="contact-info">
                    <div className="contact-us-icon">
                      <i class="fa-solid fa-phone-volume fa-xl" style={{"color": "#ffffff"}}></i>
                    </div>
                    <h5>0331389402</h5>
                  </div>
                  
                  <div className="contact-info">
                    <div className="contact-us-icon">
                      <i class="fa-solid fa-envelope fa-xl" style={{"color": "#ffffff"}}></i>                    
                    </div>
                    <h5>support@karvan.pk</h5>
                  </div>
                </div>

                <div className="contact-info-section">
                    <h5>Find out more about us at</h5>
                    <div className="contact-info">
                      <div className="contact-us-icon">
                        <i class="fa-brands fa-instagram fa-xl" style={{"color": "#ffffff"}}></i>                    
                      </div>
                      <a href="https://www.instagram.com/karvan.pk/"><h5>Instagram</h5></a>
                    </div>

                    <div className="contact-info">
                      <div className="contact-us-icon">
                        <i class="fa-brands fa-facebook fa-xl" style={{"color": "#ffffff"}}></i>                    
                      </div>
                      <a href="https://www.facebook.com/share/161nD3rcXb/"><h5>Facebook</h5></a>
                    </div>
                </div>

              </div>
            </div>
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