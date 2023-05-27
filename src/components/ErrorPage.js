import React from "react";
import "./Error.css";
import { FaExclamationTriangle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div className="page">
      <FaExclamationTriangle className="icon" />
      <h1 className="heading">404! Page not Found!!</h1>
      <p className="message">We're sorry, Please try again later.</p>
      <NavLink to="/" className="button">
        Back to Homepage
      </NavLink>
    </div>
  );
};

export default ErrorPage;
