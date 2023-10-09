import React, { useState } from "react";
import "./LaunchPadPage.scss";
import Card from "../../components/card/Card";

const LaunchPadPage = () => {
  const [selectedChain, setSelectedChain] = useState("All"); // Initial selection is "All"

  const projects = [
    {
      name: "Project 1 (Eth)",
      chain: "Ethereum",
      maxContribution: 3,
      maxRaise: 20,
      tokenAllocation: 50000,
      progress: 15,
      contributions: 10,
      minContribution: 0.02,
      logo: "logo1.png",
    },
    {
      name: "Project 2 (Eth)",
      chain: "Ethereum",
      maxContribution: 2,
      maxRaise: 15,
      tokenAllocation: 40000,
      progress: 25,
      contributions: 5,
      minContribution: 0.01,
      logo: "logo2.png",
    },
    {
      name: "Project 1 (BSC)",
      chain: "Binance Smart Chain",
      maxContribution: 3,
      maxRaise: 20,
      tokenAllocation: 50000,
      progress: 15,
      contributions: 10,
      minContribution: 0.02,
      logo: "logo1.png",
    },
    {
      name: "Project 2 (BSC)",
      chain: "Binance Smart Chain",
      maxContribution: 2,
      maxRaise: 15,
      tokenAllocation: 40000,
      progress: 25,
      contributions: 5,
      minContribution: 0.01,
      logo: "logo2.png",
    },
    {
      name: "Project 1 (Polygon)",
      chain: "Polygon",
      maxContribution: 3,
      maxRaise: 20,
      tokenAllocation: 50000,
      progress: 15,
      contributions: 10,
      minContribution: 0.02,
      logo: "logo1.png",
    },
    // Add more project data as needed
  ];

  const chains = [...new Set(projects.map((project) => project.chain))];

  // Function to filter projects based on the selected chain
  const filteredProjects = projects.filter(
    (project) => selectedChain === "All" || project.chain === selectedChain
  );

  return (
    <div className="launchpad">
      <div className="container">
        <h1>IDO Projects</h1>

        {/* Custom Dropdown */}
        <div className="custom-dropdown">
          <select
            value={selectedChain}
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            <option value="All">All</option>
            {chains.map((chain) => (
              <option key={chain} value={chain}>
                {chain}
              </option>
            ))}
          </select>
        </div>

        <div className="card-row">
          {/* Render Card components for filtered projects */}
          {filteredProjects.map((project, index) => (
            <Card key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LaunchPadPage;
