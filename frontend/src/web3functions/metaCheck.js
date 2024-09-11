import { ethers } from 'ethers';

let metaMaskRequestPending = false;

export async function checkMetaMaskAvailability() {
  // Check if MetaMask is installed and available
  if (window.ethereum && window.ethereum.isMetaMask) {
    if (metaMaskRequestPending) {
      return 'connecting';
    }

    metaMaskRequestPending = true;

    try {
      // First, try to retrieve already connected accounts
      let accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        console.log('MetaMask is available and already connected.');
        return 'connected';
      }

      // Request account access (for first-time users)
      await window.ethereum.request({ method: 'eth_requestAccounts' });

      // After permission is granted, wait and check again for accounts
      accounts = await new Promise((resolve) => {
        setTimeout(async () => {
          resolve(await window.ethereum.request({ method: 'eth_accounts' }));
        }, 500); // Wait 500ms to ensure the account connection is completed
      });

      // If accounts are now available, return 'connected'
      if (accounts.length > 0) {
        console.log('MetaMask is now connected.');
        return 'connected';
      } else {
        // In case no accounts are retrieved, return as rejected
        console.error('No accounts retrieved after granting permission.');
        return 'rejected';
      }
    } catch (error) {
      // Handle user rejection or other errors
      console.error('User rejected the request or an error occurred:', error);
      return 'rejected';
    } finally {
      metaMaskRequestPending = false;
    }
  } else {
    // MetaMask is not available in the browser
    console.log('MetaMask is not available.');
    return 'notAvailable';
  }
}
