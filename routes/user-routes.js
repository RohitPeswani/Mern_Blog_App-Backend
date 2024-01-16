import express from "express";

import { getAllUsers, addUser, login, getUserById, getUserWithBlogs } from "../controllers/user-controller.js";

const userRoutes = express.Router();

userRoutes.get("/",getAllUsers);
userRoutes.post("/signup", addUser);
userRoutes.post("/login", login);
userRoutes.get("/:id", getUserById)
userRoutes.get("/blogs/:id", getUserWithBlogs);

export default userRoutes;