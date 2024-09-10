import mongoose from "mongoose";

const transferSchema = new mongoose.Schema({

}, { timestamps: true })


export const Transfer = mongoose.model("Transfer", transferSchema);


