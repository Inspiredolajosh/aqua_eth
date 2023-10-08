import React, { useState, useEffect } from "react";
import "./NavBar.scss";
import logo from "../../assets/images/logo.png";
import Overlay from "../../components/overlay/Overlay";
import { NavLink } from "react-router-dom";
import NetworkPopup from "../NetworkPopup/networkPopup";
import { useMyContext } from "../../../myContext";
import { ethers } from "ethers";
import ErrorNotification from "../error/errorNotification"; // Import ErrorNotification

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(
    localStorage.getItem("isConnected") === "true"
  );
  const [error, setError] = useState(null); // Initialize error state

  const {
    disconnectWallet,
    switchNetwork,
    toggleNetworkPopup,
    state,
    connectWallet,
  } = useMyContext();

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleConnectWallet = async () => {
    if (!window.ethereum) {
      setError(
        "MetaMask or a compatible wallet is not detected. Please install and configure it to use this DApp."
      );
      return;
    }

    toggleNetworkPopup();
  };

  const handleNetworkSelection = async (network) => {
    switchNetwork(network);
    toggleNetworkPopup();

    connectWallet(network);
    setIsConnected(true);
    localStorage.setItem("isConnected", "true");
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
    setIsConnected(false);
    localStorage.setItem("isConnected", "false");
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

  function shortenEthereumAddress(address, length = 6) {
    if (!address) return null;
    if (address.length <= 2 + length) return address;

    const start = address.substring(0, length);
    const end = address.substring(address.length - length);
    return `${start}...${end}`;
  }

  return (
    <nav className="nav">
      {error && (
        <ErrorNotification
          message={error}
          onClose={() => setError(null)}
          timeout={5000} // Adjust the timeout duration (5 seconds)
        />
      )}

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
              <div className="connected-info">
                <span className="wallet-address">
                  {state.defaultAccount &&
                    shortenEthereumAddress(state.defaultAccount, 10)}
                </span>
              </div>
              <button
                onClick={handleDisconnectWallet}
                style={{ marginRight: "10px", fontSize: "12px" }}
              >
                Disconnect
              </button>
            </>
          ) : (
            <button onClick={handleConnectWallet} style={{ fontSize: "12px" }}>
              Connect Wallet
            </button>
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
