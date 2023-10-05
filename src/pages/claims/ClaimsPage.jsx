import React from "react";
import "./ClaimsPage.scss";
import profile from "../../assets/images/profile.png";
import sadFace from "../../assets/images/sad-face.svg";
import { Link } from "react-router-dom";

const Claims = () => {
  return (
    <section className="claims">
      <div className="container">
        <div className="user">
          <img src={profile} alt="profile" />
          <div className="user__wallet">
            <p>
              Your Balance <span>0 ETH</span>
            </p>
            <div className="divider"></div>
            <p>
              Your Projects <span>0</span>
            </p>
          </div>
        </div>
        <h1>Your Portfolio</h1>
        <p>Great first projects invested by you!</p>

        <div className="emoji">
          <img src={sadFace} alt="sad" />
          <p>
            You have not participated in any projects.
            <Link to="/launchpad" className="link">
              Go to Launchpad
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Claims;
