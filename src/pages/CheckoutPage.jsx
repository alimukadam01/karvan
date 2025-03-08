import React from 'react'
import Navbar from '../components/navbar/Navbar';
import OrderDetails from '../components/orderDetails/OrderDetails';
import Footer from '../components/footer/Footer';
import { MobileContextProvider } from '../components/mobile-context/MobileContext';

const Checkout = () => {
  return (
    <div>
      <MobileContextProvider>
        <Navbar/>
        <OrderDetails/>
      </MobileContextProvider>
    </div>
  )
}

export default Checkout;