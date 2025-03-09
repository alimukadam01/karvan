import React from 'react'
import './Document.css'
import Navbar from '../components/navbar/Navbar'
import { MobileContextProvider } from '../components/mobile-context/MobileContext'
import { resetScroll } from '../services/utils'   

function PrivacyPolicyPage() {
  resetScroll()
  
  return (
    <div>
      <MobileContextProvider>

        <Navbar/>
        <div className='document-container'>
            <h3>Privacy Policy</h3>
            <div className="document">
                <p style={{"marginBottom": "12px"}}>
                  Your privacy is a priority at Karvan, and we are committed 
                  to safeguarding your personal information.
                </p>
                
                <h5>Information we collect</h5>
                <ul style={{ "padding-left": "16px" }}>
                  <li>Name, contact details, and shipping address.</li>
                  <li>Payment information (processed securely via third-party payment gateways).</li>
                  <li>Optional: Email and phone number for marketing updates.</li>
                </ul>

                <h5>Use of Information</h5>
                <ul style={{ "padding-left": "16px" }}>
                  <li>To process and deliver your orders.</li>
                  <li>To improve our services and customize your shopping experience.</li>
                  <li>Your data is stored securely and is only accessed by authorized personnel.</li>
                  <li>We do not share, sell, or rent your personal information to third parties.</li>
                  <li>For privacy-related inquiries or data access requests, email us at support@karvan.pk</li>
                </ul>
            </div>
        </div>

      </MobileContextProvider>
    </div>
  )
}

export default PrivacyPolicyPage