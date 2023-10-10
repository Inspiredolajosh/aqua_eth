import React, { useState } from "react";
import "./LaunchPadPage.scss";
import Card from "../../components/card/Card";
import CardPopup from "../../components/cardPopup/cardPopup";
import { useMyContext } from "../../../myContext";

const LaunchPadPage = () => {
  const [selectedChain, setSelectedChain] = useState("All");
  const [isBuying, setIsBuying] = useState(false);

  const { isCardPopupOpen, toggleCardPopup, setSelectedProject } = useMyContext();

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

  const mainnetProjects = projects.filter(
    (project) => project.chain === "Ethereum" || project.chain === "Binance Smart Chain"
  );
  const testnetProjects = projects.filter(
    (project) => project.chain === "Polygon"
  );

  const filteredProjects =
    selectedChain === "All"
      ? projects
      : selectedChain === "Mainnet"
      ? mainnetProjects
      : testnetProjects;

  const handleOpenCardPopup = (project) => {
    setSelectedProject(project);
    setIsCardPopupOpen(true); // Open the card popup
  };

  const handleBuyClick = () => {
    setIsBuying(true);

    setTimeout(() => {
      setIsBuying(false);
      alert(`You have successfully bought ${selectedProject.name} tokens.`);
      setIsCardPopupOpen(false); // Close the card popup after buying
    }, 2000);
  };

  return (
    <div className="launchpad">
      <div className="container">
        <h1>IDO Projects</h1>

        <div className="custom-dropdown">
          <select
                  value={projects.chain}
            onChange={(e) => setSelectedChain(e.target.value)}
          >
            <option value="All">All Chains</option>
            <option value="Mainnet">Mainnet</option>
            <option value="Testnet">Testnet</option>
          </select>
        </div>

        <div className="card-row">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              project={project}
              onOpenPopup={() => handleOpenCardPopup(project)}
            />
          ))}
        </div>
      </div>

      {isCardPopupOpen && (
        <CardPopup
          onClose={() => setIsCardPopupOpen(false)}
          onBuy={handleBuyClick}
          isBuying={isBuying}
        />
      )}
    </div>
  );
};

export default LaunchPadPage;