import React, { useEffect, useState } from 'react'
import './OrderDetails.css'
import { useNavigate, useLocation, redirect } from 'react-router-dom'
import { fetchBuyerDetails, fetchCities, fetchOrderDetails, finalizeOrder } from '../../services/api'
import { showErrorToast, showSuccessToast } from '../../services/utils'

function OrderDetails() {

  // ORDER ITEMS
  const sizeMapping = {
    "Small": "S",
    "Medium": "M",
    "Large": "L",
    "X-Large": "XL"
  }

  const navigate = useNavigate()
  const location = useLocation()
  const order_id = location.state.order_id || null
  const [order, setOrder] = useState(null)
  const [cities, setCities] = useState(null)
  const [email, setEmail] = useState(null)
  const [city, setCity] = useState(null)
  const handleCityChange = (e)=>{
    const selectedCity = cities.find(
      (obj) => obj.name === e.target.value
    )
    setCity(selectedCity)
    setFormData((prevFormData) => ({
      ...prevFormData,
      city_id: selectedCity.id,
    }))
  }

  useEffect(()=>{

    const getOrderDetails = async ()=>{
      try{
        const data = await fetchOrderDetails(order_id)
        setOrder(data)
      }catch(error){
        showErrorToast("Oops! we ran into an error. Please load this page again.")
        console.log(error)
      }
    }

    getOrderDetails();
  }, [order_id])

  useEffect(()=>{
    
    const getCities = async ()=>{
      try{
        const res = await fetchCities()
        if (res){
          setCities(res)
        }
      }catch(error){
        console.log(error)
      }
    }
    getCities()

  }, [])

  // FORM FIELDS
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    apt_suite: "",
    alt_phone: "",
    postal_code: "",
    notes: ""
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
      apt_suite: buyer.addresses[0]?.apt_suite,
      city_id: buyer?.addresses[0]?.city.id,
      alt_phone: buyer.addresses[0]?.phone,
      postal_code: buyer.addresses[0]?.postal_code
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const is_finalized = await finalizeOrder(order_id, formData)
      if (is_finalized){
        navigate("/")
        showSuccessToast("Order finalized! Your Karvan outfits are on their way!")
      }else{
        showErrorToast("Oops! Something went wrong. Please try again.")
      }
    }catch(error){
      console.log(error)
      showErrorToast("Oops! Something went wrong. Please try again.")
    }
  }
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = async (e)=>{
    const value = e.target.value
    setEmail(value)

    if (validateEmail(email)){
      const buyer = await fetchBuyerDetails(email)
      if (buyer){
        autoFillForm(buyer)
      }
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      email: value,
    }))
  }

  return (
    <div className='order-details-checkout-container'>
        <div className='order-details-container'>
          <form>
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
            
              <input id='full-row-field' type='text' placeholder='Address' value={formData.address} onChange={handleFieldChange}/>
            
              <div className="fields-container">
                <input type='text' placeholder='Apartment/Suite' value={formData.apt_suite} onChange={handleFieldChange}/>
                <select 
                  name="city" 
                  onChange={ handleCityChange }
                  placeholder="Select City"
                  required
                >
                  {cities?.map((obj, index)=>(
                    <option key={obj.id} value={obj.name}>{obj.name}</option>
                  ))}
                </select>
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
            <textarea 
              name="notes"
              rows={5} cols={20} 
              placeholder='Drop in some order notes here!' 
              value={formData.notes} 
              onChange={ handleFieldChange }
            />
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
                  <p>{city? city.shipping_charges: '-'}</p>
              </div>

              <hr/>
              
              <div className="summary-item">
                  <p>Grand Total</p>
                  <p>PKR {order?.payment.amount + (city?.shipping_charges || 0)}</p>
              </div>
            </div>
            
            <button type='submit' onClick={ handleSubmit }>
              Confirm Order
            </button>
          </div>
        </div>
    </div>
  )
}

export default OrderDetails;