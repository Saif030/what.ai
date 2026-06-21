import express from 'express';
import { userCredits, creditsUpdation } from '../controllers/credit.controller.js';
import { grantDailyCredits } from '../middlewares/grantDailyCredits.js';

const router = express.Router();

router.get("/get-credits", grantDailyCredits, userCredits);
router.post("/use-credits",creditsUpdation);

export default router;