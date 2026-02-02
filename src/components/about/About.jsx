import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About</h2>
        </div>
        <div className="about-content">
          <p className="about-text">
            I'm a Computer Science student at VIT-AP University focused on full-stack development. 
            My work ranges from AI-powered healthcare tools to attendance systems used by 5,000+ students.
          </p>
          <p className="about-text">
            I enjoy building complete solutions that solve real problems, working across frontend, 
            backend, and database layers. Currently deepening my expertise in React, Node.js, and 
            database design while actively solving DSA problems (180+ on LeetCode).
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
