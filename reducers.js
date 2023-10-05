// reducers.js
const initialState = {
    connectedAccount: null, // Initially, no account is connected
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
  
  export default rootReducer;
  