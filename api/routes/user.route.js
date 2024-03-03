import express from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  singOut,
  updateUser,
} from "../controllers/user.controller.js";
import { verifytoken } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifytoken, updateUser);
router.delete("/delete/:userId", verifytoken, deleteUser);
router.post("/signout", singOut);
router.get("/getusers", verifytoken, getUsers);
router.get("/:userId", getUser);
export default router;
