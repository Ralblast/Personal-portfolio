import React from 'react';
import { ArrowRight, Mail, Linkedin, Github, Code2, Download } from 'lucide-react';
import RoleRotator from './RoleRotator';
import './Hero.css';

const ROLES = ['MERN Stack', 'AI Engineering', 'React & Node', 'MongoDB', 'Full-Stack'];

const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">Abhishek Singh</h1>
            <p className="hero-subtitle">
              Full Stack Developer • <RoleRotator words={ROLES} />
            </p>
            <p className="hero-description">
              I was the sole engineer behind a production platform that now serves 40,000 users.
              I care about clean code, sensible architecture, and building things people actually
              reach for.
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
            <div className="hero-social">
              <a href="mailto:abhisheksingh708226@gmail.com" aria-label="Email">
                <Mail size={18} />
              </a>
              <a href="https://www.linkedin.com/in/abhisheksingh7566/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="https://github.com/Ralblast" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://leetcode.com/u/AlgoWrath/" target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                <Code2 size={18} />
              </a>
              <a
                href="/Abhishek_Singh_Resume.pdf"
                download
                className="hero-resume"
                aria-label="Download résumé (PDF)"
              >
                <Download size={16} className="hero-resume-icon" />
                Resume
              </a>
            </div>
          </div>
          <div className="hero-photo">
            <img src="/profile_picture.jpeg" alt="Abhishek Singh" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
