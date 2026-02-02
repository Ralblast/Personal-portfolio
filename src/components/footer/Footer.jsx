import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="footer-text">
            © {currentYear} Abhishek Singh. Built with React.
          </p>
          <div className="footer-links">
            <a 
              href="https://github.com/Ralblast" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              GitHub
            </a>
            <a 
              href="https://www.linkedin.com/in/abhishek-singh-9b3541245" 
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-link"
            >
              LinkedIn
            </a>
            <a 
              href="mailto:abhisheksingh708226@gmail.com"
              className="footer-link"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
