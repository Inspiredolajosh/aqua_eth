// MyProvider.js

import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

const MyContext = createContext();

export function MyProvider({ children }) {
  const [state, setState] = useState({
    isConnected: false,
    defaultAccount: null,
    networkChainId: null,
    isModalOpen: false,
    isNetworkPopupOpen: false,
    selectedNetwork: null,
  });

  const [isCardPopupOpen, setIsCardPopupOpen] = useState(false);

  useEffect(() => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          setState((prevState) => ({
            ...prevState,
            isConnected: false,
            defaultAccount: null,
          }));
        } else {
          const signer = provider.getSigner();
          signer.getAddress().then((address) => {
            setState((prevState) => ({
              ...prevState,
              isConnected: true,
              defaultAccount: address,
            }));
          }).catch((error) => {
            console.error("Failed to get address:", error);
          });
        }
      });

      window.ethereum.on("chainChanged", (chainId) => {
        setState((prevState) => ({
          ...prevState,
          networkChainId: chainId,
        }));
      });
    }
  }, []);

  const toggleModal = () => {
    setState((prevState) => ({
      ...prevState,
      isModalOpen: !prevState.isModalOpen,
    }));
  };

  const toggleNetworkPopup = () => {
    setState((prevState) => ({
      ...prevState,
      isNetworkPopupOpen: !prevState.isNetworkPopupOpen,
    }));
  };

  const disconnectWallet = () => {
    setState((prevState) => ({
      ...prevState,
      isConnected: false,
      defaultAccount: null,
    }));
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
                symbol: "SET",
                decimals: 18,
              },
              rpcUrls: ["https://rpc.sepolia.org"], // Replace with the actual RPC URL
              blockExplorerUrls: ["https://sepolia.etherscan.io/"], // Replace with the actual block explorer URL
            },
          ],
        });
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
        return true;
      } else if (network === "Polygon") {
        // Example switch logic for Polygon network
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }], // Replace with the Polygon Mainnet chainId
        });
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
  
  const connectWallet = async (network) => {
    try {
      if (network === "Ethereum" || network === "Sepolia" || network === "BSC") {
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          console.log(`Connected to ${network} with address:`, address);
          
        // Save the connected account and network to local storage
        localStorage.setItem('connectedAccount', address);
        localStorage.setItem('selectedNetwork', network);
        
          return true;
        } else {
          console.error("Ethereum provider not available.");
          return false;
        }
      } else {
        console.error("Invalid network specified for wallet connection");
        return false;
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return false;
    }
  };

  const toggleCardPopup = () => {
    setIsCardPopupOpen((prevState) => !prevState);
  };

  return (
    <MyContext.Provider
      value={{
        state,
        toggleModal,
        toggleNetworkPopup,
        disconnectWallet,
        switchNetwork,
        connectWallet,
        isCardPopupOpen,
        toggleCardPopup,
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
}
