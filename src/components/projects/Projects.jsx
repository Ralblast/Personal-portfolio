import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: 'Healthcare Symptom Checker',
      tech: 'React • Node.js • Express • MongoDB • Grok AI',
      description: 'Built an AI-powered health assessment app with Grok AI integration for intelligent symptom analysis. Implemented secure backend with Helmet, CORS, rate limiting, and Winston logging. Designed RESTful APIs and Mongoose schemas for query history and medical data. Deployed on Vercel/Render with automated health checks to prevent cold starts.',
      github: 'https://github.com/Ralblast/HealthCare-Symptom-Checker',
      live: 'https://health-care-symptom-checker-seven.vercel.app'
    },
    {
      title: 'VIT-AP Attendance Planner',
      tech: 'React • JavaScript ES6+ • Tailwind CSS',
      description: 'Developed attendance calculator serving 5,000+ students with 1,000+ visits in 1.5 months. Engineered dynamic calculation system handling 47 course slots and 12 calendar events. Built desktop-first UI with dark/light theme, interactive calendars, and visualizations. Achieved 100% calculation accuracy and 80% reduction in manual computation time.',
      github: 'https://github.com/Ralblast/vit-ap-attendance-planner',
      live: 'https://vit-ap-attendance-planner.vercel.app/'
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
        </div>
        <div className="projects-list">
          {projects.map((project, index) => (
            <article key={index} className="project">
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
