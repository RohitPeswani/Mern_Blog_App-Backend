import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true,
    minLength : 6
  },
  blogs : [
    {
      type : mongoose.Types.ObjectId,
      ref : "blog",
      required: true
    }
  ],
  
  likedBlogs : [
   {
     type : mongoose.Types.ObjectId,
     ref : "blog",
     default : []
   } 
    
  ]
})

const User = new mongoose.model("user", UserSchema);

export default User;