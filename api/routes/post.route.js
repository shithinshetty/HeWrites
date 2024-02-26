import express from "express";
import { verifytoken } from "../utils/verifyUser.js";
import {
  create,
  deletepost,
  getPosts,
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", verifytoken, create);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifytoken, deletepost);
export default router;
