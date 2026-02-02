import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Abhishek Singh</h1>
          <p className="hero-subtitle">
            Full Stack Developer • React, Express.js , MongoDB
          </p>
          <p className="hero-description">
            Computer Science student at VIT-AP building production applications 
            used by thousands. Focused on clean code, scalable architecture, and solving real problems.
          </p>
          <div className="hero-links">
            <a href="#projects" className="link-subtle">
              View Projects
              <ArrowRight size={16} />
            </a>
            <a href="#contact" className="link-subtle">
              Get in Touch
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
