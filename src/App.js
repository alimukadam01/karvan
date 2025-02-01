import './App.css';
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import AboutUs from './pages/AboutUs';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ContactUsPage from './pages/ContactUsPage';
import { createCart } from './services/api';


function App() {

  const [cart_id, setCartId] = useState(localStorage.getItem("cart_id"));
  useEffect(()=>{
    const get_or_create_cart = async ()=>{
      if (!cart_id){
        setCartId(await createCart())
      }
    }

    get_or_create_cart()
  }, [])

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/about-us' element={<AboutUs/>}/>
          <Route path='/products' element={<ProductDetailPage/>}/>
          <Route path='/contact-us' element={<ContactUsPage/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/checkout' element={<CheckoutPage/>}/>
        </Routes>
        <ToastContainer/>
      </BrowserRouter>
  );
}

export default App;
