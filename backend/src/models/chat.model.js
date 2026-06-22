import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    query: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    }
},{timestamps: true});

export const Chat = mongoose.model("Chat", chatSchema);