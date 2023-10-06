// actions.js

// Action types
export const CONNECT_WALLET = "CONNECT_WALLET";
export const DISCONNECT_WALLET = "DISCONNECT_WALLET";
export const SWITCH_NETWORK = "SWITCH_NETWORK";

// Action creators
export const connectWallet = (address) => ({
  type: CONNECT_WALLET,
  payload: address,
});

export const disconnectWallet = () => ({
  type: DISCONNECT_WALLET,
});

export const switchNetwork = (network) => ({
  type: SWITCH_NETWORK,
  payload: network,
});

// Reducers
const initialState = {
  isConnected: false,
  defaultAccount: null,
  selectedNetwork: "Ethereum",
};

export const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONNECT_WALLET:
      return {
        ...state,
        isConnected: true,
        defaultAccount: action.payload,
      };
    case DISCONNECT_WALLET:
      return {
        ...state,
        isConnected: false,
        defaultAccount: null,
      };
    case SWITCH_NETWORK:
      return {
        ...state,
        selectedNetwork: action.payload,
      };
    default:
      return state;
  }
};
