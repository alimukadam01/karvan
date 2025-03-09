import React from 'react'
import './Document.css'
import Navbar from '../components/navbar/Navbar'
import { MobileContextProvider } from '../components/mobile-context/MobileContext'
import { resetScroll } from '../services/utils'

function ReturnExchangePage() {
  resetScroll()
  
  return (
    <div>
      <MobileContextProvider>
        <Navbar/>
        <div className='document-container'>
          <h3>Refund/Exchange Policy</h3>
          <div className="document">
              <p>
                  At Karvan, we value customer satisfaction and strive to ensure a seamless shopping experience. 
                  Here’s our policy for refunds and exchanges:
              </p>
              <h5>Exchange Policy</h5>
              <ul>
                <li><p>Items are eligible for exchange within 7 days of delivery.</p></li>
                <li><p>The product must be unused, unwashed, and in its original condition with tags and packaging intact.</p></li>
                <li><p>Exchanges are subject to stock availability.</p></li>
              </ul>

              <h5>Refund Policy</h5>
              <ul>
                <li><p>Refunds are only applicable if the product is defective or damaged upon delivery.</p></li>
                <li><p>Refund requests must be made within 7 days of receiving the item.</p></li>
                <li><p>Refunds will be processed via the original payment method.</p></li>
              </ul>

              <div className="document-note">
                <p>
                  The cost of shipping for exchanges will be borne by 
                  the customer unless the product is defective or incorrect.
                </p>
              </div>
          </div>
        </div>
      </MobileContextProvider>
    </div>
  )
}

export default ReturnExchangePage