import React from "react";
import "./Launch.scss";
import rocket from "../../assets/images/rocket.png";

const Launch = () => {
  return (
    <section className="launch">
      <div className="container">
        <div className="col col--1">
          <img src={rocket} alt="rocket" />
          <button className="launch__btn">Apply to launch</button>
        </div>

        <div className="col col--2">
          <div>
            <p>IDO Project</p>
            <p className="figures">0</p>
          </div>

          <div>
            <p>Total Project</p>
            <p className="figures">0</p>
          </div>

          <div>
            <p>ATH AVG ROI</p>
            <p className="figures">+0%</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Launch;
