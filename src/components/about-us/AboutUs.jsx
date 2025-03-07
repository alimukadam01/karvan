import React from 'react'
import aboutus from '../assets/aboutus.png'
import './AboutUs.css'

function AboutUs() {

  return (
    <div>
      <section id="about-us" className='container-fluid'>
        <div className='about-us-text'>
            <h1>WHERE WE COME FROM</h1>
            <h4>
                At Karvan, we are driven by a deep passion for empowering you to showcase your individuality through our carefully crafted, one-of-a-kind clothing. 
                Our journey started with a bold vision—to seamlessly blend the worlds of art and fashion, creating pieces that are not only stylish but also true 
                expressions of our creativity.  From the initial sketch to the final stitch, we pour our hearts into crafting apparel that tells a story, celebrates 
                diversity, and allows you to stand out in a world of mass-produced fashion.
            </h4>
        </div>
        <div className='about-us-image-container'>
            <img className='about-us-image' src={aboutus} alt='about-us-image'/>
        </div>
      </section>
    </div>
  )
}

export default AboutUs