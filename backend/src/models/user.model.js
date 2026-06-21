import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    credits: {
      type: Number,
      default: 0,
    },
    lastCreditedAt: {
      type: Date,
      default: null,
    }
}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema);

export default User;