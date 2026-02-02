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
