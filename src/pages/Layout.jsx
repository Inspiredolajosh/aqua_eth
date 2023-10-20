import React from "react";
import NavBar from "../components/navbar/NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";

const Layout = () => {
  const location = useLocation();
  const page =
    location.pathname === "/claims" || location.pathname === "/airdrop";
  return (
    <>
      <NavBar />
      <Outlet />
      {!page && <Footer />}
    </>
  );
};

export default Layout;
