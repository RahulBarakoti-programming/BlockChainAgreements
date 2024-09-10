import mongoose from "mongoose";

const agreementSchema = new mongoose.Schema({
  freelancer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectDetails: {
    description: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    }
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'active', 'completed', 'verified', 'disputed'],
    default: 'pending'
  },
}, { timestamps: true })


export const Agreement = mongoose.model("Agreement", agreementSchema);