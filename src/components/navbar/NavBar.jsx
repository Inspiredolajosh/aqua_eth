import React, { useState, useEffect } from "react";
import "./NavBar.scss";
import Modal from "../../components/modal/Modal";
import logo from "../../assets/images/logo.png";
import Overlay from "../../components/overlay/Overlay";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector and useDispatch from Redux
import { disconnectWallet, switchNetwork } from "../../redux/actions"; // Import your Redux actions
import NetworkPopup from "../NetworkPopup/networkPopup"; // Import the NetworkPopup component

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isNetworkPopupOpen, setNetworkPopupOpen] = useState(false);

  // Use useSelector to access state from Redux
  const isConnected = useSelector((state) => state.wallet.isConnected);
  const selectedNetwork = useSelector((state) => state.wallet.selectedNetwork);

  const dispatch = useDispatch(); // Initialize the dispatch function

  const handleClick = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleConnectWallet = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const handleDisconnectWallet = () => {
    dispatch(disconnectWallet()); // Dispatch action to disconnect the wallet
  };

  const handleNetworkSwitch = () => {
    setNetworkPopupOpen(true);
  };

  const handleCloseNetworkPopup = () => {
    setNetworkPopupOpen(false);
  };

  const handleNetworkSelection = (network) => {
    dispatch(switchNetwork(network)); // Dispatch action to switch the network
    handleCloseNetworkPopup();
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }

    // Clean up the class when the component unmounts
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
          {/* Add other navigation links here */}
        </div>

        <div className="nav__btn">
          {isConnected ? (
            <button onClick={handleDisconnectWallet}>Disconnect Wallet</button>
          ) : (
            <button onClick={handleConnectWallet}>Connect Wallet</button>
          )}
          <button onClick={handleNetworkSwitch}>Switch Network</button>
        </div>

        <div className="burger" onClick={handleClick}>
          <div className="lines"></div>
          <div className="lines"></div>
          <div className="lines"></div>
        </div>
      </div>

      {isModalOpen && (
        <>
          <Overlay />
          <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </>
      )}

      {isNetworkPopupOpen && (
        <NetworkPopup
          onClose={handleCloseNetworkPopup}
          onSelectNetwork={handleNetworkSelection}
        />
      )}
    </nav>
  );
};

export default NavBar;
