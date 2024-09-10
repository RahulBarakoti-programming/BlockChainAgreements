import mongoose, { Mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  }, email: {
    type: String,
    required: true,
    unique: true
  },
  walletAddress: {
    type: String,
    required: true,
    unique: true
  },
  agreements: [{
    type: Schema.Types.ObjectId,
    ref: 'Agreement'
  }],
}, { timestamps: true })

export const User = mongoose.model('User', userSchema);


