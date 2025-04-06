// components/Projects.js
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ProjectCard from './ProjectCard';
import '../styles/Projects.css';

const Projects = ({ projects: initialProjects }) => {
  // State for projects
  const [projects, setProjects] = useState([]);
  // State for loading status
  const [isLoading, setIsLoading] = useState(true);
  // State for error messages
  const [error, setError] = useState(null);

  // Effect to fetch project data from GitHub
  useEffect(() => {
    // Function to fetch project data
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        
        // Fetch GitHub repos for the provided username
        const response = await fetch('https://api.github.com/users/Faizan5377/repos');
        
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        
        const data = await response.json();
        
        // Transform GitHub data into our project format
        const githubProjects = data.slice(0, 6).map((repo, index) => ({
          id: `github-${repo.id}`,
          title: repo.name,
          description: repo.description || 'No description available',
          image: 'https://avatars.githubusercontent.com/u/121832396?v=4', // Using your profile image
          github: repo.html_url
        }));
        
        // Combine with initial projects if they exist
        if (initialProjects && initialProjects.length > 0) {
          // Add IDs to initial projects for drag and drop
          const projectsWithIds = initialProjects.map((project, index) => ({
            ...project,
            id: `local-${index}`
          }));
          
          setProjects([...projectsWithIds, ...githubProjects]);
        } else {
          setProjects(githubProjects);
        }
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to fetch projects');
        
        // Still use initial projects if fetch fails
        if (initialProjects && initialProjects.length > 0) {
          const projectsWithIds = initialProjects.map((project, index) => ({
            ...project,
            id: `local-${index}`
          }));
          setProjects(projectsWithIds);
        }
        
        setIsLoading(false);
      }
    };

    // Call the fetch function
    fetchProjects();
  }, [initialProjects]);

  // Handle drag and drop reordering
  const handleDragEnd = (result) => {
    // Drop outside the list
    if (!result.destination) return;
    
    // Same position
    if (result.destination.index === result.source.index) return;
    
    const items = Array.from(projects);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setProjects(items);
  };

  // Show loading state
  if (isLoading) {
    return (
      <section id="projects" className="projects-section">
        <div className="projects-container">
          <h2>Projects</h2>
          <div className="loading">Loading projects...</div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error && projects.length === 0) {
    return (
      <section id="projects" className="projects-section">
        <div className="projects-container">
          <h2>Projects</h2>
          <div className="error">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2>Projects</h2>
        <p className="drag-instruction">Drag and drop to reorder projects</p>
        
        {projects.length > 0 ? (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="projects" type="PROJECTS" direction="horizontal">
              {(provided) => (
                <div
                  className="projects-grid"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {projects.map((project, index) => (
                    <Draggable
                      key={project.id}
                      draggableId={project.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.8 : 1
                          }}
                          className="project-draggable"
                        >
                          <ProjectCard
                            title={project.title}
                            description={project.description}
                            image={project.image}
                            github={project.github}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div className="projects-empty">No projects available</div>
        )}
      </div>
    </section>
  );
};

export default Projects;