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
    selectedNetwork: null, // Add selectedNetwork to the state
  });

  useEffect(() => {
    // Check if the Ethereum provider is available in the window object
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Listen for account changes
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          setState((prevState) => ({
            ...prevState,
            isConnected: false,
            defaultAccount: null,
          }));
        } else {
          // User connected or switched accounts
          const signer = provider.getSigner();
          signer
            .getAddress()
            .then((address) => {
              // Update the state with the connected wallet's address
              setState((prevState) => ({
                ...prevState,
                isConnected: true,
                defaultAccount: address,
              }));
            })
            .catch((error) => {
              console.error("Failed to get address:", error);
            });
        }
      });

      // Listen for network changes
      window.ethereum.on("chainChanged", (chainId) => {
        // Update the state with the new network chain ID
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

  const switchNetwork = (network) => {
    setState((prevState) => ({
      ...prevState,
      networkChainId: network,
    }));
  };

  const connectWallet = async (network) => {
    try {
      if (network === "Ethereum") {
        // Connect to Ethereum Mainnet
        if (window.ethereum) {
          await window.ethereum.request({ method: "eth_requestAccounts" });
          // You can now use ethers.js for Ethereum interactions
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          console.log("Connected to Ethereum Mainnet with address:", address);
          // Perform any additional actions for Ethereum Mainnet here
          setState((prevState) => ({
            ...prevState,
            isConnected: true,
          }));
        } else {
          console.error("Ethereum provider not available.");
        }
      } else if (network === "Goerli") {
        // Connect to Ethereum Goerli Testnet
        if (window.ethereum) {
          const goerliNetworkId = "0x5"; // Goerli Testnet Chain ID
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: goerliNetworkId,
                  chainName: "Ethereum Goerli Testnet",
                  nativeCurrency: {
                    name: "ETH",
                    symbol: "eth",
                    decimals: 18,
                  },
                  rpcUrls: ["https://goerli.infura.io/v3/85341e557d664d38aa3fbb1ef6d9d7db"],
                  blockExplorerUrls: ["https://goerli.etherscan.io/"],
                },
              ],
            });
            await window.ethereum.request({ method: "eth_requestAccounts" });
            // You can now interact with Goerli Testnet
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            console.log("Connected to Ethereum Goerli Testnet with address:", address);
            // Perform any additional actions for Goerli Testnet here
            setState((prevState) => ({
              ...prevState,
              isConnected: true,
            }));
          } catch (error) {
            console.error("Failed to connect to Goerli Testnet:", error);
          }
        } else {
          console.error("Ethereum provider not available.");
        }
      } else if (network === "Sepolia") {
        // Connect to Ethereum Sepolia Testnet
        if (window.ethereum) {
          const sepoliaNetworkId = "0x31337"; // Sepolia Testnet Chain ID (Hardhat Network)
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: sepoliaNetworkId,
                  chainName: "Ethereum Sepolia Testnet",
                  nativeCurrency: {
                    name: "ETH",
                    symbol: "eth",
                    decimals: 18,
                  },
                  rpcUrls: ["https://sepolia.infura.io/v3/85341e557d664d38aa3fbb1ef6d9d7db"], // Update with your Sepolia Testnet RPC URL
                  blockExplorerUrls: ["https://sepolia.etherscan.io/"], // Update with your block explorer URL
                },
              ],
            });
            await window.ethereum.request({ method: "eth_requestAccounts" });
            // You can now interact with Sepolia Testnet
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            console.log("Connected to Ethereum Sepolia Testnet with address:", address);
            // Perform any additional actions for Sepolia Testnet here
            setState((prevState) => ({
              ...prevState,
              isConnected: true,
            }));
          } catch (error) {
            console.error("Failed to connect to Sepolia Testnet:", error);
          }
        } else {
          console.error("Ethereum provider not available.");
        }
      } else if (network === "BSC") {
        // Connect to Binance Smart Chain (BSC) Mainnet
        if (window.ethereum) {
          const bscNetworkId = "0x38"; // BSC Mainnet Chain ID
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: bscNetworkId,
                  chainName: "Binance Smart Chain Mainnet",
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "bnb",
                    decimals: 18,
                  },
                  rpcUrls: ["https://bsc-dataseed.binance.org/"],
                  blockExplorerUrls: ["https://bscscan.com/"],
                },
              ],
            });
            await window.ethereum.request({ method: "eth_requestAccounts" });
            // You can now interact with BSC Mainnet
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            console.log("Connected to BSC Mainnet with address:", address);
            // Perform any additional actions for BSC Mainnet here
            setState((prevState) => ({
              ...prevState,
              isConnected: true,
            }));
          } catch (error) {
            console.error("Failed to connect to BSC Mainnet:", error);
          }
        } else {
          console.error("Ethereum provider not available.");
        }
      } else if (network === "BSC Testnet") {
        // Connect to Binance Smart Chain (BSC) Testnet
        if (window.ethereum) {
          const bscTestnetNetworkId = "0x61"; // BSC Testnet Chain ID
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: bscTestnetNetworkId,
                  chainName: "Binance Smart Chain Testnet",
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "bnb",
                    decimals: 18,
                  },
                  rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                  blockExplorerUrls: ["https://testnet.bscscan.com/"],
                },
              ],
            });
            await window.ethereum.request({ method: "eth_requestAccounts" });
            // You can now interact with BSC Testnet
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            console.log("Connected to BSC Testnet with address:", address);
            // Perform any additional actions for BSC Testnet here
            setState((prevState) => ({
              ...prevState,
              isConnected: true,
            }));
          } catch (error) {
            console.error("Failed to connect to BSC Testnet:", error);
          }
        } else {
          console.error("Ethereum provider not available.");
        }
      } else if (network === "Polygon") {
        // Connect to Polygon Mainnet
        if (window.ethereum) {
          const polygonNetworkId = "0x89"; // Polygon Mainnet Chain ID
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: polygonNetworkId,
                  chainName: "Polygon Mainnet",
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "matic",
                    decimals: 18,
                  },
                  rpcUrls: ["https://polygon-rpc.com/"],
                  blockExplorerUrls: ["https://explorer.polygon.network/"],
                },
              ],
            });
            await window.ethereum.request({ method: "eth_requestAccounts" });
            // You can now interact with Polygon Mainnet
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            console.log("Connected to Polygon Mainnet with address:", address);
            // Perform any additional actions for Polygon Mainnet here
            setState((prevState) => ({
              ...prevState,
              isConnected: true,
            }));
          } catch (error) {
            console.error("Failed to connect to Polygon Mainnet:", error);
          }
        } else {
          console.error("Ethereum provider not available.");
        }
      } else if (network === "Polygon Testnet") {
        // Connect to Polygon Testnet
        if (window.ethereum) {
          const polygonTestnetNetworkId = "0x13881"; // Polygon Testnet Chain ID
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: polygonTestnetNetworkId,
                  chainName: "Polygon Testnet",
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "matic",
                    decimals: 18,
                  },
                  rpcUrls: ["https://rpc-mumbai.matic.today"],
                  blockExplorerUrls: ["https://mumbai-explorer.matic.today/"],
                },
              ],
            });
            await window.ethereum.request({ method: "eth_requestAccounts" });
            // You can now interact with Polygon Testnet
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            console.log("Connected to Polygon Testnet with address:", address);
            // Perform any additional actions for Polygon Testnet here
            setState((prevState) => ({
              ...prevState,
              isConnected: true,
            }));
          } catch (error) {
            console.error("Failed to connect to Polygon Testnet:", error);
          }
        } else {
          console.error("Ethereum provider not available.");
        }
      } else {
        console.error("Unsupported network:", network);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };
  
  

  return (
    <MyContext.Provider
      value={{
        state,
        toggleModal,
        toggleNetworkPopup,
        disconnectWallet,
        switchNetwork,
        connectWallet, // Include connectWallet in the context value
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
