import React from 'react'
import Navbar from '../components/navbar/Navbar';
import OrderDetails from '../components/orderDetails/OrderDetails';
import Footer from '../components/footer/Footer';

const Checkout = () => {
  return (
    <div>
      <Navbar/>
      <OrderDetails/>
      <Footer/>
    </div>
  )
}

export default Checkout;