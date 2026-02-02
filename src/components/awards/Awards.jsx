import React from 'react';
import './Awards.css';

const Awards = () => {
  const awards = [
    {
      title: 'Runner-up, V-Launch Pad 2024 Business Plan Competition',
      organization: 'VIT-AP University',
      description: 'Awarded for innovative business model',
      year: '2024'
    },
    {
      title: 'Microsoft Azure AI Fundamentals (AI-900)',
      organization: 'Microsoft',
      description: 'Certified in Azure AI services and fundamentals',
      year: '2024'
    },
    {
      title: 'MongoDB Database Admin Path',
      organization: 'MongoDB',
      description: 'Completed comprehensive database administration training',
      year: '2025'
    },
    {
      title: 'Advanced DSA Training',
      organization: 'GeeksforGeeks',
      description: '180+ LeetCode problems solved, focused on algorithmic problem-solving',
      year: '2025'
    },
    {
      title: 'Event Manager - Anchoring Club',
      organization: 'VIT-AP University',
      description: 'Successfully organized and coordinated multiple cultural and technical events',
      year: '2023-2024'
    }
  ];

  return (
    <section id="awards" className="awards">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Awards & Certifications</h2>
        </div>
        <div className="awards-list">
          {awards.map((award, index) => (
            <div key={index} className="award-item">
              <div className="award-content">
                <h3 className="award-title">{award.title}</h3>
                <p className="award-organization">{award.organization}</p>
                <p className="award-description">{award.description}</p>
              </div>
              <span className="award-year">{award.year}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Awards;
