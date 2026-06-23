import User from "../models/user.model.js";
import Transaction from "../models/billing.model.js"; // your existing synced subscription record

// Map plan slugs -> daily credits.
// Add any other paid plan slugs here as you create more plans.
const PLAN_CREDITS = {
  free_user: 10,
  premium: 1000,
};

const DEFAULT_CREDITS = PLAN_CREDITS.free_user;

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const grantDailyCredits = async (req, res, next) => {
  try {
    
    const {userId} = req.auth(); // adjust if you read the user id differently

    if (!userId) {
      return next();
    }

    // Find or create this user's credit record
    let user = await User.findOne({ clerkId: userId });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const now = new Date();
    const alreadyCreditedToday =
      user.lastCreditedAt && isSameDay(new Date(user.lastCreditedAt), now);

    if (alreadyCreditedToday) {
      req.userCredits = user.credits;
      return next();
    }

    // Look up the synced subscription to determine the active plan
    const transaction = await Transaction.findOne({ clerkId : userId });

    const isActivePremiumPlan =
      transaction &&
      transaction.slug &&
      transaction.slug !== "free_user" &&
      transaction.status === "active";
    
    const creditsToAdd = isActivePremiumPlan
      ? PLAN_CREDITS[transaction.slug] ?? DEFAULT_CREDITS
      : DEFAULT_CREDITS;

    user.credits = creditsToAdd;
    user.lastCreditedAt = now;
    await user.save();

    req.userCredits = user.credits;
    next();
  } catch (err) {
    console.error("Daily credits middleware error:", err.message);
    // Don't block the request just because crediting failed
    next();
  }
};