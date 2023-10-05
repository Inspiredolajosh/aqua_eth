import React from "react";
import "./ActiveCard.scss";

const ActiveCard = ({ heading, text }) => {
  return (
    <div className="active-card">
      <h1>{heading}</h1>
      <div className="container">
        <p>
          {text}
          <br />
          Apply for Launch
        </p>

        <button>Sumbit</button>
      </div>
    </div>
  );
};

export default ActiveCard;
