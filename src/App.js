import './App.css';
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactUsPage from './pages/ContactUsPage';
import ReturnExchangePage from './pages/ReturnExchangePage';
import ShippingPolicyPage from './pages/ShippingPolicyPage';
import { createCart } from './services/api';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import Footer from './components/footer/Footer';
import { MobileContextProvider } from './components/mobile-context/MobileContext';
import ReviewPage from './pages/ReviewPage';


function App() {
  const [cart_id, setCartId] = useState(localStorage.getItem("cart_id"));
  useEffect(()=>{
    const get_or_create_cart = async ()=>{
      if (!cart_id){
        setCartId(await createCart())
      }
    }

    get_or_create_cart()
  })

  return (
    <div className='app-container'>
      <BrowserRouter>
        <div className='content'>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/products' element={<ProductDetailPage/>}/>
            <Route path='/contact-us' element={<ContactUsPage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='/checkout' element={<CheckoutPage/>}/>
            <Route path='/return-exchange-policy' element={<ReturnExchangePage/>}/>
            <Route path='/shipping-policy' element={<ShippingPolicyPage/>}/>
            <Route path='/privacy-policy' element={<PrivacyPolicyPage/>}/>
            <Route path='/review/:order_id/' element={<ReviewPage/>}/>
          </Routes>
        </div>
        <ToastContainer/>
        <MobileContextProvider>
          <Footer/>
        </MobileContextProvider>
      </BrowserRouter>
    </div>
  )
}

export default App;
