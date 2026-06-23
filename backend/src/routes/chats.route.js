import express from "express";
import { articleWriter, blogTitleGenerator, objectRemover } from "../controllers/whatai.controller.js";
import {requireAuth} from "@clerk/express";
import upload from "../utils/fileuploads.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("chat route working");
});

//Article writing route
router.post("/write-article", requireAuth() ,articleWriter);
router.post("/title-generator" , requireAuth() , blogTitleGenerator)
router.post("/remove-object", upload.single("image") , objectRemover)

export default router;