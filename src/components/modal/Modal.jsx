import React, { useState, useEffect } from 'react';
import { useStore } from '../../store';
import './Modal.scss';
import { ethers } from 'ethers';

const Modal = ({ isOpen, onClose }) => {
  const { selectChain, saveAddress, setConnected  } = useStore();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  

  const {
    selectedChain,
    connected,
  } = useStore();

  const handleChainSelection = async (chain) => {
    const result = await switchNetwork(chain);
    if (result) {
      selectChain(chain);
      saveAddress(''); // Clear saved address on chain selection
      connectWalletToNetwork(chain);
      setConnected(true); // Set the connected state to true
      onClose();
    }
  };
  

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSave = () => {
    saveAddress(address);
    onClose();
  };
  const switchNetwork = async (network) => {
    try {
      if (network === "Ethereum") {
        // Example switch logic for Ethereum network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x1" }], // Replace with the desired chainId
        });
        return true;
      } else if (network === "Sepolia") {
        // Example switch logic for Sepolia network
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0xAA36A7", // Replace with the desired chainId
              chainName: "Sepolia", // Replace with the desired chain name
              nativeCurrency: {
                name: "Sepolia ",
                symbol: "SepoliaETH",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.sepolia.org"], // Replace with the actual RPC URL
              blockExplorerUrls: ["https://sepolia.etherscan.io/"], // Replace with the actual block explorer URL
            },
          ],
        });
        selectChain(network);
        return true;
        
        
      } else if (network === "BSC Testnet") {
        // Example switch logic for BSC Testnet
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x61",
              chainName: "Binance Smart Chain Testnet",
              nativeCurrency: {
                name: "BNB",
                symbol: "bnb",
                decimals: 18,
              },
              rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
              blockExplorerUrls: ["https://testnet.bscscan.com"],
            },
          ],
        });
       
        selectChain(network);
        return true;
      } else if (network === "Polygon") {
        // Example switch logic for Polygon network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }], // Replace with the Polygon Mainnet chainId
        });
        selectChain(network);
        return true;
      } else if (network === "Polygon Testnet") {
        // Example switch logic for Polygon Testnet
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: "0x13881",
              chainName: "Polygon Mumbai Testnet",
              nativeCurrency: {
                name: "MATIC",
                symbol: "matic",
                decimals: 18,
              },
              rpcUrls: ["https://rpc-mumbai.matic.today"],
              blockExplorerUrls: ["https://mumbai.polygonscan.com"],
            },
          ],
        });
        selectChain(network);
        return true;
      } else {
        console.error("Invalid network specified for switching");
        return false;
      }
    } catch (error) {
      console.error("Failed to switch network:", error);
      return false;
    }
  };

  const connectWalletToNetwork = async (network) => {
    try {
      let selectedNetwork = "";
      if (network === "Ethereum" || network === "Sepolia" || network === "BSC Mainnet" || network === "BSC Testnet" || network === "Polygon Mainnet" || network === "Polygon Mumbai") {
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          console.log(`Connected to ${network} with address:`, address);
  
          // Save the connected account and network to local storage
          localStorage.setItem("connectedAccount", address);
          localStorage.setItem("selectedNetwork", network);
  
          setConnected(true);
          selectedNetwork = network;
          saveAddress(address);
  
          return true;
        } else {
          console.error("Ethereum provider not available.");
          setErrorMessage("Oops... try again"); // Set the error message if the provider is not available
          return false;
        }
      } else {
        console.error("Invalid network specified for wallet connection");
        setErrorMessage("Oops... try again"); // Set the error message for an invalid network
        return false;
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      setErrorMessage("Oops... try again"); // Set the error message for any connection errors
      return false;
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Select Chain</h2>
        <div className="chain-buttons">
          <button onClick={() => handleChainSelection('Ethereum')}>Ethereum</button>
          <button onClick={() => handleChainSelection('Sepolia')}>Sepolia</button>
          <button onClick={() => handleChainSelection('BSC Mainnet')}>BSC Mainnet</button>
          <button onClick={() => handleChainSelection('BSC Testnet')}>BSC Testnet</button>
          <button onClick={() => handleChainSelection('Polygon Mainnet')}>Polygon Mainnet</button>
          <button onClick={() => handleChainSelection('Polygon Mumbai')}>Polygon Mumbai</button>
        </div>
      </div>

    
    </div>
  );
};

export default Modal;




