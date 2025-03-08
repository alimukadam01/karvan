import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Cart from '../components/cart/Cart'
import Footer from '../components/footer/Footer'
import { MobileContextProvider } from '../components/mobile-context/MobileContext'

const CartPage = () => {
  return (
    <div>
      <MobileContextProvider>
        <Navbar/>
        <Cart/>
      </MobileContextProvider>
    </div>
  )
}

export default CartPage;