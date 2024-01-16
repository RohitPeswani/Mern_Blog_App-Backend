import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title : {
    type : String,
    required : true,
  },
  description : {
    type : String,
    required : true
  },
  imageUrl : {
    type : String,
    required : true
  },
  user : {
    type : mongoose.Types.ObjectId,
    ref : "user",
    required : true
  },
  
  likedBy : [
    {
      type : mongoose.Types.ObjectId,
      ref : "user",
      default : []
    }
  ]
})

const Blog = new mongoose.model("blog", blogSchema);

export default Blog;