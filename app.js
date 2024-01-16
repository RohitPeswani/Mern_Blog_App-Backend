import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user-routes.js";
import blogRoutes from "./routes/blog-routes.js";
import cors from 'cors';
dotenv.config();
const app = express();
app.use(cors({
  origin : "http://localhost:5173"
}))
app.use(express.json());

app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
console.log(process.env.MONGO_URL)
mongoose.connect('mongodb+srv://rohitpeswani35:rohit35%40@cluster.otzkiaa.mongodb.net/Mern-blog-app?retryWrites=true&w=majority',
{ useNewUrlParser: true })
.then(() => {
  app.listen(5000, () => {
  console.log("Server Started")
  })
})
.catch((err) => {
  console.log(err);
})


