import express from "express";
import createComment from "../controllers/comment.controller.js";
import { verifytoken } from "../utils/verifyUser.js";
const router = express.Router();
router.post("/create", verifytoken, createComment);
export default router;
