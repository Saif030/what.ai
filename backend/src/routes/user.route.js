// routes/user.route.js
import express from 'express'
const router = express.Router()

// Only authenticated user routes here
router.get("/profile", (req, res) => res.json({ message: "Profile" }))
router.put("/profile", (req, res) => res.json({ message: "Profile updated" }))
// ... etc

export default router