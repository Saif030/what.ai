import dotenv from "dotenv";
dotenv.config();

import app from "./src/api/app.js";
import dbConnect from "./src/dbConnect/dbConnect.js";


const port = process.env.PORT || 3000;

dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});