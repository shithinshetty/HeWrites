import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import authRoutes from "./routes/auth.route.js";
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

app.listen(3000, () => {
  console.log("Server is sucessfully Running on port 3000");
});
