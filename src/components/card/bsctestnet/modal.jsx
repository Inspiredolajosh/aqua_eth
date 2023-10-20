import React, { useState, useEffect } from 'react';
import './scss/modal.scss';

const Modal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleBuy = () => {
    // Add your buy logic here
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times;
          </span>
          <h2>Enter the amount to buy</h2>
          <div className="amount-input">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <button className="buy-button" onClick={handleBuy}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
