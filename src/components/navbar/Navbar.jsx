import React, { useState } from 'react'
import './Navbar.css'
import { useNavigate, useLocation } from 'react-router-dom'
import {Link as RouterLink } from 'react-router-dom'
import { handleScrollNavigate } from '../../services/utils'  
import logo from '../assets/logo.png'

export const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollNavigate = (target, location, navigate) => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      const element = document.querySelector(`#${target}`);
      if (element) element.scrollIntoView({ 
        behavior: 'smooth' 
      })
    }, 100)
  }


  return (
    <div className='navbar navbar-customized' >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img className='karvan-logo' src={logo} alt=""/>
        </a>

        <div>
          <ul className='buttons-container'>
            <li><button className='nav-button' onClick={()=>handleScrollNavigate('about-us', location, navigate)}>About Us</button></li>
            <li><button className='nav-button' onClick={()=>handleScrollNavigate('products', location, navigate)}>Products</button></li>
            <li><RouterLink to="/contact-us"><button className='nav-button'>Contact Us</button></RouterLink></li>
            <li><RouterLink to="/cart"><button className="nav-button">Cart</button></RouterLink></li>
          </ul>
        </div>
      </div>
    </div>
  )
}


export default Navbar;