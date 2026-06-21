import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    clerkId : { type:String},
    plan : { type:String},
    status : { type:String},
    subscriptionId : { type:String},
},{timestamps:true})

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;