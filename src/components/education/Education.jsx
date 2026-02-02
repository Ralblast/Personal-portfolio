import React from 'react';
import './Education.css';

const Education = () => {
  return (
    <section id="education" className="education">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Education</h2>
        </div>
        <div className="education-list">
          <div className="education-item">
            <div className="education-header">
              <div>
                <h3 className="education-degree">B.Tech in Computer Science and Engineering</h3>
                <p className="education-institution">Vellore Institute of Technology - AP University</p>
              </div>
              <span className="education-year">2022 - 2026</span>
            </div>
            <p className="education-gpa">GPA: 8.17 (through 7th semester)</p>
          </div>
          
          <div className="education-item">
            <div className="education-header">
              <div>
                <h3 className="education-degree">Senior Secondary Education</h3>
                <p className="education-institution">R.P.S Senior Secondary School, Mahendergarh</p>
              </div>
              <span className="education-year">Completed: 2021</span>
            </div>
            <p className="education-gpa">Class X: 94.6% | Class XII (PCM): 94.6%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
