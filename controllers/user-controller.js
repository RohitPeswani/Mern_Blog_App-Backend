import User from "../models/User.js";

export const getAllUsers = async(req, res, next) => {
  let users;
  try{
    users = await User.find({});
  }catch(err){
    console.log(err)
    return res.status(500).json({message : "Some Error Occured"});
  }
  
  return res.status(200).json({users});
}

export const addUser = async(req, res, next) => {
  const { name, email, password } = req.body;
  
  let existingUser, newUser;
    
  try{
    existingUser = await User.find({ email });
  }catch(err){
    console.log(err);
    return res.status(400).json({ message : "User Already Exist"});
  }
  
  try{
    newUser = new User({
      name,
      email,
      password
    })
    newUser = await newUser.save();
  }catch(err){
    console.log(err);
    return res.status(500).json({ message : "Some Error Occured"});
  }
  
  return res.status(200).json({ user : newUser })
  
}

export const login = async(req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  
  try {
    existingUser = await User.findOne({email , password})
  } catch (err) {
     console.log(err);
     return res.status(500).json({message : "Some Error Occured"});
  }
  
  if(!existingUser){
    return res.status(400).json({message : "No User Found"})
  }
  
  return res.status(200).json({message : "Login Successfull", user: existingUser});
  
}

export const getUserById = async(req, res, next) => {
  const { id } = req.params;
  let existingUser;
  try{
    existingUser = await User.findOne({_id : id})
  }catch(err) {
    console.log(err);
    return res.status(500).json({message : "Some Error Occured"})
  }
  
  return res.status(200).json({ user : existingUser})
  
}

export const getUserWithBlogs = async(req, res, next) => {
  const { id } = req.params;
  let existingUser;
  try{
    existingUser = await User.findOne({_id : id}).populate('blogs');
  }catch(err) {
    console.log(err);
    return res.status(500).json({message : "Some Error Occured"})
  }
  
  return res.status(200).json({user : existingUser})
  
}