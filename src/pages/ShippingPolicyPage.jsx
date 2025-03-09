import React from 'react'
import './Document.css'
import Navbar from '../components/navbar/Navbar'
import { MobileContextProvider } from '../components/mobile-context/MobileContext'
import { resetScroll } from '../services/utils'

function ShippingPolicyPage() {
  resetScroll()

  return (
    <div>
      <MobileContextProvider>

        <Navbar/>
        <div className='document-container'>
          <h3>Shipping Policy</h3>
          <div className="document">
              <p style={{"marginBottom": "12px"}}>We aim to deliver your orders as quickly as possible while ensuring reliability and safety.</p>
              <ul style={{ "padding-left": "16px" }}>
                <li>Flat-rate shipping across Pakistan is PKR 250.</li>
                <li>Free shipping on orders above PKR 7500.</li>
                <li>Orders within Karachi shall be delivered within 2-3 business days under normal operating conditions.</li>
                <li>Orders outside Karachi shall be delivered within 5-7 business days under normal operating conditions.</li>
                <li>Once your order is placed, you'll receive a confirmation email or SMS.</li>
                <li>Tracking details will be shared once your order is dispatched.</li>
                <li>Unexpected delays due to weather, strikes, or other unforeseen circumstances may affect delivery times.
                  We appreciate your patience in such cases.
                </li>
              </ul>
          </div>
        </div>

      </MobileContextProvider>
    </div>
  )
}

export default ShippingPolicyPage