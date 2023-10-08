import React, { useEffect, useState } from "react";
import "./Modal.scss";
import trust from "../../assets/images/vertical_blue.png";
import meta from "../../assets/images/MetaMask_Fox.svg.png";
import { useMyContext } from "../../../myContext";

const Modal = ({ isOpen, onClose }) => {
  const { disconnectWallet, switchNetwork, isConnected, selectedNetwork } = useMyContext();

  const connectWallet = async (walletType) => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        const selectedAddress = accounts[0];

        if (selectedAddress) {
          switchNetwork(walletType);
          onClose();
        }
      } else {
        window.alert("Please install a compatible Ethereum wallet provider to connect.");
      }
    } catch (error) {
      console.error(error);
      window.alert(`Failed to connect to ${walletType}.`);
    }
  };

  const handleDisconnectWallet = () => {
    disconnectWallet();
    onClose();
  };

  useEffect(() => {
    if (isConnected) {
      onClose();
    }
  }, [isConnected, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2 className="text-primary">Connect Wallet</h2>
        {!isConnected ? (
          <div>
            <button
              className="connect-wallets connect-wallets--trust"
              onClick={() => connectWallet("Trust Wallet")}
            >
              <img src={trust} alt="trust" />
              <h2>Trust Wallet</h2>
            </button>

            <button
              className="connect-wallets connect-wallets--meta"
              onClick={() => connectWallet("MetaMask")}
            >
              <img src={meta} alt="meta" />
              <h2>MetaMask</h2>
            </button>
          </div>
        ) : (
          <div>
            <p>Connected with {selectedAddress}</p>
            <button className="disconnect-btn" onClick={handleDisconnectWallet}>
              Disconnect Wallet
            </button>
          </div>
        )}
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
