import { ethers } from "ethers";
import { toast } from "sonner";

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

async function createAgreement(projectDetails, amountInMATIC, agreementId) {
  try {
    if (!window.ethereum) {


      toast("Error", {
        description: `Meta Mask wallet not found please Install Meta Mask to continue`,

        style: {
          color: "red",
        },

      });


    }
    amountInMATIC = amountInMATIC / 10000

    const amountInWei = ethers.utils.parseUnits(amountInMATIC.toString(), 18);

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const freelancerWalletAddress = await signer.getAddress();

    const contract = new ethers.Contract(ContractAddress, CONTRACT_ABI, signer);

    const tx = await contract.createAgreement(projectDetails, amountInWei, agreementId, {
      gasLimit: ethers.BigNumber.from("5000000"),
    });


    toast("Successfull", {
      description: `"Transaction submitted:", ${tx.hash}`,

      style: {
        color: "green",
      },
    });
    const txHash = tx.hash;


    const receipt = await tx.wait();
    const blockNumber = receipt.blockNumber;

    toast("Successfull", {
      description: `Transaction confirmed in block:", ${receipt.blockNumber}`,

      style: {
        color: "green",
      },
    });


    return { freelancerWalletAddress, blockNumber, txHash }


  } catch (error) {
    const err = error.response?.data?.message || 'An error occurred. Please try again.'
    toast("Error", {
      description: `"Error", ${err}`,

      style: {
        color: "red",
      },
    });
    console.error("Error creating agreement:", error);
    throw error;
  }
}

export default createAgreement;
