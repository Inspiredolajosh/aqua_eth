import React, { useState, useEffect } from "react";
import "./NavBar.scss";
import Modal from "../../components/modal/Modal";
import logo from "../../assets/images/logo.png";
import Overlay from "../../components/overlay/Overlay";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector from Redux

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);

  // Use useSelector to access state from Redux
  const isConnected = useSelector(state => state.isConnected);
  const defaultAccount = useSelector(state => state.defaultAccount);
  const networkChainId = useSelector(state => state.networkChainId);

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

  const handleCloseModal = () => {
    setModalOpen(false);
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
          <button onClick={handleConnectWallet}>Connect Wallet</button>
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
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </>
      )}
    </nav>
  );
};

export default NavBar;
