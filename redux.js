// redux.js
import { createStore } from 'redux';

const initialState = {
  connectedAccount: null,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CONNECT_ACCOUNT':
      return { ...state, connectedAccount: action.payload };
    case 'DISCONNECT_ACCOUNT':
      return { ...state, connectedAccount: null };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export const connectAccount = (account) => ({
  type: 'CONNECT_ACCOUNT',
  payload: account,
});

export const disconnectAccount = () => ({
  type: 'DISCONNECT_ACCOUNT',
});

export default store;
