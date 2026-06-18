import express from 'express';
import { clerkWebhook } from '../controllers/users.controller.js';

const router = express.Router();

router.route("/webhooks").post(express.raw({ type: "application/json" }), clerkWebhook);
router.route("/webhooks").get((req, res) => {
  res.json({ message: "This endpoint is for Clerk webhooks. Please send a POST request." });
});

export default router;