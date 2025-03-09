import { React } from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import logoMono from '../assets/logo-mono.png'
import SendEmail from '../sendEmail/SendEmail';
import { useMobileContext } from '../mobile-context/MobileContext';

function Footer() {
  const isMobile = useMobileContext()

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
                        <Link to="/contact-us"><button>Contact Us</button></Link>
                        <Link to="/return-exchange-policy"><button>Return/Exchange Policy</button></Link>
                        <Link to="/shipping-policy"><button>Shipping Policy</button></Link>
                        <Link to="/privacy-policy"><button>Privacy Policy</button></Link>
                    </div>
                </div>
                { isMobile? (
                    <div></div> 
                    ): (
                    <div>
                        <h2>Thankyou for shopping with us!</h2>
                        <p>we can't wait to see how you style your karvan favorites!</p>
                    </div>
                )}
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
                            <a href="https://www.facebook.com/share/161nD3rcXb/">Facebook</a>
                        </div>
                    </div>
                </div>
            </div>

            {isMobile? (
                <div>
                </div>
            ): (
                <div className="footer-email-container">
                    <SendEmail/>
                </div>
            )}
        </div>

        {isMobile?(
            <div>
                <h2>Thankyou for shopping with us!</h2>
                <p>we can't wait to see how you style your karvan favorites!</p>
            </div>
        ): (<div></div>)}
    </div>
  )
}

export default Footer;