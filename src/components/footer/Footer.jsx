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
                <div>
                    <h2>Customer Support</h2>
                    <div className='footer-links'>
                        <a href='#'>Contact Us</a>
                        <a href='#'>Return/Exchange Policy</a>
                        <a href='#'>Shipping Policy</a>
                        <a href='#'>Privacy Policy</a>
                    </div>
                </div>
                <div> 
                    <h2>Thankyou for shopping with us!</h2>
                    <p>we can't wait to see how you style your karvan favorites!</p>
                </div>
            </div>

            <div className='footer-col-02'>
                <div>
                    <h2>Catch up with us on</h2>
                    <div className='footer-links'>
                        <div className="footer-handle">
                            <i className="fa-brands fa-instagram fa-xl"></i>
                            <a href="https://www.instagram.com/karvan.pk/">Instagram</a>
                        </div>
                        <div className="footer-handle">
                            <i className="fa-brands fa-facebook fa-xl"></i>
                            <a href="https://www.facebook.com/profile.php?id=61553389870365/">Facebook</a>
                        </div>
                    </div>
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