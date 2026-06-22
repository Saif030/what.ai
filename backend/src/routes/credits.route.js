import express from 'express';
import { userCredits, creditsUpdation } from '../controllers/credit.controller.js';
import { grantDailyCredits } from '../middlewares/grantDailyCredits.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

router.get("/get-credits", requireAuth() ,grantDailyCredits, userCredits);
router.post("/use-credits",requireAuth() ,creditsUpdation);

export default router;