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
  const [amount, setAmount] = useState(20);
  const [numberOfTokens, setNumberOfTokens] = useState(0);
  const [presalePrice, setPresalePrice] = useState(60000000000000); // Initial presale price
  const [dollarRate, setDollarRate] = useState(0); // Initial dollar rate, fetched dynamically
  const [modalText, setModalText] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [presaleTransactions, setPresaleTransactions] = useState(0);


const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = '0x11f6f4D4A36DE9F4A28146496298A0Ca4F17119b';
const contractABI = sepoliaABI;


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
  useEffect(() => {
    const checkContractConnection = async () => {
      try {
        if (typeof window.ethereum !== 'undefined') {
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

const calculateTokensFromEther = (etherAmount) => {
  const tokens = ethers.utils.parseEther(etherAmount.toString()).div(presalePriceInWei);
  return tokens.toString();
};

const calculateAndDisplayNumberOfTokens = (amount, presalePrice) => {
  if (dollarRate) {
    const tokens = amount / 0.1; // Calculate the number of tokens directly based on the dollar amount and presale price
    return tokens;
  }
  return 0;
};



useEffect(() => {
  const fetchPresaleTransactions = async () => {
      try {
          const contract = new ethers.Contract(contractAddress, contractABI, signer);
          const transactions = await contract.presaleTransactions();
          setPresaleTransactions(transactions);
      } catch (error) {
          console.error('Failed to fetch presale transactions:', error);
      }
  };

  fetchPresaleTransactions();
}, []);;


const handleBuy = async () => {
  setLoading(true);
  try {
      const dollarAmount = amount;
      const etherAmount = dollarAmount / dollarRate; // Convert dollar amount to ethers
      const backupAmount = ethers.utils.parseEther("0.00031"); // Define the fee amount as 0.00031 ether
      const totalEtherAmount = ethers.utils.parseEther(etherAmount.toString()).add(backupAmount); // Add the fee to the total amount
      const tokens = calculateAndDisplayNumberOfTokens(dollarAmount, presalePrice);

      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      console.log("Sending Ether Amount:", totalEtherAmount.toString());
      console.log("Sending Tokens Amount:", tokens.toString());

      const transaction = await contract.presale(totalEtherAmount, tokens, {
          value: totalEtherAmount,
      });
      await transaction.wait();

      const formattedTokens = ethers.utils.formatUnits(tokens, 0);
      setModalText(`Purchase Successful. You will receive ${formattedTokens} tokens for $${dollarAmount}.`);
      openModal();
  } catch (error) {
      setModalText('An error occurred. Please try again.');
      openModal();
      console.error(error);
  } finally {
      setLoading(false);
  }
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

        
        </div>

        {/* MinValues */}
        <div className="values">
          <div>
            <p>Max</p>
            <p>3Eth</p>
          </div>

          <div>
            <p>Sales</p>
            {/* <p>{presaleTransactions}</p> */}
          </div>

          <div>
            <p>Min</p>
            <p>0.02Eth</p>
          </div>
        </div>
<br />
        <div className="input-container">
                    <label className="input-label" htmlFor="tokenAmountInput">
                        Amount ($)
                    </label>
                    <input
  className="input-field"
  type="number"
  id="tokenAmountInput"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  min={20}
  max={250}
/>

                </div>
                <div className="price-container">
                {/* <p>Dollar Rate: {dollarRate}</p> */}
                {loading ? <p>Loading...</p> : <p>Tokens to be received: {calculateAndDisplayNumberOfTokens(amount, presalePrice)}</p>}
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
