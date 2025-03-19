import React, { useEffect, useState } from 'react'
import './OrderDetails.css'
import { SyncLoader } from 'react-spinners' 
import { useMobileContext } from '../mobile-context/MobileContext'
import { useNavigate, useLocation } from 'react-router-dom'
import { fetchBuyerDetails, fetchCities, fetchOrderDetails, finalizeOrder } from '../../services/api'
import { showErrorToast, showSuccessToast } from '../../services/utils'
import { toast } from 'react-toastify'

function OrderDetails() {

  // ORDER ITEMS
  const sizeMapping = {
    "X-Small": "XS", 
    "Small": "S",
    "Medium": "M",
    "Large": "L",
    "X-Large": "XL"
  }

  const navigate = useNavigate()
  const location = useLocation()
  const isMobile = useMobileContext()
  const [isLoading, setIsLoading] = useState(false) 
  const order_id = location.state.order_id || null
  const [order, setOrder] = useState(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const openDetails = ()=>{
    setDetailsOpen(!detailsOpen)
  }  
  const [cities, setCities] = useState(null)
  const [email, setEmail] = useState(null)
  const [city, setCity] = useState()
  const [paymentMode, setPaymentMode] = useState("Cash")
  const handlePaymentModeClick = ()=>{
    if (paymentMode === "Cash"){
      setPaymentMode("Card")
    }else{
      setPaymentMode("Cash")
    }
  }

  const handleCityChange = (e)=>{
    
    const selectedCity = cities.find(
      (obj) => obj.name === e.target.value
    )
    setCity(selectedCity)
    setFormData((prevFormData) => ({
      ...prevFormData,
      city_id: selectedCity? selectedCity.id: null,
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
  const [errors, setErrors] = useState([])
  const keyExists = (key) => key in errors

  const handleFieldChange = (e)=>{
    const { name, value } = e.target;
    setFormData((prevFields) => ({
      ...prevFields,
      [name]: value
    }));
  }

  const autoFillForm = (buyer)=>{
    setFormData({
      email: buyer.email,
      first_name: buyer.first_name,
      last_name: buyer.last_name,
      phone: buyer.phone,
      address: buyer.addresses[0]?.address,
      apt_suite: buyer.addresses[0]?.apt_suite,
      alt_phone: buyer.addresses[0]?.phone,
      postal_code: buyer.addresses[0]?.postal_code,
      city_id: buyer.addresses[0]?.city.id
    })
  }

  const validateForm = () =>{
    let newErrors = {}

    if (!formData.first_name.trim()) newErrors.first_name = "First name is required"
    if (!formData.last_name.trim()) newErrors.last_name = "Last name is required"
    if (!formData.phone) newErrors.phone = "Contact Number is required"
    if (formData.phone){
      if (!/^\d{11}$/.test(formData.phone)) newErrors.phone = "Phone number must be atleast 11 digits"
    }
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.email) newErrors.email = "Email is required"
    if (!validateEmail(formData.email)) newErrors.email = "Please provide a valid email"
    if (formData.alt_phone){
      if (!/^\d{11}$/.test(formData.alt_phone)) newErrors.alt_phone = "Phone number must be atleast 11 digits"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()){
      try{
        setIsLoading(true)
        const is_finalized = await finalizeOrder(order_id, formData)
        if (is_finalized){
          setIsLoading(false)
          navigate("/")
          showSuccessToast("Order finalized! Your Karvan outfits are on their way!")
        }else{
          setIsLoading(false)
          showErrorToast("Oops! Something went wrong. Please try again.")
        }
      }catch(error){
        setIsLoading(false)
        console.log(error)
        showErrorToast("Oops! Something went wrong. Please try again.")
      }
    }else{
      showErrorToast("Oops, you missed a spot! Please check the highlighted fields.")
    }
  }
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleEmailChange = async (e)=>{
    const value = e.target.value
    setEmail(value)

    setFormData((prevFormData) => ({
      ...prevFormData,
      email: value,
    }))

  }

  // autofills form upon email validation
  useEffect(()=>{
    const get_buyer = async ()=>{
      if (validateEmail(email)){
        const buyer = await fetchBuyerDetails(email)
        if (buyer){
          autoFillForm(buyer)
          setFormData((prevFormData) => ({
            ...prevFormData,
            email: email,
          })) 
          setCity(buyer.addresses[0].city)
        }
      }
    }

    get_buyer()

  }, [email])

  return (
    <div className='order-details-checkout-container'>
      {
        isMobile? (
          <>
            <div className="checkout-container">
              <button className = 'order-details-toggle' onClick={openDetails}>
                <h4>Order Details</h4>
                <i className={`fa-solid fa-caret-${detailsOpen? 'up': 'down'}`}/>
              </button>
              {detailsOpen? (
                <div className="checkout-items">
                  {order?.items.map((item, index)=>(
                    <div key={item.id} className="checkout-product">
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
              ): (<div></div>)}
            </div>

            <div className='order-details-container'>
                <form>
                  <div className="form-section">
                    <div className='section-title'>
                      <h3>Personal Information</h3>
                    </div>

                    <div className="fields-container">
                      <input type='text' name="first_name" className={keyExists("first_name")? "input-error": ""} placeholder={keyExists("first_name")? errors["first_name"]: "First Name*"} value={formData.first_name} onChange={handleFieldChange}/>
                      <input type='text' name="last_name" placeholder='Last Name (Optional)' value={formData.last_name} onChange={handleFieldChange}/>
                      <input type='text' name="email" className={keyExists("email")? "input-error": ""} placeholder={keyExists("email")? errors["email"]: "Email*"} value={formData.email} onChange={handleEmailChange}/>
                      <input type='text' name="phone" className={keyExists("phone")? "input-error": ""} placeholder={keyExists("phone")? errors["phone"]: "Contact Number*"} value={formData.phone} onChange={handleFieldChange}/>
                    </div>
                  </div>
                  
                  <div className="form-section">
                    <div className='section-title'>
                      <h3>Delivery Information</h3>
                    </div>
                  
                    <input id='full-row-field' type='text' name="address" className={keyExists("address")? "input-error": ""} placeholder={keyExists("address")? errors["address"]: "Address*"} value={formData.address} onChange={handleFieldChange}/>
                  
                    <div className="fields-container">
                      <input type='text' name="apt_suite" placeholder='Apartment/Suite (Optional)' value={formData.apt_suite} onChange={handleFieldChange}/>
                      <div id='city-dropdown'>
                        <select 
                          name="city" 
                          onChange={ handleCityChange }
                          value={city?.name || null}
                          required
                        >
                          <option key={''} value={null}>Select City*</option>
                          {cities?.map((obj, index)=>(
                            <option key={obj.id} value={obj.name}>{obj.name}</option>
                          ))}
                        </select>
                        <i className='fa-solid fa-caret-down'/>                      
                      </div>
                      <input type='text' name="alt_phone" className={keyExists("alt_phone")? "input-error": ""} placeholder={keyExists("alt_phone")? errors["alt_phone"]: "Alt. Phone Number (Optional)"} value={formData.alt_phone} onChange={handleFieldChange} style={{"maxWidth": "unset"}}/>
                      <input type='text' name="postal_code" placeholder='Postal Code' value={formData.postal_code} onChange={handleFieldChange} style={{"maxWidth": "unset"}}/>
                    </div>
                  
                  </div>
                  
                  <div className="shipping-container">
                    <h4>Shipping</h4>
                    <div className="payment-button-selected">
                      <p>Standard Shipping</p>
                      <i className="fa-solid fa-truck"/>
                    </div>

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
                  </div>

                  <div className="form-section">
                    <div className="section-title">
                      <h3>Payment</h3>
                    </div>

                    {/* <div className={paymentMode === "Card"? "payment-button-selected": "payment-button"} onClick={ handlePaymentModeClick }>
                      <p>Payment via Debit/Credit Card</p>
                      <i className="fa-solid fa-credit-card fa-lg" style={{"color": "#ffffff"}}/>
                    </div> */}
                    
                    <div className={paymentMode === "Cash"? "payment-button-selected": "payment-button"} /*onClick={ handlePaymentModeClick }*/>
                      <p>Cash on Delivery</p>
                      <i className="fa-solid fa-money-bill fa-lg" style={{"color": "#ffffff"}}/>
                    </div>
                  </div>
                </form>
            </div>

            <button className='confirm-btn' type='submit' onClick={ handleSubmit }>
              { isLoading? <SyncLoader size={4} speedMultiplier={0.75} margin={2} color="white" /> : "Confirm Order" }
            </button>

          </>
        ): (
          <>
            <div className='order-details-container'>
              <form>
                <div className="form-section">
                  <div className='section-title'>
                    <h1>Personal Information</h1>
                  </div>

                  <div className="fields-container">
                    <input type='text' name="first_name" className={keyExists("first_name")? "input-error": ""} placeholder={keyExists("first_name")? errors["first_name"]: "First Name*"} value={formData.first_name} onChange={handleFieldChange}/>
                    <input type='text' name="last_name" placeholder='Last Name (Optional)' value={formData.last_name} onChange={handleFieldChange}/>
                    <input type='text' name="email" className={keyExists("email")? "input-error": ""} placeholder={keyExists("email")? errors["email"]: "Email*"} value={formData.email} onChange={handleEmailChange}/>
                    <input type='text' name="phone" className={keyExists("phone")? "input-error": ""} placeholder={keyExists("phone")? errors["phone"]: "Contact Number*"} value={formData.phone} onChange={handleFieldChange}/>
                  </div>
                </div>
                
                <div className="form-section">
                  <div className='section-title'>
                    <h1>Delivery Information</h1>
                  </div>
                
                  <input id='full-row-field' type='text' name="address" className={keyExists("address")? "input-error": ""} placeholder={keyExists("address")? errors["address"]: "Address*"} value={formData.address} onChange={handleFieldChange}/>
                
                  <div className="fields-container">
                    <input type='text' name="apt_suite" placeholder='Apartment/Suite (Optional)' value={formData.apt_suite} onChange={handleFieldChange}/>
                    <div id='city-dropdown'>
                      <select 
                        name="city" 
                        onChange={ handleCityChange }
                        value={city?.name || null}
                        required
                      >
                        <option key={''} value={null}>Select City*</option>
                        {cities?.map((obj, index)=>(
                          <option key={obj.id} value={obj.name}>{obj.name}</option>
                        ))}
                      </select>
                      <i className='fa-solid fa-caret-down'/>
                    </div>
                    <input type='text' name="alt_phone" className={keyExists("alt_phone")? "input-error": ""} placeholder={keyExists("alt_phone")? errors["alt_phone"]: "Alt. Phone Number (Optional)"} value={formData.alt_phone} onChange={handleFieldChange}/>
                    <input type='text' name="postal_code" placeholder='Postal Code (Optional)' value={formData.postal_code} onChange={handleFieldChange}/>
                  </div>
                
                </div>
                
                <div className="shipping-container">
                  <h4>Shipping</h4>
                  <div className="payment-button-selected">
                    <p>Standard Shipping</p>
                    <i className="fa-solid fa-truck fa-lg"/>
                  </div>
                </div>

                <div className="form-section">
                  <div className="section-title">
                    <h1>Payment</h1>
                  </div>

                  {/* <div className={paymentMode === "Card"? "payment-button-selected": "payment-button"} onClick={ handlePaymentModeClick }>
                    <p>Payment via Debit/Credit Card</p>
                    <i className="fa-solid fa-credit-card fa-lg" style={{"color": "#ffffff"}}/>
                  </div> */}
                  
                  <div className={paymentMode === "Cash"? "payment-button-selected": "payment-button"} /*onClick={ handlePaymentModeClick }*/>
                    <p>Cash on Delivery</p>
                    <i className="fa-solid fa-money-bill fa-lg" style={{"color": "#ffffff"}}/>
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
                    <div key={item.id} className="checkout-product">
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
                  { isLoading? <SyncLoader size={4} speedMultiplier={0.75} margin={2} color="white" /> : "Confirm Order" }
                </button>
              </div>
            </div>
          </>
        )

      }
    </div>
  )
}

export default OrderDetails;