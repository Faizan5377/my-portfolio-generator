import React from 'react';
import '../styles/Footer.css';

const Footer = ({ socialMedia }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="social-links">
          {socialMedia && socialMedia.map((social, index) => (
            <a 
              key={index} 
              href={social.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              {social.name}
            </a>
          ))}
        </div>
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;