import express from "express";
import { articleWriter, blogTitleGenerator, backgorundRemover , objectRemover } from "../controllers/whatai.controller.js";
import {requireAuth} from "@clerk/express";
import upload from "../utils/fileuploads.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("chat route working");
});

//Article writing route
router.post("/write-article", requireAuth() ,articleWriter);
router.post("/title-generator" , requireAuth() , blogTitleGenerator)
router.post("/remove-background", requireAuth() , upload.single("image") , backgorundRemover)
router.post("/remove-object", requireAuth() , upload.single("image") , objectRemover)

export default router;