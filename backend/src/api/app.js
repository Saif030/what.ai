import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { clerkMiddleware , requireAuth } from '@clerk/express'
import userRoute from '../routes/user.route.js'
import { clerkWebhook } from '../controllers/users.controller.js'
import creditsRoute from '../routes/credits.route.js'
import { subscriptionWebhook } from '../controllers/billing.controller.js'
import whataiRoute from '../routes/chats.route.js'

const app = express()

app.use(cors({
  origin: ["http://localhost:5173","https://whatt-ai.vercel.app"],
  credentials: true,
}));

// 1. WEBHOOK FIRST — raw body, no auth, no JSON parsing
app.post("/webhooks", 
  express.raw({ type: "application/json" }), 
  clerkWebhook
)

app.post("/billingwebhook", 
  express.raw({ type: "application/json" }), 
  subscriptionWebhook
)

// 2. THEN normal middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(clerkMiddleware())

// 3. Public health check
app.get("/", (req, res) => res.json({ message: "Api is working!" }))


app.use("/user", userRoute)
app.use("/credits", creditsRoute)
app.use("/whatai", whataiRoute)

export default app;
