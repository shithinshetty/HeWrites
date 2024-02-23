import express from "express";
import { verifytoken } from "../utils/verifyUser.js";
import { create } from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifytoken, create);

export default router;
