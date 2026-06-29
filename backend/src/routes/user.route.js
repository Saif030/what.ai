import express from 'express';
// import requireAuth from '../middlewares/user.auth.js';
import { requireAuth } from '@clerk/express';
import { getUser , getChats , getChat , chatDelete } from '../controllers/users.controller.js';
import { getBillingData } from '../controllers/billing.controller.js';

const router = express.Router();

// ✅ Now this works correctly
router.get("/profile", requireAuth() , getUser);
router.get("/billing", requireAuth() , getBillingData);
router.get("/chats" , requireAuth() ,getChats);
router.get("/:chatId" , requireAuth() , getChat);
router.get("/delete/:chatId" , requireAuth() , chatDelete);

export default router;