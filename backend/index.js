import dotenv from "dotenv";
dotenv.config();

import app from "./src/api/app.js";
import dbConnect from "./src/dbConnect/dbConnect.js";

// Connect to DB once (Vercel may reuse the instance across requests)
let isConnected = false;

async function connectDB() {
    if (isConnected) return;
    await dbConnect();
    isConnected = true;
}

// Vercel expects a default export handler
export default async function handler(req, res) {
    await connectDB();
    return app(req, res); // Pass the request to Express
}