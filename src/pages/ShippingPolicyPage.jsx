import React from 'react'
import './Document.css'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import { MobileContextProvider } from '../components/mobile-context/MobileContext'

function ShippingPolicyPage() {
  return (
    <div>
      <MobileContextProvider>

        <Navbar/>
        <div className='document-container'>
          <h1>Shipping Policy</h1>
          <div className="document">
              <p>We aim to deliver your orders as quickly as possible while ensuring reliability and safety.</p>
              <h4>Shipping Policy</h4>
              <ul>
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