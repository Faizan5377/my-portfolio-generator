import React from 'react';
import '../styles/ProjectCard.css';

const ProjectCard = ({ title, description, image, github }) => {
  return (
    <div className="project-card">
      <div className="project-image">
        <img src={image} alt={title} />
      </div>
      <div className="project-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <a href={github} target="_blank" rel="noopener noreferrer" className="github-link">
          View on GitHub
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;