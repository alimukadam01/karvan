import React from 'react'
import './heroSection.css'
import heroImage from '../assets/hero-bg.png'


function HeroSection() {
  return (
    <div className='container-fluid' id='hero-section-container'>
      <img  className="hero-image" src={heroImage} alt=''/>
      <h1 className='hero-text'>Will make you <br/>STOP and <br/>STARE.</h1>
    </div>
  )
}

export default HeroSection