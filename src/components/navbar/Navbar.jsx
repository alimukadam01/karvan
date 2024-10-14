import React from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import Button from '../button/Button'

export const Navbar = () => {
  return (
    <div className="navbar-layout-auto">
        <div className='karvan-logo'>
          <img src={logo}/>
        </div>
        <div className='buttons-container'>
          <Button text="About Us" className="about-us"/>
          <Button text="Products" className="products"/>
          <Button text="Contact Us" className="contact-us"/>
        </div>
    </div>
  )
}


export default Navbar;