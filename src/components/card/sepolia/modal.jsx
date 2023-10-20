// Import necessary libraries and files
import React, { useState, useEffect } from 'react';
import './scss/modal.scss';
import { ethers } from 'ethers';
import sepoliaABI from './sepoliaABI.json';

const Modal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(0);

  const handleBuyNowClick = () => {
    console.log("Buy Now button clicked!");
    setIsModalOpen(true);
  };

  useEffect(() => {
    const checkContractConnection = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const contractAddress = '0x2b970ae5E35332bC0a92B919D09A3d6c2Ec9Effe';
          const contractABI = sepoliaABI;
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
  
          // Check if contract is connected
          if (contract.provider) {
            console.log("Contract connected:", contract);
          } else {
            console.log("Contract not connected");
          }
        }
      } catch (error) {
        console.error('Failed to connect to contract:', error);
      }
    };
  
    checkContractConnection();
  }, []);

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleBuy = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      await window.ethereum.enable();
      const signer = provider.getSigner();
      const contractAddress = '0x2b970ae5E35332bC0a92B919D09A3d6c2Ec9Effe';
      const contractABI = sepoliaABI;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const price = ethers.utils.parseEther('0.0034');
      const transactionParameters = {
        value: price,
      };

      const contractWithSigner = contract.connect(signer);
      const transaction = await contractWithSigner.presale(amount, transactionParameters);
      await transaction.wait();

      window.alert('Token bought Successfully!');
    } catch (error) {
      console.error(error);
      window.alert('Failed to buy. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>
            &times
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
          <button className="buy-button" onClick={handleBuyNowClick}>
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
