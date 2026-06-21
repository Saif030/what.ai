import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
    },

    plan: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    subscriptionId: {
      type: String,
      required: true,
      unique: true,
    },

    payer: {
      type: Object,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model(
  "Transaction",
  transactionSchema
);

export default Transaction;