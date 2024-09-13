import mongoose from "mongoose";



const transactionSchema = new mongoose.Schema({
  agreement: {
    type: Schema.Types.ObjectId,
    ref: 'Agreement',
    required: true
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  freelancer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  transactionHash: {
    type: String,

    unique: true
  },
  status: {
    type: String,
    enum: ['initiated', 'completed', 'failed'],
    default: 'initiated'
  },

});

export const Transaction = mongoose.model('Transaction', transactionSchema);
