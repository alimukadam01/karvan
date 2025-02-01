import React from 'react'
import './EmptyCart.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { handleScrollNavigate } from '../../services/utils'
import {emptyCartImage} from '../assets/assetRegistry'

function EmptyCart() {

    const location = useLocation()
    const navigate = useNavigate()

  return (
    <div className='empty-cart-container'>
        <h2>Stil making up your mind?</h2>
        <div className='empty-cart-image-container'>
            <img src={emptyCartImage}/>
        </div>

        <div>
            <h4>Your cart is still empty.</h4>
            <h4>Check out our products <button onClick={()=>handleScrollNavigate('products', location, navigate)}><h4>here</h4></button></h4>
        </div>
    </div>
  )
}

export default EmptyCart