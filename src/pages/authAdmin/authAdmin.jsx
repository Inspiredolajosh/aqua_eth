import React, { useState, useEffect } from "react";
import "./authAdmin.scss";
import { useMyContext } from "../../../myContext";
import ethereumContractABI from "../../abi/ETHaquaFactoryABI.json"
import sepoliaContractABI from  "../../abi/SepoliaAquaFactoryABI.json"

import { ethers } from 'ethers';

// Ethereum
const ethereumProvider = new ethers.providers.Web3Provider(window.ethereum);
const contractAddress = '0x791724a2B974F338b423CB684Dc962e91f65A7Db';
const ethereumContract = new ethers.Contract(contractAddress, ethereumContractABI, ethereumProvider);

// Sepolia
const SepoliaProvider = new ethers.providers.Web3Provider(window.ethereum);
const sepoliaContractAddress = '0xb9167d0e0f1aA5E838b54a50AbEfCEe2fafbb1Ce';
const sepoliaEthereumContract = new ethers.Contract(sepoliaContractAddress, sepoliaContractABI, SepoliaProvider);



// // Binance Smart Chain
// const bscProvider = new ethers.providers.JsonRpcProvider('YOUR_BSC_PROVIDER_URL');
// const bscContractAddress = 'YOUR_BSC_CONTRACT_ADDRESS';
// const bscContractABI = YOUR_BSC_CONTRACT_ABI;
// const bscContract = new ethers.Contract(bscContractAddress, bscContractABI, bscProvider);

// const createTokenOnBSC = async (name, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo) => {
//   try {
//     const signer = bscProvider.getSigner();
//     const contractWithSigner = bscContract.connect(signer);
//     await contractWithSigner.createToken(name, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount);
//   } catch (error) {
//     console.error('Error creating token on BSC', error);
//   }
// };

// // Polygon
// const polygonProvider = new ethers.providers.JsonRpcProvider('YOUR_POLYGON_PROVIDER_URL');
// const polygonContractAddress = 'YOUR_POLYGON_CONTRACT_ADDRESS';
// const polygonContractABI = YOUR_POLYGON_CONTRACT_ABI;
// const polygonContract = new ethers.Contract(polygonContractAddress, polygonContractABI, polygonProvider);

// const createTokenOnPolygon = async (name, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo) => {
//   try {
//     const signer = polygonProvider.getSigner();
//     const contractWithSigner = polygonContract.connect(signer);
//     await contractWithSigner.createToken(name, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount);
//   } catch (error) {
//     console.error('Error creating token on Polygon', error);
//   }
// };


