import React from 'react';
import { Mail, Linkedin, Github, Code2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const socialLinks = [
    { icon: Mail, href: 'mailto:abhisheksingh708226@gmail.com', label: 'Email' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/abhisheksingh7566/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/Ralblast', label: 'GitHub' },
    { icon: Code2, href: 'https://leetcode.com/u/AlgoWrath/', label: 'LeetCode' }
  ];

  return (
    <header className="header">
      <div className="header-links">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label={link.label}
          >
            <link.icon size={18} />
          </a>
        ))}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
