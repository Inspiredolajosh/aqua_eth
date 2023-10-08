import React, { useState } from "react";
import "./errorNotification.scss"; // You can create a CSS file for styling

const ErrorNotification = ({ message, onClose }) => {
  // Use state to control the visibility of the error message
  const [isVisible, setIsVisible] = useState(true);

  // Automatically hide the error message after 5 seconds
  setTimeout(() => {
    setIsVisible(false);
    onClose(); // Callback to perform additional actions when the message is closed
  }, 5000);

  // Handle the close button click
  const handleCloseClick = () => {
    setIsVisible(false);
    onClose(); // Callback to perform additional actions when the message is closed
  };

  return (
    isVisible && (
      <div className="error-notification">
        <p>{message}</p>
        <button className="close-button" onClick={handleCloseClick}>
          Close
        </button>
      </div>
    )
  );
};

export default ErrorNotification;
