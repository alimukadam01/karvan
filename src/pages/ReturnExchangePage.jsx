import React from 'react'
import './Document.css'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import { MobileContextProvider } from '../components/mobile-context/MobileContext'

function ReturnExchangePage() {
  return (
    <div>
      <MobileContextProvider>
        <Navbar/>
        <div className='document-container'>
          <h1>Refund/Exchange Policy</h1>
          <div className="document">
              <p>
                  At Karvan, we value customer satisfaction and strive to ensure a seamless shopping experience. 
                  Here’s our policy for refunds and exchanges:
              </p>
              <h4>Exchange Policy</h4>
              <ul>
                <li>Items are eligible for exchange within 7 days of delivery.</li>
                <li>The product must be unused, unwashed, and in its original condition with tags and packaging intact.</li>
                <li>Exchanges are subject to stock availability.</li>
              </ul>

              <h4>Refund Policy</h4>
              <ul>
                <li>Refunds are only applicable if the product is defective or damaged upon delivery.</li>
                <li>Refund requests must be made within 7 days of receiving the item.</li>
                <li>Refunds will be processed via the original payment method.</li>
              </ul>

              <div className="document-note">
                The cost of shipping for exchanges will be borne by 
                the customer unless the product is defective or incorrect.
              </div>
          </div>
        </div>
      </MobileContextProvider>
    </div>
  )
}

export default ReturnExchangePage