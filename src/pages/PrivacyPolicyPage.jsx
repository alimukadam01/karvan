import React from 'react'
import './Document.css'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

function PrivacyPolicyPage() {
  return (
    <div>
      <Navbar/>
      <div className='document-container'>
          <h1>Privacy Policy</h1>
          <div className="document">
              <p>
                Your privacy is a priority at Karvan, and we are committed 
                to safeguarding your personal information.
              </p>
              
              <h4>Information we collect</h4>
              <ul>
                <li>Name, contact details, and shipping address.</li>
                <li>Payment information (processed securely via third-party payment gateways).</li>
                <li>Optional: Email and phone number for marketing updates.</li>
              </ul>

              <h4>Use of Information</h4>
              <ul>
                <li>To process and deliver your orders.</li>
                <li>To improve our services and customize your shopping experience.</li>
                <li>Your data is stored securely and is only accessed by authorized personnel.</li>
                <li>We do not share, sell, or rent your personal information to third parties.</li>
                <li>For privacy-related inquiries or data access requests, email us at support@karvan.pk</li>
              </ul>
          </div>
        </div>
      <Footer/>
    </div>
  )
}

export default PrivacyPolicyPage