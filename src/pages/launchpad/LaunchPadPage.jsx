import React from "react";
import "./LaunchPadPage.scss";
import rocket from "../../assets/images/rocket.png";
import Card from "../../components/card/Card";
import ActiveCard from "../../components/activecard/ActiveCard";

const LaunchPadPage = () => {
  return (
    <div className="launchpad">
      <div className="container">
        <h1>IDO Projects</h1>
        <div className="row">
          <Card />
          <ActiveCard
            heading="Complete"
            text="No completed project at the moment."
          />
          <ActiveCard
            heading="Active"
            text="No Active project at the moment."
          />
        </div>
      </div>
    </div>
  );
};

export default LaunchPadPage;
