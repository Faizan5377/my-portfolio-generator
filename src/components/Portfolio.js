import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import AboutMe from './AboutMe';
import Projects from './Projects';
import Contact from './Contact';
import Footer from './Footer';
import '../styles/Portfolio.css';

const Portfolio = ({ data }) => {
  // State for dark mode toggle
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Apply dark mode class to the body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <div className={`portfolio ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <HeroSection 
          name={data.personal.name} 
          shortBio={data.personal.shortBio} 
        />
        <AboutMe 
          profilePicture={data.personal.profilePicture}
          skills={data.skillsAndInterests.skills}
          interests={data.skillsAndInterests.interests}
          description={data.personal.detailedDescription}
        />
        <Projects projects={data.projects} />
        <Contact />
      </main>
      <Footer socialMedia={data.socialMedia} />
    </div>
  );
};

export default Portfolio;