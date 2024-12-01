import React from 'react'
import './Footer.css'
import logoMono from '../assets/logo-mono.png'

function Footer() {
  return (
    <div className='footer-container container-fluid'>
        <div className='footer-logo-container'>
            <img src={logoMono} alt='/'/>
        </div>
        <div className='footer-columns'>
            <div className='footer-col-01'>
                <div className='footer-links'>
                    <h2>Customer Support</h2>
                    <a>Contact Us</a>
                    <a>Return/Exchange Policy</a>
                    <a>Shipping Policy</a>
                    <a>Privacy Policy</a>
                </div>
                <div>
                    <h2>Thankyou for shopping with us!</h2>
                    <p>we can't wait to see how you style your karvan favorites!</p>
                </div>
            </div>

            <div className='footer-col-02'>
                <div>
                    <h2>Catch up with us on</h2>
                </div>
            </div>

            <div className='footer-col-03'>
                <h2>Send us your feedback</h2>
                <p>
                    Let us know what you think or even give us ideas on what you’d 
                    want to see in our collections. In the end it’s all about you!
                </p>

                <form>
                    <input type="text" placeholder='Name'/>
                    <input type="text" placeholder='Email'/>
                    <textarea  rows={6} cols={30} type="text" placeholder='Suggest something!'/>
                    <button type='submit'>Submit Feedback</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Footer;