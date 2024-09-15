import mongoose from "mongoose";
const { Schema } = mongoose;

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
    enum: ['initial', 'pending', 'active', 'completed', 'verified', 'disputed', 'aReject', 'cReject'],
    default: 'initial'
    //pending = freelancer send but not accepted by client
    //active = accepted by client
    //completed = completed status by freelancer
    // verified = verified by client
    // disputed = money sent
    //aReject = not accepted by client
    //cReject = completion is not accepted by client
  },
  freelancerWalletAddress: {
    type: String,

  },
  clientWalletAddress: {
    type: String,
  },
}, { timestamps: true })


export const Agreement = mongoose.model("Agreement", agreementSchema);