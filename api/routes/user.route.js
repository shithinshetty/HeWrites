import express from "express";
import {
  deleteUser,
  singOut,
  updateUser,
} from "../controllers/user.controller.js";
import { verifytoken } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifytoken, updateUser);
router.delete("/delete/:userId", verifytoken, deleteUser);
router.post("/signout", singOut);
export default router;
