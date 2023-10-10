import React from "react";
import "./Card.scss";
import { useMyContext } from "../../../myContext";

const Card = ({ project }) => {
  const { isCardPopupOpen, toggleCardPopup } = useMyContext();

  const openPopup = () => {
    toggleCardPopup();
  };

  return (
    <div className="card">
      <div className="container">
        {/* sale live */}
        <div className="sale-live">
          <span></span>
          <p>Sale Live</p>
        </div>

        {/* Contribution */}
        <div className="contribution">
          <img src={project.logo} alt="Logo" />
          <div className="contribution__text-box">
            <h2>{project.name}</h2>
            <p>Max Contribution: {project.maxContribution} Eth</p>
          </div>
        </div>

        {/* Progress */}
        <div className="token">
          <div className="token__col token__raise">
            <p>Max raise</p>
            <p>{project.maxRaise} Eth</p>
          </div>

          <div className="token__col token__allocation">
            <p>Token Allocation</p>
            <p>{project.tokenAllocation} Eth</p>
          </div>

          <div className="progress">
            <div className="token__col progress__text">
              <p>Progress</p>
              <p>{project.progress}%</p>
            </div>
            <div className="progress__bar">
              <span></span>
            </div>
          </div>
        </div>

        {/* MinValues */}
        <div className="values">
          <div>
            <p>Max</p>
            <p>{project.maxContribution} Eth</p>
          </div>

          <div>
            <p>Contributions</p>
            <p>{project.contributions}</p>
          </div>

          <div>
            <p>Min</p>
            <p>{project.minContribution} Eth</p>
          </div>
        </div>

        {/* Buy Button */}
        <button className="buy-button" onClick={openPopup}>
          {isCardPopupOpen ? "Buying..." : "Buy"}
        </button>
      </div>
    </div>
  );
};

export default Card;
