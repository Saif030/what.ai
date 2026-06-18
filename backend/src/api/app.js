import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { clerkMiddleware , requireAuth } from '@clerk/express'
import userRoute from '../routes/user.route.js'

const app = express()

// ✅ CORS
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
  credentials: true,
}));

// ❗ AFTER webhook
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(clerkMiddleware()) // this provide user in req.body

//routes
app.get("/", (req, res) => {
  res.json({ message: "Api is working!" });
});

// app.use(requireAuth()) //after this middleware all route protected

app.use("/user", userRoute)

export default app; 