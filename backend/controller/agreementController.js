import { Agreement } from '../models/Agreement';

export const agreementsSend = async (req, res) => {
  try {
    const userId = req.user.userId;

    const agreements = await Agreement.find({
      $or: [
        { freelancer: userId },
        { client: userId }
      ]
    }, {
      freelancer: 1,
      client: 1,
      'projectDetails.description': 1,
      status: 1
    }).populate('freelancer client', 'firstName lastName');

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
    };

    return res.status(200).json(response);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};


