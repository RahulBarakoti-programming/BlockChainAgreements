import { User } from '../models/Schema/userSchema.js';


export const signup = async (req, res) => {
  try {

    const { firstName, lastName, email, walletAddress } = req.body;


    const existingUser = await User.findOne({
      $or: [{ email }, { walletAddress }]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }


    const newUser = new User({
      firstName,
      lastName,
      email,
      walletAddress,
    });


    await newUser.save();


    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        walletAddress: newUser.walletAddress,
      },
    });

  } catch (error) {

    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
