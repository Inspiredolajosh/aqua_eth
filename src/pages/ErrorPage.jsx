import React from "react";
import NavBar from "../components/navbar/NavBar";
import { isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <NavBar />
      <h1>Oops...</h1>
      <p>{isRouteErrorResponse(error) ? "Ivalid Page" : "Unexpected Error"}</p>
    </>
  );
};

export default ErrorPage;
