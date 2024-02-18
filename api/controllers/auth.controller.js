import User from "../modals/user.modal.js";
import bcrypt from "bcryptjs";
import { errorHandler } from "../utils/err.js";
import jwt from "jsonwebtoken";

//Signup
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

//SignIN
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

//GoogleAuth
export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      res
        .status(200)
        .cookie("access_token_gauth", token, {
          httpOnly: true,
        })
        .json(user);
    } else {
      const generatedPasscode = email + process.env.JWT_SECRET;
      const hashPasscode = bcrypt.hashSync(generatedPasscode, 10);
      const newUser = new User({
        username: name.toLowerCase().split(" ").join(" "),
        email,
        password: hashPasscode,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET);
      res
        .status(200)
        .cookie("access_token_gauth", token, {
          httpOnly: true,
        })
        .json(newUser);
    }
  } catch (error) {
    next(error);
  }
};