const AdminPage = () => {
  const { state, switchNetwork, connectWallet } = useMyContext();
  const { isConnected, defaultAccount } = state;
  const [projectData, setProjectData] = useState({

    name: "",
    symbol: "",
    decimal:"",
    chain: "Ethereum",
    totalSupply: 0,
    presaleMin: 0,
    presaleMax: 0,
    presalePrice: 0,
    airdropPrice: 0,
    airdropAmount: 0,
    logo: "",
  });

    // Function to set the default account
    const setDefaultAccount = (account) => {
      // Set the default account in the state
      setProjectData((prevData) => ({
        ...prevData,
        defaultAccount: account,
      }));
    };
  
    // Function to set the connection status
    const setIsConnected = (status) => {
      // Set the connection status in the state
      setProjectData((prevData) => ({
        ...prevData,
        isConnected: status,
      }));
    };
  
    // Function to retrieve the connected account from the browser storage
    const getConnectedAccountFromStorage = () => {
      const storedAccount = localStorage.getItem("connectedAccount");
      const network = localStorage.getItem("selectedNetwork");
    
      console.log("Stored Account:", storedAccount);
      console.log("Selected Network:", network);
    
      if (storedAccount) {
        setDefaultAccount(storedAccount);
        setIsConnected(true);
      }
      return storedAccount;
    };
    
    useEffect(() => {
      // On initial load, check if there's a connected account in the storage
      getConnectedAccountFromStorage();
      logContractConnection();
    }, []);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "chain") {
        const selectedChain = e.target.options[e.target.selectedIndex].text;
        setProjectData((prevData) => ({
          ...prevData,
          [name]: selectedChain,
        }));
      } else {
        setProjectData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      }
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const { name, symbol, decimal, chain, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo } = projectData;
      const walletNetwork = localStorage.getItem("selectedNetwork");
      const chainToConnect = chain.toLowerCase();
    
      console.log("Form Data:", { name, symbol, decimal, chain, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo });
      console.log("Wallet Network:", walletNetwork);
      console.log("Chain to Connect:", chainToConnect);
    
      if (walletNetwork && walletNetwork.toLowerCase() !== chainToConnect.toLowerCase()) {
        console.error(`Please connect to the ${chain} network to create a token.`);
        return;
      }
    
      try {
        if (chainToConnect === 'ethereum') {
          console.log("Creating token on Ethereum");
          await createTokenOnEthereum(name, symbol, decimal, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount);
        } else if (chainToConnect === 'sepolia' || chainToConnect === 'sepolia') {
          console.log("Creating token on BSC");
          await createTokenOnSepolia(name, symbol, decimal, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount);
        }
         else if (chainToConnect === 'binance smart chain' || chainToConnect === 'bsc testnet') {
          console.log("Creating token on BSC");
          await createTokenOnBSC(name, symbol, decimal, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount);
        } else if (chainToConnect === 'polygon' || chainToConnect === 'polygon testnet') {
          console.log("Creating token on Polygon");
          await createTokenOnPolygon(name, symbol, decimal, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount);
        } else {
          console.error('Chain not supported');
          return;
        }
      } catch (error) {
        console.error('Error creating the project:', error);
        return;
      }
    };
    
    
  
  

  useEffect(() => {
    // On initial load, check if there's a connected account in the storage
    const storedAccount = getConnectedAccountFromStorage();
    if (storedAccount) {
      setDefaultAccount(storedAccount);
      setIsConnected(true);
    }
    logContractConnection();
  }, []);


  const logContractConnection = async () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      console.log("Contract connected");
      console.log("Connected contract address:", contractAddress);
      try {
        const network = await ethereumProvider.getNetwork();
        console.log("Connected network chainId:", network.chainId);
        const signer = ethereumProvider.getSigner();
        const connectedAddress = await signer.getAddress();
        console.log("Connected address:", connectedAddress);
      } catch (error) {
        console.error("Failed to get network information:", error);
      }
    } else {
      console.log("Contract not connected");
    }
  };

  const createTokenOnEthereum = async (name, symbol, decimal, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo) => {
    try {
      const signer = ethereumProvider.getSigner();
      const contractWithSigner = ethereumContract.connect(signer);
      await contractWithSigner.createToken(name, symbol, decimal, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount);
    } catch (error) {
      console.error('Error creating token on Ethereum', error);
    }
  };

  const createTokenOnSepolia = async (name, symbol, decimal, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo) => {
    try {
      const signer = ethereumProvider.getSigner();
      const contractWithSigner = sepoliaEthereumContract.connect(signer);
      await contractWithSigner.createToken(name, symbol, decimal, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount);
      console.log("New token created on Ethereum Sepolia Testnet", { name, symbol, decimal, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo });
    } catch (error) {
      console.error('Error creating token on Ethereum Sepolia Testnet', error);
    }
  };

  const createTokenOnBSC = async (name, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo) => {
    // Add logic for creating token on BSC here
    console.log("Creating token on BSC", { name, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo });
  };

  const createTokenOnPolygon = async (name, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo) => {
    // Add logic for creating token on Polygon here
    console.log("Creating token on Polygon", { name, totalSupply, presaleMin, presaleMax, presalePrice, airdropPrice, airdropAmount, logo });
  };

  


  return (
    <div className="admin-page">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <br />
          <br />
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={projectData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Symbol:</label>
          <input
            type="text"
            name="symbol"
            value={projectData.symbol}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Decimal:</label>
          <input
            type="text"
            name="decimal"
            value={projectData.decimal}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Blockchain:</label>
          <select name="chain" value={projectData.chain} onChange={handleChange}>
            <option value="Ethereum">Ethereum</option>
            <option value="Sepolia">Sepolia</option>
            <option value="Binance Smart Chain">Binance Smart Chain</option>
            <option value="Polygon">Polygon</option>
          </select>
        </div>
        <div className="form-group">
          <label>Total Supply:</label>
          <input
            type="number"
            name="totalSupply"
            value={projectData.totalSupply}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Minimum for Presale:</label>
          <input
            type="number"
            name="presaleMin"
            value={projectData.presaleMin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Maximum for Presale:</label>
          <input
            type="number"
            name="presaleMax"
            value={projectData.presaleMax}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Presale Price:</label>
          <input
            type="number"
            name="presalePrice"
            value={projectData.presalePrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Airdrop Price:</label>
          <input
            type="number"
            name="airdropPrice"
            value={projectData.airdropPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Airdrop Amount:</label>
          <input
            type="number"
            name="airdropAmount"
            value={projectData.airdropAmount}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Logo URL:</label>
          <input
            type="text"
            name="logo"
            value={projectData.logo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default AdminPage;
