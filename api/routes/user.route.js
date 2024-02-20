import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifytoken } from "../utils/verifyUser.js";

const router = express.Router();

router.put("/update/:userId", verifytoken, updateUser);
export default router;
