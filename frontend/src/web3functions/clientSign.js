import { ethers } from 'ethers';
import axios from 'axios';
import { toast } from 'sonner';

// Contract ABI
const CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "agreementId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "client",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "AgreementSigned",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_projectDetails",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "_agreementId",
        "type": "string"
      }
    ],
    "name": "createAgreement",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "agreementId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      }
    ],
    "name": "PaymentReleased",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_agreementId",
        "type": "string"
      }
    ],
    "name": "releasePayment",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_agreementId",
        "type": "string"
      }
    ],
    "name": "signAgreement",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_agreementId",
        "type": "string"
      }
    ],
    "name": "verifyCompletion",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "agreements",
    "outputs": [
      {
        "internalType": "address",
        "name": "freelancer",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "client",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "projectDetails",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "isSigned",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isCompleted",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const ContractAddress = import.meta.env.VITE_CONTRACT_ADRESS;

export async function clientSign(agreementId, amount) {
  try {

    if (!window.ethereum) {
      return toast.error('MetaMask wallet not found. Please install MetaMask to continue.', {
        style: { color: 'red' },
      });
    }


    const amountInMATIC = amount / 10000;
    const amountInWei = ethers.utils.parseUnits(amountInMATIC.toString(), 'ether');

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    const clientWalletAddress = await signer.getAddress();

    const contract = new ethers.Contract(ContractAddress, CONTRACT_ABI, signer);


    const tx = await contract.signAgreement(agreementId, { value: amountInWei, gasLimit: ethers.BigNumber.from('5000000') });

    toast.success(`Transaction submitted: ${tx.hash}`, { style: { color: 'green' } });

    const receipt = await tx.wait();

    toast.success(`Transaction confirmed in block: ${receipt.blockNumber}`, { style: { color: 'green' } });

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/agreement/create/signclient`,
      {
        agreementId,
        clientWalletAddress,

      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    toast.success('Agreement signed and updated on server successfully!', { style: { color: 'green' } });
    return response.data;
  } catch (error) {

    if (error.code === 4001) {
      toast.error('Transaction rejected by user.', { style: { color: 'red' } });
    } else if (error.message.includes('MetaMask')) {
      toast.error('MetaMask is not connected or available.', { style: { color: 'red' } });
    } else if (error.message.includes('Incorrect payment amount')) {
      toast.error('Incorrect payment amount for signing the agreement.', { style: { color: 'red' } });
    } else {
      const errMsg = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      toast.error(errMsg, { style: { color: 'red' } });
    }
    console.error('Error during client sign:', error);
    throw error;
  }
}
export async function freelancerSign(projectDetails, amount, agreementId) {
  try {

    if (!window.ethereum) {
      return toast.error('MetaMask wallet not found. Please install MetaMask to continue.', {
        style: { color: 'red' },
      });
    }


    const amountInMATIC = amount / 10000;
    const amountInWei = ethers.utils.parseUnits(amountInMATIC.toString(), 'ether');

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    const freelancerWalletAddress = await signer.getAddress();

    const contract = new ethers.Contract(ContractAddress, CONTRACT_ABI, signer);


    const tx = await contract.createAgreement(projectDetails, amountInWei, agreementId, {
      gasLimit: ethers.BigNumber.from("5000000"),
    });

    toast.success(`Transaction submitted: ${tx.hash}`, { style: { color: 'green' } });

    const receipt = await tx.wait();

    toast.success(`Transaction confirmed in block: ${receipt.blockNumber}`, { style: { color: 'green' } });

    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/agreement/create/signfree`,
      {
        agreementId,
        freelancerWalletAddress,

      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    toast.success('Agreement signed and sent to client successfully!', { style: { color: 'green' } });
    return response.data;
  } catch (error) {

    if (error.code === 4001) {
      toast.error('Transaction rejected by user.', { style: { color: 'red' } });
    } else if (error.message.includes('MetaMask')) {
      toast.error('MetaMask is not connected or available.', { style: { color: 'red' } });
    } else if (error.message.includes('Incorrect payment amount')) {
      toast.error('Incorrect payment amount for signing the agreement.', { style: { color: 'red' } });
    } else {
      const errMsg = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      toast.error(errMsg, { style: { color: 'red' } });
    }
    console.error('Error during client sign:', error);
    throw error;
  }
}

export async function verifyCompletion(agreementId) {
  try {

    if (!window.ethereum) {
      return toast.error('MetaMask wallet not found. Please install MetaMask to continue.', {
        style: { color: 'red' },
      });
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();

    const clientWalletAddress = await signer.getAddress();

    const contract = new ethers.Contract(ContractAddress, CONTRACT_ABI, signer);

    const tx = await contract.verifyCompletion(agreementId, {
      gasLimit: ethers.BigNumber.from('5000000'),
    });

    toast.success(`Transaction submitted: ${tx.hash}`, { style: { color: 'green' } });

    const receipt = await tx.wait();

    toast.success(`Transaction confirmed in block: ${receipt.blockNumber}`, { style: { color: 'green' } });

    updateByClient(agreementId, 'verified')
    return { clientWalletAddress, txHash: tx.hash, blockNumber: receipt.blockNumber };
  } catch (error) {

    if (error.code === 4001) {
      toast.error('Transaction rejected by user.', { style: { color: 'red' } });
    } else if (error.message.includes('MetaMask')) {
      toast.error('MetaMask is not connected or available.', { style: { color: 'red' } });
    } else if (error.message.includes('Only client can verify completion')) {
      toast.error('Only the client can verify completion.', { style: { color: 'red' } });
    } else if (error.message.includes('Agreement must be signed before completion')) {
      toast.error('Agreement must be signed before verifying completion.', { style: { color: 'red' } });
    } else {
      const errMsg = error.response?.data?.message || 'An unexpected error occurred. Please try again.';
      toast.error(errMsg, { style: { color: 'red' } });
    }
    console.error('Error verifying agreement completion:', error);
    throw error;
  }
}


export async function updateByClient(agreementId, status) {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/agreement/create/updatebyclient`,
      {
        agreementId,
        status
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );

    toast.success(`Agreement status updated successfully`, { style: { color: 'green' } });
  } catch (error) {
    toast.error('something went wrong please try again later', { style: { color: 'red' } });
  }
}
export async function updateByFreelancer(agreementId, status) {
  try {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/agreement/create/updatebyfreelancer`,
      {
        agreementId,
        status
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      }
    );

    toast.success(`Agreement status updated successfully`, { style: { color: 'green' } });
  } catch (error) {
    toast.error('something went wrong please try again later', { style: { color: 'red' } });
  }
}




