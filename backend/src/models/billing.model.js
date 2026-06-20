import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    clerkId : { type:String, required: true },
    plan : { type:String, required: true },
    amount: { type:Number, required: true },
    credits : { type:Number, required: true },
    email : { type:String, required: true },
    isPaymentCompleted : { type:Boolean , default: false }
},{timestamps:true})

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;