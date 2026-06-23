import express from 'express';
// import requireAuth from '../middlewares/user.auth.js';
import { requireAuth } from '@clerk/express';
import { getUser , getChats , getCategories } from '../controllers/users.controller.js';
import { getBillingData } from '../controllers/billing.controller.js';

const router = express.Router();

// ✅ Now this works correctly
router.get("/profile", requireAuth() , getUser);
router.get("/billing", requireAuth() , getBillingData);
router.get("/chats" , getChats);
router.get("/categories/:category" , getCategories);

export default router;