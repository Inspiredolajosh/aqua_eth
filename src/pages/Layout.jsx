import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { ethers } from "ethers"; // Import ethers.js

const Layout = () => {
  const location = useLocation();
  const page =
    location.pathname === "/claims" || location.pathname === "/airdrop";

  // State for wallet and network
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [networkChainId, setNetworkChainId] = useState(null);

  // useEffect(() => {
  //   async function initialize() {
  //     if (window.ethereum) {
  //       try {
  //         // Request user's permission to connect their Ethereum wallet
  //         await window.ethereum.request({ method: "eth_requestAccounts" });
  //         const provider = new ethers.providers.Web3Provider(window.ethereum);
  //         const signer = provider.getSigner();
  //         const address = await signer.getAddress();

  //         setDefaultAccount(address);
  //         setIsConnected(true);

  //         const network = await provider.getNetwork();
  //         setNetworkChainId(network.chainId);
  //       } catch (error) {
  //         console.error("Failed to connect to the wallet:", error);
  //       }
  //     }
  //   }

  //   initialize();
  // }, []);

  return (
    <>
      <NavBar
        isConnected={isConnected}
        defaultAccount={defaultAccount}
        networkChainId={networkChainId}
      />
      <Outlet />
      {!page && <Footer />}
    </>
  );
};

export default Layout;
