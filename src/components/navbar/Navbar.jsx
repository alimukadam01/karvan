import React, { useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import Button from '../button/Button'
import { Link } from 'react-router-dom'

export const Navbar = () => {

  const [menu, setMenu] = useState("home")

  return (
    <div className='navbar navbar-customized' >
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img className='karvan-logo' src={logo} alt=""/>
        </a>

        <div>
          <ul className='buttons-container'>
            <li onClick={()=>{setMenu("about-us")}}><Link to="/about-us"><Button text="About Us" className="nav-button"/></Link></li>
            <li onClick={()=>{setMenu("products")}}><Link to="/products"><Button text="Products" className="nav-button"/></Link></li>
            <li onClick={()=>{setMenu("contact-us")}}><Link to="/contact-us"><Button text="Contact Us" className="nav-button"/></Link></li>
            <li onClick={()=>{setMenu("cart")}}><Link to="/cart"><Button text="Cart" className="nav-button"/></Link></li>
          </ul>
        </div>
      </div>
    </div>




    // <div className="navbar-layout-auto">
    //   <div className='karvan-logo'>
    //     <img src={logo} alt='/'/>
    //   </div>
      
    //   <div>
    //     <ul className='buttons-container'>
    //       <li onClick={()=>{setMenu("about-us")}}><Link to="/about-us"><Button text="About Us" className="nav-button"/></Link></li>
    //       <li onClick={()=>{setMenu("products")}}><Link to="/products"><Button text="Products" className="nav-button"/></Link></li>
    //       <li onClick={()=>{setMenu("contact-us")}}><Link to="/contact-us"><Button text="Contact Us" className="nav-button"/></Link></li>
    //       <li onClick={()=>{setMenu("cart")}}><Link to="/cart"><Button text="Cart" className="nav-button"/></Link></li>
    //     </ul>
    //   </div>
    // </div>
  )
}


export default Navbar;