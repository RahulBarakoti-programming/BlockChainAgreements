import { Agreement } from '../models/Schema/agreementSchema.js';
import { User } from '../models/Schema/userSchema.js';


export const agreementsSend = async (req, res) => {
  try {
    const userId = req.user.id;


    const agreements = await Agreement.find({
      $or: [
        { freelancer: userId },
        { client: userId }
      ]
    }, {
      freelancer: 1,
      client: 1,
      'projectDetails.description': 1,
      status: 1,
      createdAt: 1
    })
      .populate('freelancer client', 'firstName lastName')
      .sort({ createdAt: -1 });


    const updatedAgreements = agreements.map(agreement => {
      let requestedBy = 'freelancer';
      const userIsClient = agreement.client._id.toString() === userId;
      if (userIsClient) {
        requestedBy = 'client';
      }

      const descriptionWords = agreement.projectDetails.description.split(' ').slice(0, 30).join(' ');

      return {
        _id: agreement._id,
        requestedBy,
        name: userIsClient ? `${agreement.freelancer.firstName} ${agreement.freelancer.lastName}` : `${agreement.client.firstName} ${agreement.client.lastName}`,
        shortDescription: `${descriptionWords}...`,
        status: agreement.status
      };
    });

    return res.status(200).json(updatedAgreements);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const agreementSend = async (req, res) => {
  try {
    const userId = req.user.userId;
    const agreementId = req.params.id;


    const agreement = await Agreement.findById(agreementId)
      .populate('freelancer client', 'email');

    if (!agreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }


    let requestedBy = 'freelancer';
    const userIsClient = agreement.client._id.toString() === userId;
    if (userIsClient) {
      requestedBy = 'client';
    }


    const response = {
      requestedBy,
      email: userIsClient ? agreement.freelancer.email : agreement.client.email,
      projectDetails: {
        description: agreement.projectDetails.description,
        deadline: agreement.projectDetails.deadline
      },
      amount: agreement.amount,
      id: agreement.id
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const createAgreement = async (req, res) => {

  try {
    const freelancerId = req.user.id;
    const { clientEmail, description, deadline, amount } = req.body;

    if (!freelancerId || !clientEmail || !description || !deadline || !amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }



    const client = await User.findOne({ email: clientEmail });
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const newAgreement = new Agreement({
      freelancer: freelancerId,
      client: client._id,
      projectDetails: {
        description,
        deadline,
      },
      amount,
      freelancerWalletAddress: '',
      clientWalletAddress: '',
      status: 'initial',
    });


    await newAgreement.save();
    await User.findByIdAndUpdate(freelancerId, { $push: { agreements: newAgreement._id } });


    return res.status(201).json({
      success: true,
      message: 'Agreement created successfully! Please finalize it by providing the freelancer\'s wallet address.',
      agreementId: newAgreement._id
    });







  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const addFreelancer = async (req, res) => {

  try {
    const { agreementId, freelancerWalletAddress } = req.body;

    const updatedAgreement = await Agreement.findByIdAndUpdate(
      agreementId,
      { freelancerWalletAddress },
      { new: true }
    );

    if (!updatedAgreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }
    const clientId = updatedAgreement.client;
    await User.findByIdAndUpdate(clientId, {
      $push: { agreements: updatedAgreement._id },
    });


    return res.status(200).json({
      success: true,
      message: 'Agreement signed successfully!',

    });



  } catch (error) {
    console.error('Error updating agreement:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
}


export const addClient = async (req, res) => {

  try {
    const { agreementId, clientWalletAddress } = req.body;

    const updatedAgreement = await Agreement.findByIdAndUpdate(
      agreementId,
      { clientWalletAddress },
      { new: true }
    );

    if (!updatedAgreement) {
      return res.status(404).json({ message: 'Agreement not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Agreement signed successfully!',

    });
  } catch (error) {
    console.error('Error updating agreement:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
}






