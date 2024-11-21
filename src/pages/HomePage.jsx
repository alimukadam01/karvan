import React from 'react';
import HeroSection from '../components/heroSection/heroSection';
import Navbar from '../components/navbar/Navbar';
import AboutUs from '../components/about-us/AboutUs';

const HomePage = () => {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <AboutUs/>
      <h1>Hello, Mr.Mukadam :)</h1>
    </div>
  )
}

export default HomePage;
