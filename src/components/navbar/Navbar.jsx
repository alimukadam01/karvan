import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useNavigate, useLocation } from 'react-router-dom'
import { useMobileContext } from '../mobile-context/MobileContext'
import {Link as RouterLink } from 'react-router-dom'
import { handleScrollNavigate } from '../../services/utils'
import logo from '../assets/logo.png'

export const Navbar = () => {

  const navigate = useNavigate()
  const location = useLocation()

  const isMobile = useMobileContext()
  const [menuOpen, setMenuOpen] = useState(false)
  const  handleMenuBtnClick = ()=>{
    setMenuOpen(!menuOpen)
  }

  return (
    <div>
      {isMobile? (
        <>
          {menuOpen ? (
            <div className={`ham-menu-container ${menuOpen? "open": ""}`}>
              <div className='ham-title-container'>
                <button className="hamburger-btn" onClick={handleMenuBtnClick}>
                  <i className="fa-solid fa-xmark fa-lg nav-icon"/>
                </button>
                <div className="logo-container">
                  <a href="/">
                    <img className='karvan-logo' src={logo} alt=""/>
                  </a>
                </div>
                <RouterLink to="/cart">
                  <i className="fa-solid fa-cart-shopping fa-lg nav-icon"></i>
                </RouterLink>
              </div>

              <ul className='ham-buttons-container'>
                <li><button className='nav-button' onClick={()=>handleScrollNavigate('about-us', location, navigate, setMenuOpen)}>About Us</button></li>
                <li><button className='nav-button' onClick={()=>handleScrollNavigate('products', location, navigate, setMenuOpen)}>Products</button></li>
                <li><RouterLink to="/contact-us"><button className='nav-button'>Contact Us</button></RouterLink></li>
                <li><RouterLink to="/cart"><button className="nav-button">Cart</button></RouterLink></li>
              </ul>
            </div>
          ): (
            <>
              <div className='navbar navbar-customized'>
                <button className="hamburger-btn" onClick={handleMenuBtnClick}>
                  <i className="fa-solid fa-bars fa-lg nav-icon"/>
                </button>

                <div className="logo-container">
                  <a href="/">
                    <img className='karvan-logo' src={logo} alt=""/>
                  </a>
                </div>

                <RouterLink to="/cart">
                    <i className="fa-solid fa-cart-shopping fa-lg nav-icon"></i>
                </RouterLink>
              </div>
            </>
          )}
        </>
      ): (
        <>
          <div className='navbar navbar-customized'>

            <div className="logo-container">
              <a href="/">
                <img className='karvan-logo' src={logo} alt=""/>
              </a>
            </div>

            <ul className='buttons-container'>
              <li><button className='nav-button' onClick={()=>handleScrollNavigate('about-us', location, navigate)}>About Us</button></li>
              <li><button className='nav-button' onClick={()=>handleScrollNavigate('products', location, navigate)}>Products</button></li>
              <li><RouterLink to="/contact-us"><button className='nav-button'>Contact Us</button></RouterLink></li>
              <li><RouterLink to="/cart"><button className="nav-button">Cart</button></RouterLink></li>
            </ul>

          </div>
        </>
      )}
    </div>
  )
}


export default Navbar;