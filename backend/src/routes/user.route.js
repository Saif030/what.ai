import express from 'express';
// import requireAuth from '../middlewares/user.auth.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

// ✅ Now this works correctly
router.get("/profile", requireAuth(), (req, res) => {
    // Access the userId attached by middleware
    res.json({ 
        message: "Profile", 
        userId: req.userId 
    });
});

router.put("/profile", requireAuth(), (req, res) => {
    res.json({ 
        message: "Profile updated",
        userId: req.userId 
    });
});

export default router;