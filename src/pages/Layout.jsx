import React, { useState, useEffect } from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";


const Layout = () => {
  const location = useLocation();
  const page =
    location.pathname === "/claims" || location.pathname === "/airdrop";


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
