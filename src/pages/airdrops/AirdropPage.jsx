import React from "react";
import "./AirdropPage.scss";
import empty from "../../assets/images/empty.png";

const AirdropPage = () => {
  return (
    <div className="airdrop">
      <div className="container">
        <img src={empty} alt="empty" />
        <p>Coming Soon...</p>
      </div>
    </div>
  );
};

export default AirdropPage;
