import React, { useEffect, useState } from 'react'
import './OrderDetails.css'
import { useNavigate, useLocation } from 'react-router-dom'
import productImage from '../assets/batch-001-02.png'
import { fetchBuyerDetails, fetchOrderDetails, finalizeOrder } from '../../services/api'

function OrderDetails() {

  // ORDER ITEMS
  const sizeMapping = {
    "Small": "S",
    "Medium": "M",
    "Large": "L",
    "X-Large": "XL"
  }

  const location = useLocation()
  const order_id = location.state.order_id || null
  const [order, setOrder] = useState(null)

  useEffect(()=>{

    const getOrderDetails = async ()=>{
      try{
        const data = await fetchOrderDetails(order_id)
        setOrder(data)
        console.log(order)
      }catch(error){
        console.log("caught an error")
        console.log(error)
      }
    }

    getOrderDetails();
  }, [order_id])

  // FORM FIELDS
  

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    apt_suite: "",
    city: "",
    alt_phone: "",
    postal_code: ""
  })

  const handleFieldChange = (e)=>{
    const { name, value } = e.target;
    setFormData((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  }

  const autoFillForm = (buyer)=>{
    setFormData({
      first_name: buyer.first_name,
      last_name: buyer.last_name,
      phone: buyer.phone,
      address: buyer.addresses[0]?.address,
      city: buyer.addresses[0]?.city.name,
      alt_phone: buyer.addresses[0]?.phone,
      postal_code: buyer.addresses[0]?.postal_code
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      email,
      ...formData
    };
    console.log("Form Submitted:", formData);
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const [email, setEmail] = useState(null)
  const handleEmailChange = async (e)=>{
    const email = e.target.value
    setEmail(email)

    if (validateEmail(email)){
      const buyer = await fetchBuyerDetails(email)
      if (buyer){
        autoFillForm(buyer)
      }
    }
  }


  return (
    <div className='order-details-checkout-container'>
        <div className='order-details-container'>
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <div className='section-title'>
                <h1>Personal Information</h1>
              </div>

              <div className="fields-container">
                <input type='text' placeholder='First Name' value={formData.first_name} onChange={handleFieldChange}/>
                <input type='text' placeholder='Last Name' value={formData.last_name} onChange={handleFieldChange}/>
                <input type='text' placeholder='Email' value={formData.email} onChange={handleEmailChange}/>
                <input type='text' placeholder='Contact Number' value={formData.phone} onChange={handleFieldChange}/>
              </div>
            </div>
            
            <div className="form-section">
              <div className='section-title'>
                <h1>Delivery Information</h1>
              </div>
            
              <input id='full-row-field' type='text' placeholder='Address'/>
            
              <div className="fields-container">
                <input type='text' placeholder='Apartment/Suite' value={formData.apt_suite} onChange={handleFieldChange}/>
                <input type='text' placeholder='City' value={formData.city} onChange={handleFieldChange}/>
                <input type='text' placeholder='Alt. Phone Number (Optional)' value={formData.alt_phone} onChange={handleFieldChange}/>
                <input type='text' placeholder='Postal Code (Optional)' value={formData.postal_code} onChange={handleFieldChange}/>
              </div>
            
            </div>
            
            <div className="shipping-container">
              <h4>Shipping</h4>
              <div className="payment-button-selected">
                <p>Standard Shipping</p>
                <p>PKR 250</p>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">
                <h1>Payment</h1>
              </div>

              <div className="payment-button-selected">
                <p>Payment via Debit/Credit Card</p>
              </div>
              
              <div className="payment-button">
                <p>Cash on Delivery</p>
              </div>
            </div>
          </form>
        </div>

        <div className="order-notes-checkout-container">
          <div className="order-notes-component">
            <h4>Want us to take special care of something?</h4>
            <textarea rows={5} cols={20} placeholder='Drop in some order notes here!'/>
          </div>

          <div className="checkout-container">
            <h4>Order Summary</h4>
            <div className="checkout-items">
              {order?.items.map((item, index)=>(
                <div className="checkout-product">
                  <div className="checkout-product-image-details">
                    <div className="checkout-product-image">
                      <img src={item.product.images[0].image} alt="" />
                    </div>
                    <div className="checkout-product-details">
                      <p>{item.product.name} x {item.quantity}</p>
                      <p>{sizeMapping[item.size]}</p>
                    </div>
                  </div>
                  <p>{item.product.price}</p>
                </div>
              ))}
        

              <div className="summary-item">
                  <p>Shipping Cost</p>
                  <p>250</p>
              </div>

              <hr/>
              
              <div className="summary-item">
                  <p>Grand Total</p>
                  <p>PKR {order?.payment.amount}</p>
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