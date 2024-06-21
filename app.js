import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user-routes.js";
import blogRoutes from "./routes/blog-routes.js";
import cors from 'cors';
dotenv.config();
const PORT = process.env.port || 5000;
const app = express();
app.use(cors({
  origin : "http://blogapp.netlify.app"
}))
app.use(express.json());

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
//console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL),
{ useNewUrlParser: true })
.then(() => {
  app.listen(PORT, () => {
  console.log("Server Started")
  })
})
.catch((err) => {
  console.log(err);
})


