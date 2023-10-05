import React from "react";
import "./Card.scss";
import logo from "../../assets/images/logo.png";

const Card = () => {
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
          <img src={logo} alt="Logo" />
          <div className="contribution__text-box">
            <h2>AquaEth</h2>
            <p>MaxContribution: 3Eth</p>
          </div>
        </div>

        {/* Progrss */}
        <div className="token">
          <div className="token__col token__raise">
            <p>Max raise</p>
            <p>20Eth</p>
          </div>

          <div className="token__col token__allocation">
            <p>Token Allocation</p>
            <p>50, 000Eth</p>
          </div>

          <div className="progress">
            <div className="token__col progress__text">
              <p>Progress</p>
              <p>15%</p>
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
            <p>3Eth</p>
          </div>

          <div>
            <p>Contributions</p>
            <p>1</p>
          </div>

          <div>
            <p>Min</p>
            <p>0.02Eth</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
