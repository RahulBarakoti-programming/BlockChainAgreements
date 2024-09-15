import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pass: {
    type: String,
    required: true,
  },
  walletAddress: {
    type: String,


  },
  agreements: [{
    type: Schema.Types.ObjectId,
    ref: 'Agreement',
  }],
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
