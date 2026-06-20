import User from "../models/user.model.js";
import { clerkClient } from "@clerk/express";
import { Webhook } from 'svix';

// const subscriptionWebhook = async (req,res) => {
//     try{
//         const whook = new Webhook(process.env.SUBSCRIPTION_WEBHOOK_SECRET);
//         const payload = req.body.toString();

//         const event = whook.verify(payload, {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         });

//         const {data, type} = event;

//     }catch(err){
//         console.error(`Error message: ${err.message}`);
//         return res.status(500).json({ message: err.message || "Failed to process subscription webhook!" });
//     }
// }

const getBillingData = async (req , res) => {
    try{
        const {userId} = req.auth();
        if(!userId){
            return res.status(401).json({ message: "Unauthorized!" });
        }

        const user = await User.findOne({ clerkId: userId });

        if(!user){
            return res.status(404).json({ message: "User not found!" });
        }

        const {status} = await clerkClient.billing.getUserBillingSubscription({ userId: user.clerkId });

        if(!status){
            return res.status(404).json({ message: "Billing data not found!" });
        }

        return res.status(200).json({ message: "Billing data fetched successfully!", user , status });
    }catch(err){
        console.error(`Error message: ${err.message}`);
        return res.status(500).json({ message: err.message || "Failed to get billing data!" });
    }
}

export { getBillingData }
