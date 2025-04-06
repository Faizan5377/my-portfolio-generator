import React from 'react';
import '../styles/AboutMe.css';

const AboutMe = ({ profilePicture, skills, interests, description }) => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <h2>About Me</h2>
        
        <div className="about-content">
          <div className="profile-image">
            <img src={profilePicture} alt="Profile" />
          </div>
          
          <div className="about-text">
            <p>{description}</p>
            
            <div className="skills-interests">
              <div className="skills">
                <h3>Skills</h3>
                <ul>
                  {skills.map((skill, index) => (
                    <li key={index}>{skill}</li>
                  ))}
                </ul>
              </div>
              
              <div className="interests">
                <h3>Interests</h3>
                <ul>
                  {interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;