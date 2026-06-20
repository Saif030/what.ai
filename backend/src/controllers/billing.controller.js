import User from "../models/user.model.js";
import { clerkClient } from "@clerk/express";
import { Webhook } from 'svix';
import Transaction from "../models/billing.model.js";

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

//         switch(type){
//             case "subscription.created":
//                 try{
//                     if(!data){
//                         return res.status(400).json({ message: "Invalid subscription data!" });
//                     }

//                     const {plan_id,user_email} = data;

//                     const user = await User.findOne({ email: user_email });

//                     if(!user){
//                         return res.status(404).json({ message: "User not found!" });
//                     }

//                     const billCreate = await Transaction.create({
//                         clerkId: user.clerkId,
//                         plan: plan_id,
//                         amount: 0,
//                         credits: 0,
//                         email: user_email,
//                         isPaymentCompleted: true
//                     });

//                     if(!billCreate){
//                         return res.status(500).json({ message: "Failed to create transaction!" });
//                     }

//                     return res.status(200).json({ message: "Subscription created successfully!" });


//                 }catch(err){
//                     console.error(`Error message: ${err.message}`);
//                     return res.status(500).json({ message: err.message || "Failed to process subscription created!" });
//                 }
//                 break;
//             case "subscription.updated":
//                 // Handle subscription updated
//                 break;
//             case "subscription.deleted":
//                 // Handle subscription deleted
//                 break;
//             default:
//                 // Handle unknown event type
//                 break;
//         }

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
        const subscription = await clerkClient.billing.getUserBillingSubscription({
            userId: user.clerkId
        });

        if (!subscription) {
            return res.status(404).json({
                message: "Billing data not found!"
            });
        }

        return res.status(200).json({
            message: "Billing data fetched successfully!",
            user,
            subscription
        });
    }catch(err){
        console.error(`Error message: ${err.message}`);
        return res.status(500).json({ message: err.message || "Failed to get billing data!" });
    }
}

export { getBillingData }
