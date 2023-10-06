import React from "react";
import "./networkPopup.scss";
import { useDispatch, useSelector } from "react-redux";
import { switchNetwork } from "../../redux/actions"; // Import your switchNetwork action

const NetworkPopup = ({ onClose, onSelectNetwork }) => {
  const dispatch = useDispatch();
  const selectedNetwork = useSelector((state) => state.wallet.selectedNetwork);

  const handleNetworkSelect = (network) => {
    dispatch(switchNetwork(network)); // Dispatch action to switch the network
    onSelectNetwork(network); // Callback to handle network selection in NavBar
    onClose();
  };

  return (
    <div className="network-popup">
      <div className="network-popup-content">
        <h2>Select a Network</h2>
        <ul>
          <li
            onClick={() => handleNetworkSelect("Ethereum")}
            className={selectedNetwork === "Ethereum" ? "active" : ""}
          >
            Ethereum
          </li>
          <li
            onClick={() => handleNetworkSelect("BSC")}
            className={selectedNetwork === "BSC" ? "active" : ""}
          >
            Binance Smart Chain (BSC)
          </li>
          <li
            onClick={() => handleNetworkSelect("Matic")}
            className={selectedNetwork === "Matic" ? "active" : ""}
          >
            Polygon
          </li>
          
        </ul>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NetworkPopup;
