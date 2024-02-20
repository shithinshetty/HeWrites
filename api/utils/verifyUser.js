import jwt from "jsonwebtoken";
import { errorHandler } from "./err.js";

export const verifytoken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized member "));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized user"));
    }
    req.user = user;

    next();
  });
};
