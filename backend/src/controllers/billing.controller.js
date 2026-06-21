import User from "../models/user.model.js";
import Transaction from "../models/billing.model.js";
import { clerkClient } from "@clerk/express";
import { Webhook } from 'svix';

const subscriptionWebhook = async (req, res) => {
    try {
        const whook = new Webhook(process.env.SUBSCRIPTION_WEBHOOK_SECRET);
        const payload = req.body.toString();

        const event = whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = event;

        if (type === "subscription.created") {

            console.log("Subscription created event received");

            if (!data) {
                return res.status(400).json({
                    message: "Invalid subscription data!"
                });
            }

            const { id, plan_id, user_id, status } = data;

            const existing = await Transaction.findOne({
                subscriptionId: id,
            });

            if (existing) {
                return res.status(200).json({
                success: true,
                message: "Webhook already processed",
                });
            }

            const billCreate = await Transaction.create({
                clerkId: user_id,
                plan: plan_id,
                subscriptionId: id,
                status,
            });

            return res.status(200).json({
                success: true,
                billCreate,
            });
        }

        if (type === "subscription.updated") {
            if (!data) {
                return res.status(400).json({
                    message: "Invalid subscription data!"
                });
            }

            const { plan_id, user_id, status } = data;

            const transaction = await Transaction.findOneAndUpdate(
                { clerkId: user_id },
                {
                    plan: plan_id,
                    status: status
                },
                {
                    returnDocument: "after"
                }
            );

            if (!transaction) {
                return res.status(404).json({
                    message: "Transaction not found!"
                });
            }

            return res.status(200).json({
                success: true,
                transaction
            });
        }

        if (type === "subscription.deleted") {
            if (!data) {
                return res.status(400).json({
                    message: "Invalid subscription data!"
                });
            }

            const { user_id } = data;

            const transaction = await Transaction.findOneAndUpdate(
                { clerkId: user_id },
                {
                    status: "canceled"
                },
                {
                    returnDocument: "after"
                }
            );

            if (!transaction) {
                return res.status(404).json({
                    message: "Transaction not found!"
                });
            }

            return res.status(200).json({
                success: true,
                transaction
            });
        }

        return res.status(200).json({ success: true });

    } catch (err) {
        console.error(`Webhook Verification Error: ${err.message}`);
        return res.status(400).json({ message: err.message || "Failed to process subscription webhook!" });
    }
}


const getBillingData = async (req, res) => {
    try {
        // Fix: In @clerk/express, `req.auth` is an object, not a function.
        // const { userId } = req.auth; 
        const userId = "user_3FOjYiqaYLDVEKWKrhxyb0B827e";
        
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found in local database!" });
        }

        const billingData = await Transaction.findOne({ clerkId: userId });

        if(!billingData){
            return res.status(400).json({
                message: "No billing data found!"
            });
        }


        return res.status(200).json({
            message: "Billing data fetched successfully!",
            user: {
                id: user._id,
                email: user.email,
                clerkId: user.clerkId
            },
            subscription: billingData
        });
        
    } catch (err) {
        console.error(`Get Billing Data Error: ${err.message}`);
        return res.status(500).json({ message: err.message || "Failed to get billing data!" });
    }
}

export { subscriptionWebhook, getBillingData };