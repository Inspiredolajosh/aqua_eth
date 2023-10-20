// SepoliaCard.js

import React, { useState, useEffect } from "react";
import Modal from "./Modal"; // Assuming the Modal component is in the same directory
import "./scss/sepoliaCard.scss";
import logo from "../../../assets/images/logo.png";
import { ethers } from "ethers";
import sepoliaABI from "./sepoliaABI.json";

const SepoliaCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);

  const handleBuyNowClick = () => {
    console.log("Buy Now button clicked!");
    setIsModalOpen(true);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
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


  const handleBuy = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' }); // Use eth_requestAccounts instead of enable
      const signer = provider.getSigner();
      const contractAddress = '0x2b970ae5E35332bC0a92B919D09A3d6c2Ec9Effe';
      const contractABI = sepoliaABI;
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const price = ethers.utils.parseEther('0.00006');
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


  


  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card">
      <div className="container">
        {/* sale live */}
        <div className="sale-live">
          <span></span>
          <p>Sale Live</p>
        </div>

        {/* Contribution */}
        <div className="contribution">
          <img src={logo} alt="Logo" />
          <div className="contribution__text-box">
            {/* <h2>AquaEth</h2> */}
            <p>Phase 1</p>
          </div>
        </div>

        {/* Progrss */}
        <div className="token">
          <div className="token__col token__raise">
            <p>Max raise</p>
            <p>20Eth</p>
          </div>

          <div className="token__col token__allocation">
            <p>Token Allocation</p>
            <p>50,000Eth</p>
          </div>

          <div className="progress">
            <div className="token__col progress__text">
              <p>Progress</p>
              <p>15%</p>
            </div>
            <div className="progress__bar">
              <span></span>
            </div>
          </div>
        </div>

        {/* MinValues */}
        <div className="values">
          <div>
            <p>Max</p>
            <p>3Eth</p>
          </div>

          <div>
            <p>Contributions</p>
            <p>1</p>
          </div>

          <div>
            <p>Min</p>
            <p>0.02Eth</p>
          </div>
        </div>

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
          
        {/* Buy button */}
        <button className="buy-button" onClick={handleBuy}>
          Buy Now
        </button>

  
      </div>
    </div>
  );
};

export default SepoliaCard;
