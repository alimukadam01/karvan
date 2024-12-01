import React from 'react';
import HeroSection from '../components/heroSection/heroSection';
import Navbar from '../components/navbar/Navbar';
import AboutUs from '../components/about-us/AboutUs';
import BatchDisplay from '../components/batchDisplay/BatchDisplay';
import {batch01_images} from '../components/assets/assetRegistry';
import ProductDisplay from '../components/productDisplay/ProductDisplay';
import {batch01_products} from '../components/assets/assetRegistry';
import Footer from '../components/footer/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      {/* <AboutUs/>
      <BatchDisplay batch_no="BATCH-001" name="ISOLATION OF YOUR MIND" images={batch01_images}/>
      <ProductDisplay products={batch01_products}/>
      <Footer/> 
      <h1>Hello, Mr.Mukadam :)</h1>*/}
    </div>
  )
}

export default HomePage;
