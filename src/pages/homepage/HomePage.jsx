import React from "react";
import "./HomePage.scss";
import logo from "../../assets/images/logo.png";
import BlockChains from "../../components/blockchains/BlockChains";
import Launch from "../../components/launch/Launch";

const HomePage = () => {
  return (
    <>
      <div className="home">
        <div className="container">
          <div className="col col--1">
            <h1>Empower your Project With Aquapad</h1>
            <p>
              The blockchain ecosystem has witnessed exponential growth,
              resulting in the emergence of numerous blockchain networks.
              However, this fragmentation has created challenges for projects
              aiming to launch on multiple chains. AquaEth addresses this issue
              by offering a robust and streamlined launchpad platform, enabling
              projects to seamlessly deploy on various blockchains.
            </p>
            <button className="hero-btn">Launch App</button>
          </div>

          <div className="col col--2">
            <img src={logo} alt="hero-img" />
          </div>
        </div>
      </div>

      {/* Supported BlockChain */}
      <BlockChains />

      {/* Launch section */}
      <Launch />
    </>
  );
};

export default HomePage;
