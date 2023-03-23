import React from 'react';
import playStore from '../../../Images/playstore.png';
import appStore from '../../../Images/Appstore.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer id='footer'>
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App for Android and IOS mobile phone</p>
                <img src={playStore} alt="playStore" />
                <img src={appStore} alt="AppStore" />
            </div>

            <div className="midFooter">
                <h1>Ecommerce</h1>
                <p>High Quality is our first Priority</p>
                <p>Copyrights 2023 &copy; Vedant Rana</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="www.google.com">Instagram</a>
                <a href="www.google.com">Youtube</a>
                <a href="www.google.com">Facebook</a>
            </div>
        </footer>
    )
}

export default Footer