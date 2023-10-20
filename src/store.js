import { create } from 'zustand';

const useStore = create((set) => ({
  isModalOpen: false,
  selectedChain: '',
  address: '',
  connected: false,
  activeCards: {
    SepoliaCard: true,
    MumbaiCard: true,
    PolygonCard: true,
    ArbirtrumCard: true,
    BsctestnetCard: true,
  }, // Add an object to keep track of the active state of each card
  adminAddresses: ['0xf68F117C638c833793954b147bC973515a6B6e3F', 
  'adminAddress2'], // Define the admin addresses

  openModal: () => set((state) => ({ ...state, isModalOpen: true })),
  closeModal: () => set((state) => ({ ...state, isModalOpen: false })),
  selectChain: (chain) => set((state) => ({ ...state, selectedChain: chain })),
  saveAddress: (address) => set((state) => ({ ...state, address: address })),
  setConnected: (status) => set((state) => ({ ...state, connected: status })),
  
  toggleCardActivity: (cardName, userAddress) =>
    set((state) => {
      if (state.adminAddresses.includes(userAddress)) {
        return {
          ...state,
          activeCards: {
            ...state.activeCards,
            [cardName]: !state.activeCards[cardName],
          },
        };
      } else {
        console.log('You are not authorized to change the card activity.');
        return state;
      }
    }), // Function to toggle the card activity based on admin addresses
}));

export { useStore };
