import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import './Projects.css';

const Projects = () => {
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

  // feed the cursor position into CSS vars so a soft light tracks it inside the card
  const onCardMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const projects = [
    {
      title: 'VIT-AP Attendance Planner',
      tech: 'React 19 • Firebase • Firestore • Vercel • Tailwind CSS • Node.js',
      description: 'A full-stack attendance forecasting app for 5,000+ students that picked up 1,000+ visits and 40+ daily active users in its first 1.5 months. It runs a hybrid ML risk engine (a CART decision-tree classifier plus weighted formula scoring with a "worst-label-wins" ensemble) alongside a statistical forecast built on linear regression with EWMA smoothing (α=0.4) and 95% confidence intervals. The same analytics engine powers both the React UI and the Vercel serverless functions, and it sends automated email and Telegram alerts through Vercel Cron with per-user throttling and Firebase Admin token verification.',
      github: 'https://github.com/Ralblast/vit-ap-attendance-planner',
      live: 'https://vit-ap-attendance-planner.vercel.app/'
    },
    {
      title: 'Healthcare Symptom Checker',
      tech: 'React • Node.js • Express • MongoDB • Grok AI',
      description: 'An AI-powered health app that uses Grok AI to analyze symptoms and suggest possible conditions. The backend is locked down with Helmet, CORS, rate limiting, and Winston logging, and the RESTful APIs and Mongoose schemas track query history and condition data. It is deployed on Vercel and Render with automated health checks so it does not cold-start.',
      github: 'https://github.com/Ralblast/HealthCare-Symptom-Checker',
      live: 'https://health-care-symptom-checker-seven.vercel.app'
    }
  ];

  return (
    <section id="projects" className="projects fade-in" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
        </div>
        <div className="projects-list">
          {projects.map((project, index) => (
            <article key={index} className="project" onMouseMove={onCardMove}>
              {/* Title and links on same line */}
              <div className="project-title-row">
                <h3 className="project-title">{project.title}</h3>
                <div className="project-links-inline">
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-external-minimal"
                    >
                      Source
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="link-external-minimal"
                    >
                      Live
                      <ArrowUpRight size={12} />
                    </a>
                  )}
                </div>
              </div>
              
              <p className="project-tech mono">{project.tech}</p>
              <p className="project-description">{project.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
