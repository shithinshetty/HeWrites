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
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, "Username Should Be Between 7 & 20 chars"));
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandler(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Username must be lowercase"));
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

export const deleteUser = async (req, res, next) => {
  console.log(req.params.userId);
  console.log(req.user.userId);
  if (!req.user.isAdmin && req.user.userId !== req.params.userId) {
    return next(errorHandler(403, "You are not authorized to Delete "));
  }
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json("User has been Deleted");
  } catch (error) {
    next(error);
  }
};

export const singOut = (req, res, next) => {
  try {
    res.clearCookie("access_token").status(200).json("User Signed Out");
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You're Not an Admin"));
  }
  try {
    const startindex = parseInt(req.query.startindex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === "asc" ? 1 : -1;
    const user = await User.find()
      .sort({ createdAt: sortDirection })
      .skip(startindex)
      .limit(limit);

    const userCount = await User.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({ user, userCount, lastMonthUsers });
  } catch (error) {
    next(error);
  }
};
