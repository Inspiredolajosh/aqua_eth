import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../redux"; // Import your Redux store
import "./index.scss";

import router from "./routes";
import { RouterProvider } from "react-router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
