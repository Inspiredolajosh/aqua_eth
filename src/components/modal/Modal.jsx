import React, { useEffect } from "react";
import "./Modal.scss";
import trust from "../../assets/images/vertical_blue.png";
import meta from "../../assets/images/MetaMask_Fox.svg.png";
import { ethers } from "ethers"; // Import ethers.js

const Modal = ({ isOpen, onClose, onConnect }) => {
  const connectWithTrustWallet = async () => {
    if (window.ethereum && window.ethereum.isTrust) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        onConnect(address);
        onClose();
      } catch (error) {
        console.error("Failed to connect to Trust Wallet:", error);
      }
    }
  };

  const connectWithMetaMask = async () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        onConnect(address);
        onClose();
      } catch (error) {
        console.error("Failed to connect to MetaMask:", error);
      }
    }
  };

  useEffect(() => {
    // Check if Trust Wallet or MetaMask is installed
    if (window.ethereum) {
      window.ethereum.autoRefreshOnNetworkChange = false;
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          onConnect(null);
        }
      });
    }
  }, [onConnect]);

  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2 className="text-primary">Connect Wallet</h2>
        <button
          className="connect-wallets connect-wallets--trust"
          onClick={connectWithTrustWallet}
        >
          <img src={trust} alt="trust" />
          <h2>Trust Wallet</h2>
        </button>

        <button
          className="connect-wallets connect-wallets--meta"
          onClick={connectWithMetaMask}
        >
          <img src={meta} alt="meta" />
          <h2>MetaMask</h2>
        </button>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
