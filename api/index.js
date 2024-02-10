import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
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
console.log(process.env.MONGODB_URL);
console.log("Hey");

app.listen(3000, () => {
  console.log("Server is sucessfully Running on port 3000");
});
