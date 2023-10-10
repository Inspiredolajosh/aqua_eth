import React, { useState } from "react";
import "./authAdmin.scss";

const AdminPage = () => {
  const [projectData, setProjectData] = useState({
    name: "",
    chain: "Ethereum",
    maxContribution: 0,
    maxRaise: 0,
    tokenAllocation: 0,
    progress: 0,
    contributions: 0,
    minContribution: 0,
    logo: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit the projectData to your backend for contract deployment and storage
    console.log("Project Data Submitted:", projectData);
    // Clear the form
    setProjectData({
      name: "",
      chain: "Ethereum",
      maxContribution: 0,
      maxRaise: 0,
      tokenAllocation: 0,
      progress: 0,
      contributions: 0,
      minContribution: 0,
      logo: "",
    });
  };

  return (
    <div className="admin-page">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
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
          <label>Blockchain:</label>
          <select
            name="chain"
            value={projectData.chain}
            onChange={handleChange}
          >
            <option value="Ethereum">Ethereum</option>
            <option value="Binance Smart Chain">Binance Smart Chain</option>
            <option value="Polygon">Polygon</option>
          </select>
        </div>
        <div className="form-group">
          <label>Max Contribution (ETH):</label>
          <input
            type="number"
            name="maxContribution"
            value={projectData.maxContribution}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Token Allocation:</label>
          <input
            type="number"
            name="tokenAllocation"
            value={projectData.tokenAllocation}
            onChange={handleChange}
            required
          />
        </div>
     
        <div className="form-group">
          <label>Min Contribution (ETH):</label>
          <input
            type="number"
            name="minContribution"
            value={projectData.minContribution}
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
