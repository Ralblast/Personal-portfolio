import React, { useEffect, useRef } from 'react';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="about fade-in" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">About</h2>
        </div>
        <div className="about-content">
          <p className="about-text">
            I'm a developer who likes owning a product end to end, taking something from a rough
            requirement to designed, built, tested, and actually running in front of users. I graduated
            in Computer Science from VIT-AP in 2026 and feel most at home in the MERN stack, though I'll
            reach for whatever a problem actually needs.
          </p>
          <p className="about-text">
            On my own time I've built an AI-powered healthcare symptom checker and an attendance-forecasting
            app that 5,000+ students rely on. Right now I'm digging into generative AI and how to build real
            products on top of it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
