import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";

import path from "path";

const __dirname = path.resolve();

const uri = process.env.MONGODB_URL;
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => console.log(err));
const app = express();
app.get("/", (req, res) => {
  res.send("Heyy Gurl");
});

app.use(express.json());
//Signup
app.use("/api/auth", authRoutes);

console.log("Hey");

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use(cookieParser());

app.use("/api/user", userRoutes);

app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);

app.use((err, req, res, next) => {
  const statuscode = err.statuscode || 500;
  const message = err.message || "internal Server Error";
  res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

app.listen(3000, () => {
  console.log("Server is sucessfully Running on port 3000");
});
