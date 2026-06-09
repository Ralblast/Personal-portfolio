import React, { useEffect, useRef } from 'react';
import './Experience.css';

const Experience = () => {
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

  const experiences = [
    {
      company: 'Ekaa Pvt. Ltd.',
      role: 'Full Stack Developer Intern',
      period: 'Mar 2026 – May 2026',
      points: [
        'Was the only engineer on a production MERN platform for 40,000 users, owning the whole lifecycle from requirement gathering and UI/UX design through development, testing, deployment, and maintenance on Hostinger.',
        'Set up role-based access control across 4 user types using JWT auth, httpOnly cookies, refresh token rotation, and protected routes.',
        'Built the RESTful APIs in Node.js and Express with validation, error handling, rate limiting, and logging, and designed the MongoDB schemas, migrations, seed scripts, and a multi-status workflow engine with dynamic state transitions.',
        'Wrote a storage layer over Cloudinary and a VPS that uses signed URLs to keep file upload and retrieval secure.',
        'Built the entire React, Vite, and Tailwind frontend through rounds of design review with the VP, including custom UI effects, responsive layouts, loading skeletons, toast notifications, and pagination.',
        'Got the backend to full test coverage with Jest and Playwright, and used Claude Code and other AI tooling to ship a multi-month scope in a two-month timeline.'
      ]
    }
  ];

  return (
    <section id="experience" className="experience fade-in" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience</h2>
        </div>
        <div className="experience-list">
          {experiences.map((exp, index) => (
            <article key={index} className="experience-item">
              <div className="experience-header">
                <div>
                  <h3 className="experience-role">{exp.role}</h3>
                  <p className="experience-company">{exp.company}</p>
                </div>
                <span className="experience-period">{exp.period}</span>
              </div>
              <ul className="experience-points">
                {exp.points.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
