import React from 'react'
import './OrderDetails.css'
import productImage from '../assets/batch-001-02.png'

function OrderDetails() {
  return (
    <div className='order-details-checkout-container'>
        <div className='order-details-container'>
          <div className='section-title'>
            <h1>Personal Information</h1>
          </div>


        </div>

        <div className="order-notes-checkout-container">
          <div className="order-notes-component">
            <h4>Want us to take special care of something?</h4>
            <textarea rows={5} cols={20} placeholder='Drop in some order notes here!'/>
          </div>

          <div className="checkout-container">
            <h4>Order Summary</h4>
            <div className="checkout-items">
                <div className="checkout-product">
                  <div className="checkout-product-image-details">
                    <div className="checkout-product-image">
                      <img src={productImage} alt="" />
                    </div>
                    <div className="checkout-product-details">
                      <p>IOYM Hoodie x2</p>
                      <p>M</p>
                    </div>
                  </div>
                  <p>6000</p>
                </div>

                <div className="checkout-product">
                  <div className="checkout-product-image-details">
                    <div className="checkout-product-image">
                      <img src={productImage} alt="" />
                    </div>
                    <div className="checkout-product-details">
                      <p>IOYM Hoodie x2</p>
                      <p>M</p>
                    </div>
                  </div>
                  <p>6000</p>
                </div>

                <div className="summary-item">
                    <p>Shipping Cost</p>
                    <p>250</p>
                </div>

                <div className="summary-item">
                    <p>GST</p>
                    <p>320</p>
                </div>

                <hr/>
                
                <div className="summary-item">
                    <p>Grand Total</p>
                    <p>PKR 12,570</p>
                </div>
            </div>
            
            <button type='submit'>
                Confirm Order
            </button>
          </div>
        </div>
    </div>
  )
}

export default OrderDetails;