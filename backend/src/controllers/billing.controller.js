import User from "../models/user.model.js";
import Transaction from "../models/billing.model.js";
import { Webhook } from "svix";

const subscriptionWebhook = async (req, res) => {
  try {
    const whook = new Webhook(
      process.env.SUBSCRIPTION_WEBHOOK_SECRET
    );

    const payload = req.body.toString();

    const event = whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = event;

    // ===========================
    // SUBSCRIPTION CREATED
    // ===========================

    if (type === "subscription.created") {
      const subscriptionId = data.id;

      const existing = await Transaction.findOne({
        subscriptionId,
      });

      if (existing) {
        return res.status(200).json({
          success: true,
          message: "Webhook already processed",
        });
      }

      const transaction = await Transaction.create({
        clerkId: data.payer.user_id,
        plan: data.items[0].plan_id,
        status: data.status,
        subscriptionId: data.id,
        payer: data.payer,
        slug: data.items[0].plan.slug,
        amount: data.items[0].plan.amount,
      });

      return res.status(200).json({
        success: true,
        transaction,
      });
    }

    // ===========================
    // SUBSCRIPTION UPDATED
    // ===========================

    if (type === "subscription.updated") {
      const transaction =
        await Transaction.findOneAndUpdate(
          {
            subscriptionId: data.id,
          },
          {
            clerkId: data.payer.user_id,
            plan: data.items[0].plan_id,
            status: data.status,
            payer: data.payer,
            slug: data.items[0].plan.slug,
            amount: data.items[0].plan.amount,
          },
          {
            returnDocument: "after",
          }
        );

      if (!transaction) {
        return res.status(404).json({
          message: "Transaction not found!",
        });
      }

      return res.status(200).json({
        success: true,
        transaction,
      });
    }

    // ===========================
    // SUBSCRIPTION DELETED
    // ===========================

    if (type === "subscription.deleted") {
      const transaction =
        await Transaction.findOneAndUpdate(
          {
            subscriptionId: data.id,
          },
          {
            status: "canceled",
          },
          {
            returnDocument: "after",
          }
        );

      if (!transaction) {
        return res.status(404).json({
          message: "Transaction not found!",
        });
      }

      return res.status(200).json({
        success: true,
        transaction,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Unhandled event",
    });
  } catch (err) {
    console.error(
      `Webhook Verification Error: ${err.message}`
    );

    return res.status(400).json({
      message:
        err.message ||
        "Failed to process subscription webhook!",
    });
  }
};

const getBillingData = async (req, res) => {
  try {
    const { userId } = req.auth;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized!",
      });
    }

    const billingData = await Transaction.findOne({
      clerkId: userId,
    });

    if (!billingData) {
      return res.status(404).json({
        message: "No billing data found!",
      });
    }

    return res.status(200).json({
      success: true,
      billingData,
    });
  } catch (err) {
    return res.status(500).json({
      message:
        err.message ||
        "Failed to fetch billing data",
    });
  }
};

export { subscriptionWebhook, getBillingData };