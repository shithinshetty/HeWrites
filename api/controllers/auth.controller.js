import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/err.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields are required"));
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newuser = new User({
    username,
    email,
    password: hashedPassword,
  });
  try {
    await newuser.save();
    res.send({ message: "Signup is success" });
  } catch (error) {
    next(error);
  }
};
