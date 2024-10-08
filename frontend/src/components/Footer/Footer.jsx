import './Footer.css'
import { assets } from '../../assets/assets'

/**
 * The Footer component.
 * @returns {React.ReactElement} The Footer component.
 * @description The Footer component displays a footer with the app's name, a quote, social media icons, and a copyright notice.
 */
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img src={assets.logo} alt="" />
                <p>
                    Enjoy the best meals from your favorite restaurants delivered fast and fresh to your doorstep. Whether you&apos;re craving pizza, sushi, or burgers, we&apos;ve got you covered. Order now and experience quick, convenient, and delicious food delivery at your fingertips.
                </p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+254 793614504</li>
                    <li>jassylewis70@gmail.com</li>
                </ul>
            </div>
           
        </div>
        <hr />
        <p className="footer-copyright">
            Copyright 2024 &copy; Lewis - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer