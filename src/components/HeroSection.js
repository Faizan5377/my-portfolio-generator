// components/HeroSection.js
import React from 'react';
import '../styles/HeroSection.css';

const HeroSection = ({ name, shortBio }) => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1>Hello, I'm {name}</h1>
        <p>{shortBio}</p>
        <a href="#projects" className="cta-button">View My Work</a>
      </div>
    </section>
  );
};

export default HeroSection;