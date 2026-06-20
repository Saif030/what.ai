import express from 'express';
import { requireAuth } from '@clerk/express';
import { userCredits, creditsUpdation } from '../controllers/credit.controller.js';

const router = express.Router();

router.get("/get-credits", requireAuth(), userCredits);
router.post("/use-credits", requireAuth(), creditsUpdation);

export default router;