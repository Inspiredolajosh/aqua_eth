// SepoliaCard.js

import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
import "./scss/sepoliaCard.scss";
import logo from "../../../assets/images/logo.png";
import { ethers } from "ethers";
import sepoliaABI from "./sepoliaABI.json";
import { BigNumber } from 'bignumber.js';


const SepoliaCard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState(0);
  const [numberOfTokens, setNumberOfTokens] = useState(0);
  const [presalePrice, setPresalePrice] = useState(60000000000000); // Initial presale price
  const [dollarRate, setDollarRate] = useState(0); // Initial dollar rate, fetched dynamically
  const [modalText, setModalText] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);

  Modal.setAppElement('#root'); 

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      border: 'none',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      padding: '40px',
      borderRadius: '10px',
      maxWidth: '400px',
      width: '90%',
      textAlign: 'center',
    },
  };


//   const handleBuyNowClick = () => {
//     console.log("Buy Now button clicked!");
//     setIsModalOpen(true);
//   };

//   const handleAmountChange = (event) => {
//     setAmount(event.target.value);
//     // Assuming the input is the number of tokens, you can set the number of tokens in the state here
//     setNumberOfTokens(event.target.value);
// };


function openModal() {
  setIsOpen(true);
}

function closeModal() {
  setIsOpen(false);
}
  // useEffect(() => {
  //   const checkContractConnection = async () => {
  //     try {
  //       if (typeof window.ethereum !== 'undefined') {
  //         const provider = new ethers.providers.Web3Provider(window.ethereum);
  //         const signer = provider.getSigner();
  //         const contractAddress = '0x2b970ae5E35332bC0a92B919D09A3d6c2Ec9Effe';
  //         const contractABI = sepoliaABI;
  //         const contract = new ethers.Contract(contractAddress, contractABI, signer);

  //         // Check if contract is connected
  //         if (contract.provider) {
  //           console.log("Contract connected:", contract);
  //         } else {
  //           console.log("Contract not connected");
  //         }
  //       }
  //     } catch (error) {
  //       console.error('Failed to connect to contract:', error);
  //     }
  //   };

  //   checkContractConnection();
  // }, []);

  useEffect(() => {
    const fetchDollarRate = async () => {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
            const data = await response.json();
            setDollarRate(data.ethereum.usd); // Update the dollar rate for Ethereum (ETH)
        } catch (error) {
            console.error('Failed to fetch dollar rate:', error);
        }
    };

    fetchDollarRate();
}, []);


const handleBuy = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contractAddress = '0x2b970ae5E35332bC0a92B919D09A3d6c2Ec9Effe';
  const contractABI = sepoliaABI; // Replace sepoliaABI with the actual contract ABI

  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  const price = new BigNumber(numberOfTokens).times(new BigNumber(presalePrice));

  try {
    const transaction = await contract.presale(numberOfTokens, {
      value: price.toString(10), // Ensure value is in base 10 string format
    });
    await transaction.wait();

    // Handle success, display message, or perform any other action here
    setModalText('Purchase Successful.');
    openModal();
  } catch (error) {
    // Handle error
    setModalText('An error occurred. Please try again.');
    openModal();
    console.error(error);
  }
};;







  const priceInDollars = ((numberOfTokens * presalePrice) / 10**18) * dollarRate; // Assuming 18 decimals
  const formattedPriceInDollars = priceInDollars.toFixed(2); // Formatting to 2 decimal places


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

        <div className="input-container">
                    <label className="input-label" htmlFor="tokenAmountInput">
                        Amount:
                    </label>
                    <input
                        className="input-field"
                        type="text"
                        id="tokenAmountInput"
                        value={numberOfTokens}
                        onChange={(e) => setNumberOfTokens(e.target.value)}
                    />
                </div>
                <div className="price-container">
                    <p>Price: {formattedPriceInDollars}$</p>
                    {/* <p>Dollar Rate for Ethereum: {dollarRate}</p> */}
                </div>

                <button className="buy-button" onClick={handleBuy}>
                    Buy
                </button>
            </div>

               {/* Pop-up */}
               <Modal
                 isOpen={modalIsOpen}
                 onRequestClose={closeModal}
                 style={customStyles}
                 contentLabel="Example Modal"
                 appElement={document.getElementById('root')}
            >
                  <h2 style={{ marginBottom: '20px', fontSize: '24px', fontWeight: 'bold' }}>{modalText}</h2>
  <button
    style={{
      padding: '10px 20px',
      backgroundColor: '#D36A24',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '16px',
    }}
    onClick={closeModal}
  >
    Close
  </button>
</Modal>
    </div>
  );
};

export default SepoliaCard;
