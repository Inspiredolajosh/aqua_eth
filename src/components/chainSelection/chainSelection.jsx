// ChainSelection.js
import React from "react";
import "./chainSelection.scss"; // Import the CSS file for styling

const ChainSelection = ({ chains, selectedChain, onSelectChain }) => {
  return (
    <div className="chain-selection">
      <select
        value={selectedChain}
        onChange={(e) => onSelectChain(e.target.value)}
      >
        {chains.map((chain) => (
          <option key={chain} value={chain}>
            {chain}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ChainSelection;
