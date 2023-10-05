import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import LaunchPadPage from "./pages/launchpad/LaunchPadPage";
import ClaimsPage from "./pages/claims/ClaimsPage";
import AirdropPage from "./pages/airdrops/AirdropPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "launchpad", element: <LaunchPadPage /> },
      { path: "airdrop", element: <AirdropPage /> },
      { path: "claims", element: <ClaimsPage /> },
    ],
  },
]);

export default router;
