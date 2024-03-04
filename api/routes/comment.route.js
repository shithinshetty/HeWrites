import express from "express";
import {
  createComment,
  editcomment,
  getPostComments,
  likecomment,
} from "../controllers/comment.controller.js";
import { verifytoken } from "../utils/verifyUser.js";
const router = express.Router();
router.post("/create", verifytoken, createComment);
router.get("/getPostComments/:postId", getPostComments);
router.put("/like/:commentId", verifytoken, likecomment);
router.put("/edit/:commentId", verifytoken, editcomment);
export default router;
