import express from 'express';
// import requireAuth from '../middlewares/user.auth.js';
import { requireAuth } from '@clerk/express';
import { getUser } from '../controllers/users.controller.js';
import { getBillingData } from '../controllers/billing.controller.js';

const router = express.Router();

// ✅ Now this works correctly
router.get("/profile", getUser);
router.get("/billing", getBillingData);

export default router;