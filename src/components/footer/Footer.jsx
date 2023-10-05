import React from "react";
import "./Footer.scss";
import tweeter from "../../assets/images/twitter.png";
import telegram from "../../assets/images/telegram.png";
import discord from "../../assets/images/discord.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="social">
          <img src={tweeter} alt="twitter" />
          <img src={telegram} alt="telegram" />
          <img src={discord} alt="discord" />
        </div>
        <p>Copyright © 2023. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
