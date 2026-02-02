import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Get in Touch</h2>
        </div>
        <div className="contact-inline">
          <p className="contact-text">
            Open to opportunities and interesting projects.{' '}
            <br></br>
            <a href="mailto:abhisheksingh708226@gmail.com" className="contact-link">Email</a>
            {' · '}
            <a href="https://github.com/Ralblast" target="_blank" rel="noopener noreferrer" className="contact-link">GitHub</a>
            {' · '}
            <a href="https://www.linkedin.com/in/abhishek-singh-9b3541245" target="_blank" rel="noopener noreferrer" className="contact-link">LinkedIn</a>
            {' · '}
            <a href="https://leetcode.com/u/AlgoWrath/" target="_blank" rel="noopener noreferrer" className="contact-link">LeetCode</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
