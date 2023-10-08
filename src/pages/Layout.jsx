import React, { useEffect } from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";
import { useMyContext } from "../../myContext"; // Import useMyContext

const Layout = () => {
  const location = useLocation();
  const page =
    location.pathname === "/claims" || location.pathname === "/airdrop";

  // Access context values using useMyContext
  const { state } = useMyContext();
  const { isConnected, defaultAccount, networkChainId } = state;

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
