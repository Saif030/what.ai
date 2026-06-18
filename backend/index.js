import app from "./src/api/app.js";
import dotenv from "dotenv";
import dbConnect from "./src/dbConnect/dbConnect.js";
dotenv.config();

const port = process.env.PORT || 3000;

dbConnect().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
});