import React from 'react'
import aboutus from '../assets/aboutus.png'
import './AboutUs.css'
import { useMobileContext } from '../mobile-context/MobileContext'

function AboutUs() {

  const isMobile =  useMobileContext()

  return (
    <div>
      <section id={`about-us${isMobile?'-mobile': ''}`} className='container-fluid'>
        <div className='about-us-text'>
            <h1>WHERE WE COME FROM</h1>
            <p>
                At Karvan, we are driven by a deep passion for empowering you to showcase your individuality through our carefully crafted, one-of-a-kind clothing. 
                Our journey started with a bold vision—to seamlessly blend the worlds of art and fashion, creating pieces that are not only stylish but also true 
                expressions of our creativity.  From the initial sketch to the final stitch, we pour our hearts into crafting apparel that tells a story, celebrates 
                diversity, and allows you to stand out in a world of mass-produced fashion.
            </p>
        </div>
        <div className='about-us-image-container'>
            <img className='about-us-image' src={aboutus} alt='/'/>
        </div>
      </section>
    </div>
  )
}

export default AboutUs