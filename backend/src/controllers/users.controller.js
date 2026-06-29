import { Webhook } from 'svix';
import User from '../models/user.model.js';
import { Chat } from '../models/chat.model.js';
import mongoose from 'mongoose';

const clerkWebhook = async (req, res) => {
    try {
        const whook = new Webhook(process.env.WEBHOOK_SECRET);
        const payload = req.body.toString();

        const event = whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = event;


        if(type === "user.created"){
            const { id , email_addresses , image_url , first_name , last_name } = data;

            if (!email_addresses || email_addresses.length === 0) {
                return res.status(400).json({message: "No email address provided!"});
            }

            const newUser = await User.create({
                clerkId : id,
                email: email_addresses[0].email_address,
                firstName: first_name,
                lastName: last_name,
                photo: image_url
            })

            if(newUser){
                return res.status(200).json({
                    success : true,
                    message : "User created successfully in database!"
                })
            }

        }

        if(type === "session.created"){
            const isUserexist = await User.findOne({clerkId: data.id});

            if(isUserexist){
                return res.status(200).json({
                    success : true,
                    message : "User already exists"
                })
            }

            const { id , email_addresses , image_url , first_name , last_name } = data;

            if (!email_addresses || email_addresses.length === 0) {
                return res.status(400).json({message: "No email address provided!"});
            }

            const newUser = await User.create({
                clerkId: id,
                email: email_addresses[0].email_address,
                firstName: first_name,
                lastName: last_name,
                photo: image_url
            })

            if(newUser){
                return res.status(200).json({
                    success : true,
                    message : "User created successfully in database!"
                })
            }

        }

        if(type === "user.updated"){
            const {id , email_addresses , image_url , first_name , last_name} = data;

            if (!email_addresses || email_addresses.length === 0) {
                return res.status(400).json({message: "No email address provided!"});
            }

            const updatedUser = await User.updateOne(
                {clerkId: id},
                {
                    email: email_addresses[0].email_address,
                    firstName: first_name,
                    lastName: last_name,
                    photo: image_url
                }
            )

            if(updatedUser){
                return res.status(200).json({
                    success : true,
                    message : "User updated successfully in database!"
                })
            }
        }

        if(type === "user.deleted"){
            const  { id } = data;
            const userDelete = await User.findOneAndDelete({
                clerkId : id
            })
            if(!userDelete){
                return res.status(500).json({
                    success : false,
                    message : "Failed to delete user in database!"
                })
            }
        }

        return res.status(200).json({
            success: true,
            message: "Webhook work completed successfully!"
        });

        
    } catch (err) {
        return res.status(400).json({ message: err.message || "Webhook verification failed!" });
    }
};

const getUser = async (req, res) => {
    try {
        const { userId } = req.auth();
        const user = await User.findOne({clerkId : userId});
        if(!user){
            return res.status(404).json({
                success : false,
                message : "User not found!"
            })
        }
        return res.status(200).json({
            success : true,
            message : "User found!",
            user
        })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Failed to get user!" });
    }
}

const getChats = async (req, res) => {
    try {
        const { userId } = req.auth();
        const chats = await Chat.find({userId});
        if(!chats){
            return res.status(404).json({
                success : false,
                message : "Chats not found!"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Chats found!",
            chats
        })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Failed to get chats!" });
    }
}

const getChat = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { chatId } = req.params;
        if(!userId) {
            return res.status(401).json({
                success : false,
                message : "Unauthorized!"
            })
        }
        if(!chatId){
            return res.status(400).json({
                success : false,
                message : "Chat ID is required!"
            })
        }
        const chat = await Chat.find({
            $and: [
                {userId : userId},
                {_id: new mongoose.Types.ObjectId(chatId)}
            ]
        });

        if(!chat){
            return res.status(404).json({
                success : false,
                message : "Chat not found!"
            })
        }
        
        return res.status(200).json({
            success : true,
            message : "Chat found!",
            chat
        })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Failed to get chat!" });
    }
}

const chatDelete = async (req,res) => {
    const {userId} = req.auth();
    const {chatId} = req.params;
    if(!userId){
        return res.status(401).json({
            success : false,
            message : "Unauthorized!"
        })
    }
    if(!chatId){
        return res.status(400).json({
            success : false,
            message : "Chat ID is required!"
        })
    }
    try {
        const chat = await Chat.findByIdAndDelete(chatId);
        if(!chat){
            return res.status(404).json({
                success : false,
                message : "Chat not found!"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Chat deleted!",
            chat
        })
    } catch (err) {
        return res.status(500).json({ message: err.message || "Failed to delete chat!" });
    }
}

export { clerkWebhook , getUser , getChats , getChat , chatDelete };