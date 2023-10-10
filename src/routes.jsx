import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/homepage/HomePage";
import Layout from "./pages/Layout";
import ErrorPage from "./pages/ErrorPage";
import LaunchPadPage from "./pages/launchpad/LaunchPadPage";
import ClaimsPage from "./pages/claims/ClaimsPage";
import AirdropPage from "./pages/airdrops/AirdropPage";
import AdminPage from "./pages/authAdmin/authAdmin";
import ProjectList from "./pages/authAdmin/projectList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "launchpad", element: <LaunchPadPage /> },
      { path: "airdrop", element: <AirdropPage /> }, // Add Airdrop page route
      { path: "claims", element: <ClaimsPage /> }, // Add Claims page route
      // Add a catch-all route to handle direct access to other pages
      { path: "*", element: <LaunchPadPage /> }, // You can use any desired fallback page here
      // In your route configuration (e.g., routes.js)
{ path: "authAdmin", element: <AdminPage /> },
{ path: "projectList", element: <ProjectList /> },

    ],
  },
]);

export default router;
