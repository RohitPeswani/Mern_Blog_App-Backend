import express from "express";

import { getAllBlogs, addBlog , updateBlog, deleteBlog, getBlogById, likePost, unlikePost} from "../controllers/blog-controller.js";

const blogRoutes = express.Router();

blogRoutes.get("/", getAllBlogs);
blogRoutes.get("/:id", getBlogById)
blogRoutes.post("/add", addBlog);
blogRoutes.put("/update/:id", updateBlog);
blogRoutes.delete("/delete/:id", deleteBlog);
blogRoutes.put("/like/:id", likePost);
blogRoutes.put("/unlike/:id", unlikePost);

export default blogRoutes;