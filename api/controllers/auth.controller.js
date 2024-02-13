import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/err.js";
import jwt from "jsonwebtoken";
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler(400, "All the Fields Are Neccessay Brother"));
  }
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(400, "Wrong Credentails"));
    }
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword || !validUser) {
      return next(errorHandler(400, "Wrong Credentials"));
    }
    const token = jwt.sign(
      {
        userId: validUser._id,
      },
      process.env.JWT_SECRET
    );
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(validUser);
  } catch (error) {
    next(error);
  }
};
