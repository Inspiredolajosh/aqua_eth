// ProjectList.jsx
import React, { useState } from "react";
import "./projectList.scss"; // Import your CSS file for styling

const ProjectList = () => {
  // Sample project data (replace with your actual data or fetch from an API)
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project 1",
      chain: "Ethereum",
      maxContribution: 3,
      maxRaise: 20,
      tokenAllocation: 50000,
    },
    {
      id: 2,
      name: "Project 2",
      chain: "Binance Smart Chain",
      maxContribution: 2,
      maxRaise: 15,
      tokenAllocation: 40000,
    },
    // Add more project data here
  ]);

  // Function to delete a project by ID
  const deleteProject = (id) => {
    const updatedProjects = projects.filter((project) => project.id !== id);
    setProjects(updatedProjects);
  };

  // Function to edit a project by ID
  const editProject = (id) => {
    // Implement your edit project logic here
    // For example, you can open a modal for editing project details

    // In this example, we'll just show an alert with the project ID for demonstration
    alert(`Editing project with ID ${id}`);
  };

  return (
    <div className="project-list">
      <h2>Project List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Chain</th>
            <th>Max Contribution</th>
            <th>Max Raise</th>
            <th>Token Allocation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>{project.name}</td>
              <td>{project.chain}</td>
              <td>{project.maxContribution}</td>
              <td>{project.maxRaise}</td>
              <td>{project.tokenAllocation}</td>
              <td>
                <button onClick={() => editProject(project.id)}>Edit</button>
                <button onClick={() => deleteProject(project.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;
