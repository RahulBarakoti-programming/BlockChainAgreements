import { User } from '../models/Schema/userSchema.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
  try {

    const { firstName, lastName, email, pass, walletAddress } = req.body;


    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists', success: false });
    }


    const newUser = new User({
      firstName,
      lastName,
      email,
      pass,
      walletAddress,
    });
    newUser.pass = await bcrypt.hash(pass, 10);


    await newUser.save();
    const token = jwt.sign(
      { email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );


    return res.status(201).json({
      message: 'User created successfully',
      token,
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


export const login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(403)
        .json({ message: "User Not found Please try to Signup", success: false });
    }
    const isPassEqual = await bcrypt.compare(pass, user.pass);
    if (!isPassEqual) {
      return res.status(403)
        .json({ message: "Incorrect Password", success: false });
    }
    const jwtToken = jwt.sign(
      { email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    )

    res.status(200)
      .json({
        message: "Login Success",
        success: true,
        jwtToken,
        email,
        name: user.name,
        email: user.email,
        firstName: user.firstName,  // Use 'firstName' instead of 'name'
        lastName: user.lastName,
      })
  } catch (err) {
    res.status(500)
      .json({
        message: "Internal server errror",
        success: false
      })
  }
}