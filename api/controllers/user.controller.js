import User from "../modals/user.modal.js";
import { errorHandler } from "../utils/err.js";
import bcrypt from "bcryptjs";
export const updateUser = async (req, res, next) => {
  console.log(req.user.userId);
  if (req.user.userId !== req.params.userId) {
    return next(errorHandler(403, "You are not authorized to updatee"));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, "PassCode must atleast have 6 chars"));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  req.body.username = req.body.username.split(" ").join("").toLowerCase();
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, "Username Should Be Between 7 & 20 chars"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Username Should Not Contain Any Special Chars")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};
