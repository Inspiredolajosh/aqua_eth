import React, { useContext } from "react";
import "./cardPopup.scss";
import { useMyContext } from "../../../myContext";

const CardPopup = ({ onClose }) => {
  const { project, onBuy, isBuying } = useMyContext(); // Access states and functions from the context

  const handleBuy = () => {
    if (isBuying) {
      // Don't allow buying while the previous purchase is in progress
      return;
    }
    // Show a confirmation dialog before proceeding with the purchase
    if (window.confirm(`Do you want to buy ${project.name} tokens?`)) {
      onBuy(); // Trigger the buy action from the context
    }
  };

  return (
    <div className="card-popup">
      <div className="popup-content">
        <div className="popup-header">
          <h2>{project.name}</h2>
          <button className="close-button" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="popup-details">
          <p>Max Contribution: {project.maxContribution} Eth</p>
          <p>Max Raise: {project.maxRaise} Eth</p>
          <p>Token Allocation: {project.tokenAllocation} Eth</p>
          <p>Progress: {project.progress}%</p>
          <p>Contributions: {project.contributions}</p>
          <p>Min Contribution: {project.minContribution} Eth</p>
        </div>
        <button className="buy-button" onClick={handleBuy} disabled={isBuying}>
          {isBuying ? "Buying..." : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default CardPopup;
