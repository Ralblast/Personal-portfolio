import React, { useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
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

  const skillGroups = [
    { category: 'Languages', skills: ['Java', 'JavaScript (ES6+)', 'SQL'] },
    { category: 'Frontend', skills: ['React.js', 'Redux Toolkit', 'Tailwind CSS', 'HTML5/CSS3'] },
    { category: 'Backend', skills: ['Node.js', 'Express.js', 'Mongoose', 'RESTful APIs', 'JWT'] },
    { category: 'Data', skills: ['MongoDB', 'PostgreSQL'] },
    { category: 'Tools', skills: ['Git', 'Postman', 'Vercel', 'Render'] },
    { category: 'Fundamentals', skills: ['DSA', 'OOP', 'DBMS', 'OS'] }
  ];

  return (
    <section id="skills" className="skills fade-in" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Skills</h2>
        </div>
        <div className="skills-list">
          {skillGroups.map((group, index) => (
            <div key={group.category} className="skill-group">
              <span className="skill-category">{group.category}</span>
              <span className="skill-items">
                {group.skills.join(' · ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
