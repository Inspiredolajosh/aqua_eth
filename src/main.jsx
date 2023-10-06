import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { walletReducer } from "./redux/actions"; 
import "./index.scss";

import router from "./routes";
import { RouterProvider } from "react-router";

// Combine your reducers
const rootReducer = combineReducers({
  wallet: walletReducer,
  // Add other reducers if needed
});

// Create the Redux store
const store = createStore(rootReducer);

// ...

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
