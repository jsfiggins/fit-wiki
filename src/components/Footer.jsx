import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <div className="footer">
      <p>Stay Connected with Us</p>
      <div className="social-icons">
        <a href="https://www.facebook.com" aria-label="Facebook"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="https://www.twitter.com" aria-label="Twitter"><FontAwesomeIcon icon={faTwitter} className="fab fa-twitter" /></a>
        <a href="https://www.instagram.com" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SpotMe. All rights reserved.</p>
        <p>Designed by Jaseane Figgins </p>
      </div>
    </div>
  );
}
