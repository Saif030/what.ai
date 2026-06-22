import express from "express";
import { articleWriter, blogTitleGenerator } from "../controllers/whatai.controller.js";
import {requireAuth} from "@clerk/express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("chat route working");
});

//Article writing route
router.post("/write-article", requireAuth() ,articleWriter);
router.post("/title-generator" , requireAuth() , blogTitleGenerator)

export default router;