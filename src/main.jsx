import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import router from "./routes";
import { RouterProvider } from "react-router";
import { MyProvider } from "../myContext";
import { createRoot } from "react-dom/client";

// Wrap your entire application with createRoot and MyProvider
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MyProvider>
      <RouterProvider router={router} />
    </MyProvider>
  </React.StrictMode>
);
