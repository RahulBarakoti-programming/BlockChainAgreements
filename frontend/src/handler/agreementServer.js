import createAgreement from "@/web3functions/createAgreement";
import axios from "axios"
import { toast } from "sonner";


export const agreementSaver = async (data) => {


  try {

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/agreement/create`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }


    });


    const { freelancerWalletAddress, blockNumber, txHash } = await createAgreement(data.description, data.amount, response.data.agreementId);




    const update = await axios.put(`${import.meta.env.VITE_API_URL}/agreement/create/signfree`, {
      agreementId: response.data.agreementId,
      freelancerWalletAddress,
    }, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });

    toast("Successfull", {
      description: "Agreement Created Successfully!!",

      style: {
        color: "green",
      },
    });



  } catch (error) {
    const err = error.response?.data?.message || 'An error occurred. Please try again.'
    toast("Error", {
      description: err,

      style: {
        color: "red",
      },
    });
    return error;
  }


}