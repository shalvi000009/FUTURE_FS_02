import validater from "validator";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken =(id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
    
};

const registerUser = async (req, res) => {
   try{
    const {name, email, password} = req.body;
    const exists =await userModel.findOne({email});
    if(exists){
      return res.json({message:"User already exists"});
    }

    if(!validater.isEmail(email)){
      return res.json({success:false, message:"please enter valid Email"});
    }
    if(password.length < 8){
      return res.json({success:false, message:"Password must be at least 8 characters"});
    }
    //hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password:hashedPassword,
    });

    const user = await newUser.save() ;
    
    const token =createToken(user._id)
    res.json({success:true, token});

  }catch(error){  
    console.log(error);
    res.json({success:false, message:error.message});
  }
};

const adminLogin = async (req, res) => {
 
};

export { loginUser, registerUser, adminLogin };
