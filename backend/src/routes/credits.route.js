import express from 'express';
import { userCredits, creditsUpdation } from '../controllers/credit.controller.js';

const router = express.Router();

router.get("/get-credits",userCredits);
router.post("/use-credits",creditsUpdation);

export default router;