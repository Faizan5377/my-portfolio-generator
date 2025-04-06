// components/DataEntryPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/DataEntryPage.css';

const DataEntryPage = ({ onSubmit }) => {
  const navigate = useNavigate();
  
  // State for personal information
  const [name, setName] = useState('');
  const [shortBio, setShortBio] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');
  
  // State for skills and interests
  const [skills, setSkills] = useState('');
  const [interests, setInterests] = useState('');
  
  // State for projects
  const [projects, setProjects] = useState([
    { title: '', description: '', image: '', github: '' },
    { title: '', description: '', image: '', github: '' },
    { title: '', description: '', image: '', github: '' }
  ]);
  
  // State for social media links
  const [socialMedia, setSocialMedia] = useState([
    { name: '', url: '' }
  ]);

  // Handler for project input changes
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...projects];
    updatedProjects[index][field] = value;
    setProjects(updatedProjects);
  };

  // Handler for social media input changes
  const handleSocialMediaChange = (index, field, value) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia[index][field] = value;
    setSocialMedia(updatedSocialMedia);
  };

  // Function to add another social media entry
  const addSocialMedia = () => {
    setSocialMedia([...socialMedia, { name: '', url: '' }]);
  };

  // Function to remove a social media entry
  const removeSocialMedia = (index) => {
    const updatedSocialMedia = [...socialMedia];
    updatedSocialMedia.splice(index, 1);
    setSocialMedia(updatedSocialMedia);
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create portfolio data object
    const portfolioData = {
      personal: {
        name,
        shortBio,
        profilePicture,
        detailedDescription
      },
      skillsAndInterests: {
        skills: skills.split(',').map(skill => skill.trim()),
        interests: interests.split(',').map(interest => interest.trim())
      },
      projects,
      socialMedia
    };
    
    // Call the onSubmit callback with the portfolio data
    onSubmit(portfolioData);
    
    // Navigate to portfolio page
    navigate('/portfolio');
  };

  return (
    <div className="data-entry-container">
      <h1>Create Your Portfolio</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Information Section */}
        <section className="form-section">
          <h2>Personal Information</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="shortBio">Short Bio:</label>
            <input
              type="text"
              id="shortBio"
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="profilePicture">Profile Picture URL:</label>
            <input
              type="text"
              id="profilePicture"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="detailedDescription">Detailed Description:</label>
            <textarea
              id="detailedDescription"
              value={detailedDescription}
              onChange={(e) => setDetailedDescription(e.target.value)}
              required
            ></textarea>
          </div>
        </section>

        {/* Skills and Interests Section */}
        <section className="form-section">
          <h2>Skills and Interests</h2>
          <div className="form-group">
            <label htmlFor="skills">Skills (comma-separated):</label>
            <input
              type="text"
              id="skills"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="interests">Interests (comma-separated):</label>
            <input
              type="text"
              id="interests"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              required
            />
          </div>
        </section>

        {/* Projects Section */}
        <section className="form-section">
          <h2>Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="project-form">
              <h3>Project {index + 1}</h3>
              <div className="form-group">
                <label htmlFor={`project-title-${index}`}>Title:</label>
                <input
                  type="text"
                  id={`project-title-${index}`}
                  value={project.title}
                  onChange={(e) => handleProjectChange(index, 'title', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`project-description-${index}`}>Description:</label>
                <textarea
                  id={`project-description-${index}`}
                  value={project.description}
                  onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor={`project-image-${index}`}>Image URL:</label>
                <input
                  type="text"
                  id={`project-image-${index}`}
                  value={project.image}
                  onChange={(e) => handleProjectChange(index, 'image', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`project-github-${index}`}>GitHub Link:</label>
                <input
                  type="text"
                  id={`project-github-${index}`}
                  value={project.github}
                  onChange={(e) => handleProjectChange(index, 'github', e.target.value)}
                  required
                />
              </div>
            </div>
          ))}
        </section>

        {/* Social Media Section */}
        <section className="form-section">
          <h2>Social Media Links</h2>
          {socialMedia.map((social, index) => (
            <div key={index} className="social-media-form">
              <div className="form-group">
                <label htmlFor={`social-name-${index}`}>Platform Name:</label>
                <input
                  type="text"
                  id={`social-name-${index}`}
                  value={social.name}
                  onChange={(e) => handleSocialMediaChange(index, 'name', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor={`social-url-${index}`}>URL:</label>
                <input
                  type="text"
                  id={`social-url-${index}`}
                  value={social.url}
                  onChange={(e) => handleSocialMediaChange(index, 'url', e.target.value)}
                  required
                />
              </div>
              {index > 0 && (
                <button 
                  type="button" 
                  className="remove-button"
                  onClick={() => removeSocialMedia(index)}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button 
            type="button" 
            className="add-button"
            onClick={addSocialMedia}
          >
            Add Social Media
          </button>
        </section>

        {/* Submit Button */}
        <button type="submit" className="submit-button">Generate Portfolio</button>
      </form>
    </div>
  );
};

export default DataEntryPage;