import React from 'react';
import HeroSection from '../components/heroSection/heroSection';
import Navbar from '../components/navbar/Navbar';
import AboutUs from '../components/about-us/AboutUs';
import BatchDisplay from '../components/batchDisplay/BatchDisplay';
import Footer from '../components/footer/Footer';

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <AboutUs/>
      <BatchDisplay/>
      <Footer/> 
    </div>
  )
}

export default HomePage;
