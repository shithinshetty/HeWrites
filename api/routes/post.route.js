import express from "express";
import { verifytoken } from "../utils/verifyUser.js";
import { create, getPosts } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifytoken, create);
router.get("/getposts", getPosts);
export default router;
