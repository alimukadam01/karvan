import {React, useState, useEffect} from 'react';
import { createCart } from '../services/api';
import Navbar from '../components/navbar/Navbar';
import HeroSection from '../components/heroSection/heroSection';
import AboutUs from '../components/about-us/AboutUs'
import BatchDisplay from '../components/batchDisplay/BatchDisplay';
import Footer from '../components/footer/Footer';
import { MobileContextProvider } from '../components/mobile-context/MobileContext';

const HomePage = () => {

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
    <div>
      <MobileContextProvider>
        <Navbar/>
        <HeroSection/>
        <AboutUs/>
        <BatchDisplay/>
        <Footer/> 
      </MobileContextProvider>
    </div>
  )
}

export default HomePage;
