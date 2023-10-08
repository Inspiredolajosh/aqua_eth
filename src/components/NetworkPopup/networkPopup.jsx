import React from "react";
import "./networkPopup.scss";
import { useMyContext } from "../../../myContext";

const NetworkPopup = ({ onClose, onSelectNetwork }) => {
  const { state } = useMyContext();

  const handleNetworkSelect = (network) => {
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
            className={state.selectedNetwork === "Ethereum" ? "active" : ""}
          >
            Ethereum Mainnet
          </li>
          {/* <li
            onClick={() => handleNetworkSelect("Goerli")}
            className={state.selectedNetwork === "Goerli" ? "active" : ""}
          >
            Ethereum Goerli Testnet
          </li> */}
          <li
            onClick={() => handleNetworkSelect("Sepolia")}
            className={state.selectedNetwork === "Sepolia" ? "active" : ""}
          >
            Ethereum Sepolia Testnet
          </li>
          <li
            onClick={() => handleNetworkSelect("BSC")}
            className={state.selectedNetwork === "BSC" ? "active" : ""}
          >
            Binance Smart Chain (BSC) Mainnet
          </li>
          <li
            onClick={() => handleNetworkSelect("BSC Testnet")}
            className={state.selectedNetwork === "BSC Testnet" ? "active" : ""}
          >
            Binance Smart Chain (BSC) Testnet
          </li>
          <li
            onClick={() => handleNetworkSelect("Polygon")}
            className={state.selectedNetwork === "Polygon" ? "active" : ""}
          >
            Polygon Mainnet
          </li>
          <li
            onClick={() => handleNetworkSelect("Polygon Testnet")}
            className={state.selectedNetwork === "Polygon Testnet" ? "active" : ""}
          >
            Polygon Mumbai Testnet
          </li>
          {/* Add more networks here */}
        </ul>
        <button className="cancel-button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NetworkPopup;
