import React, { useState, useEffect } from "react";
import "./NavBar.scss";
import logo from "../../assets/images/logo.png";
import Overlay from "../../components/overlay/Overlay";
import { NavLink } from "react-router-dom";
import NetworkPopup from "../NetworkPopup/networkPopup";
import { useMyContext } from "../../../myContext";
import { ethers } from "ethers";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem("isConnected") === "true" // Retrieve the connected state from localStorage
  );

  const {
    disconnectWallet,
    switchNetwork,
    toggleNetworkPopup,
    state,
    connectWallet, // Include connectWallet from the context
  } = useMyContext();

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleConnectWallet = async () => {
    toggleNetworkPopup();
  };

  const handleNetworkSelection = async (network) => {
    switchNetwork(network);
    toggleNetworkPopup();

    // Call the connectWallet function from the context
    connectWallet(network);
    setIsConnected(true); // Set connected state to true
    localStorage.setItem("isConnected", "true"); // Store connected state in localStorage
    window.location.reload();
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
    setIsConnected(false); // Set connected state to false
    localStorage.setItem("isConnected", "false"); // Store connected state in localStorage
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    return () => {
      document.body.classList.remove("menu-open");
    };
  }, [menuOpen]);

  return (
    <nav className="nav">
      <div className="container">
        <div className="logo">
          <img src={logo} alt="logo" />
        </div>

        <div className={`nav__links ${menuOpen ? "open" : ""}`}>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "link")}
            onClick={closeMenu}
          >
            Home
          </NavLink>
        </div>

        <div className="nav__btn">
  {isConnected ? (
    <>
      <button onClick={handleDisconnectWallet} style={{ marginRight: '10px' }}>
        Disconnect
      </button>
      <button onClick={toggleNetworkPopup}>Switch Network</button>
    </>
  ) : (
    <button onClick={handleConnectWallet}>Connect Wallet</button>
  )}
</div>


        <div className="burger" onClick={handleClick}>
          <div className="lines"></div>
          <div className="lines"></div>
          <div className="lines"></div>
        </div>
      </div>

      {state.isNetworkPopupOpen && (
        <NetworkPopup
          onClose={() => toggleNetworkPopup()}
          onSelectNetwork={handleNetworkSelection}
        />
      )}
    </nav>
  );
};

export default NavBar;
