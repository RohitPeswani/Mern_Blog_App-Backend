import Blog from "../models/Blog.js";
import User from "../models/User.js";
import mongoose from "mongoose";
import {MongoClient} from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export const getAllBlogs = async(req, res, next) => {
  let blogs;
  try{
   blogs = await Blog.find({}).populate('user');
  }catch(err){
    console.log(err)
    return res.status(500).json({message : "Some Error Occured"});
  }
  
  return res.status(200).json({blogs});
}

export const addBlog = async(req, res, next) => {
  const { title, description, imageUrl, user } = req.body;
  let newBlog, existingUser;
  
  try{
    existingUser = await User.findOne({ _id : user });
  }catch(err) {
    console.log(err);
    return res.status(500).json({ message : "Some Error Occured "});
  }
  if(!existingUser){
    return res.status(404).json({ message : "User Not found" });
  }
  
  try {
    newBlog = new Blog({
    title, 
    description, 
    imageUrl, 
    user
    })
    
    const session = await mongoose.startSession();
    session.startTransaction();
    newBlog = await newBlog.save({ session })
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message : "Some Error Occured"});
  }
  
  return res.status(200).json({ newBlog })
}

export const updateBlog = async(req, res, next) => {
  const { id } = req.params;
  const { title , description } = req.body;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate({_id : id}, { title, description });
  } catch (err) {
    console.log(err);
    return res.status(500).json({message : "Some Error Occured"});
  }
  
  return res.status(200).json({ blog });
}

export const deleteBlog = async(req, res, next) => {
  const { id } = req.params;
  let deletedBlog;
  try{
    deletedBlog = await Blog.findByIdAndDelete(id).populate('user');
    await deletedBlog.user.blogs.pull(deletedBlog);
    await deletedBlog.user.save();
  }catch(err) {
    console.log(err);
    return res.status(500).json({message : "Some Error Occured"});
  }
  
  return res.status(200).json({ message : "Deleted Successfully "});
}

export const getBlogById = async (req, res, next) => {
  const { id } = req.params;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (err) {
    console.log(err)
    return res.status(500).json({message : "some Error Occured"})
  }
  
  return res.status(200).json({ blog })
}

export const likePost = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.body.userId;
 
  const session = await mongoose.startSession();
  session.startTransaction();
  const existingUser = await User.findByIdAndUpdate({_id : userId}, {$addToSet : {likedBlogs : blogId}}, {new : true});
  await existingUser.save({session});
  const existingBlog = await Blog.findByIdAndUpdate({_id : blogId}, {$addToSet : {likedBy : userId}}, {new : true});
  await existingBlog.save({session});
  session.commitTransaction();
 return res.json({existingBlog})
}

export const unlikePost = async (req, res) => {
  const blogId = req.params.id;
  const userId = req.body.userId;
/*  const existingUser = await User.findById(req.body.userId);
  const existingBlog = await Blog.findById(blogId);*/
  
  const session = await mongoose.startSession();
  session.startTransaction();
  const existingUser = await User.findByIdAndUpdate({_id : userId}, {$pull : {likedBlogs : blogId}}, {new : true});
  await existingUser.save({session});
  const existingBlog = await Blog.findByIdAndUpdate({_id : blogId}, {$pull : {likedBy : userId}}, {new : true});
  await existingBlog.save({session});
  session.commitTransaction();
  
  return res.json({existingBlog});
}

/*(async () => {
  const client = new MongoClient(process.env.MONGO_URL);
  
  client.connect().then(async () => {
    const db = client.db();
    const collection = db.collection('blogs');

    // Create the index
    await collection.createIndex(
      { likedBy: 1 },
      { unique: true, sparse: true }
    );
    
    console.log('Index created successfully');
    const document = {
      title: "James fifth blog",
      description: "Testing Purpose Again",
      imageUrl: "NA",
      user: "64e70fa22f1dfca146f245e1",
      likedBy : "64e70fa22f1dfca146f245e1"
    }
   // const existingBlog = await Blog.findById("65180d6e6d089564ef26951f");
    const temp = await collection.updateOne({_id : "65181629e8e33e869df3040d"}, {$push : {likedBy : "64e70fa22f1dfca146f245e1"}});
    console.log(temp);
    client.close();
  })
  })()*/
  
/*(async () => {
  const existingBlog = await Blog.findByIdAndUpdate({_id : "651818f0b2461f8694efcd0f"}, {"$set" : {"likedBy" : []}})
  await existingBlog.save();
})();*/