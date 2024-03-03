import express from "express";
import {
  createComment,
  getPostComments,
} from "../controllers/comment.controller.js";
import { verifytoken } from "../utils/verifyUser.js";
const router = express.Router();
router.post("/create", verifytoken, createComment);
router.get("/getPostComments/:postId", getPostComments);
export default router;
