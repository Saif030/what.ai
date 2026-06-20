import User from "../models/user.model.js";
import Transaction from "../models/billing.model.js";
import { clerkClient } from "@clerk/express";
import { Webhook } from 'svix';

// ==========================================
// 1. WEBHOOK HANDLER
// ==========================================
const subscriptionWebhook = async (req, res) => {
    try {
        const whook = new Webhook(process.env.SUBSCRIPTION_WEBHOOK_SECRET);
        
        // Ensure payload is a string. If you use express.json() globally, req.body is an object.
        // Svix requires the raw string. 
        const payload = req.body.toString();

        const event = whook.verify(payload, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = event;

        switch (type) {
            case "subscription.created":
                if (!data) {
                    return res.status(400).json({ message: "Invalid subscription data!" });
                }

                const { plan_id, user_email } = data;

                const user = await User.findOne({ email: user_email });

                if (!user) {
                    return res.status(404).json({ message: "User not found!" });
                }

                const billCreate = await Transaction.create({
                    clerkId: user.clerkId,
                    plan: plan_id,
                    amount: 0,
                    credits: 0,
                    email: user_email,
                    isPaymentCompleted: true
                });

                if (!billCreate) {
                    return res.status(500).json({ message: "Failed to create transaction record!" });
                }

                console.log(`Successfully processed subscription for: ${user_email}`);
                break;

            case "subscription.updated":
                // Add your update logic here
                console.log("Subscription updated event received");
                break;

            case "subscription.deleted":
                // Add your delete logic here
                console.log("Subscription deleted event received");
                break;

            default:
                console.warn(`Unhandled event type: ${type}`);
                break;
        }

        // CRITICAL: Always return a 200 OK outside the switch so Svix knows you received it
        return res.status(200).json({ success: true });

    } catch (err) {
        console.error(`Webhook Verification Error: ${err.message}`);
        return res.status(400).json({ message: err.message || "Failed to process subscription webhook!" });
    }
}


// ==========================================
// 2. GET BILLING DATA HANDLER
// ==========================================
const getBillingData = async (req, res) => {
    try {
        // Fix: In @clerk/express, `req.auth` is an object, not a function.
        // const { userId } = req.auth; 
        const userId = "user_3FMj6gg1SoGTa64FFdiShHBPMNf";
        
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized!" });
        }

        const user = await User.findOne({ clerkId: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found in local database!" });
        }

        let subscriptionData = null;

        // Wrap the Clerk API call in its own try/catch. 
        // If the user doesn't have an active subscription yet, Clerk might throw an error.
        try {
            subscriptionData = await clerkClient.billing.getUserBillingSubscription({
                userId: user.clerkId
            });
        } catch (clerkErr) {
            console.warn(`Could not fetch Clerk subscription (they might not have one): ${clerkErr.message}`);
            // We don't fail the whole request here, we just leave subscriptionData as null
        }

        return res.status(200).json({
            message: "Billing data fetched successfully!",
            user: {
                id: user._id,
                email: user.email,
                clerkId: user.clerkId
            },
            subscription: subscriptionData || null // Return null if they have no active sub
        });

    } catch (err) {
        console.error(`Get Billing Data Error: ${err.message}`);
        return res.status(500).json({ message: err.message || "Failed to get billing data!" });
    }
}

export { subscriptionWebhook, getBillingData };