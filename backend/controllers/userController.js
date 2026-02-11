import validator from "validator";
import userModel from "../models/userModel.js";
import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createToken =(id) =>{
  return jwt.sign({id}, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist",
      });
    }
    // compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
       const token = createToken(user._id);
       res.json({ success:true, token })
    }
    else {
        res.json({
      success: false,
      message: 'invalid credentials'})
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const registerUser = async (req, res) => {
   try{
    const {name, email, password} = req.body;
    const exists =await userModel.findOne({email});
    if(exists){
      return res.json({success:false, message:"User already exists"});
    }

    if(!validator.isEmail(email)){
      return res.json({success:false, message:"please enter valid Email"});
    }
    if(password.length < 4){
      return res.json({success:false, message:"Please enter a stronger password"});
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

// Route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // First check .env for admin
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ isAdmin: true, email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      return res.json({ success: true, token });
    }

    // Then check admin collection
    const admin = await adminModel.findOne({ email });
    if (admin) {
      const isMatch = await bcrypt.compare(password, admin.password);
      if (isMatch) {
        const token = jwt.sign({ isAdmin: true, email }, process.env.JWT_SECRET, {
          expiresIn: '1d',
        });
        return res.json({ success: true, token });
      }
    }

    res.status(401).json({ success: false, message: 'Invalid credentials' });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

// Admin: list users (no passwords)
const listUsers = async (req, res) => {
  try {
    const users = await userModel
      .find({})
      .select("-password")
      .sort({ _id: -1 });
    res.json({ success: true, users });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Admin: verify token is valid admin token
const verifyAdmin = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
  }
};

// One-time admin bootstrap (works only if no admin exists)
const setupAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter valid Email" });
    }
    if (password.length < 4) {
      return res.status(400).json({ success: false, message: "Please enter a stronger password" });
    }

    const adminCount = await adminModel.countDocuments({});
    const envAdminConfigured = !!(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD);
    if (adminCount > 0 || envAdminConfigured) {
      return res.status(403).json({
        success: false,
        message: "Admin already configured. Please login.",
      });
    }

    const exists = await adminModel.findOne({ email });
    if (exists) {
      return res.status(409).json({ success: false, message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await adminModel.create({ email, password: hashedPassword });

    return res.json({ success: true, message: "Admin created. Please login." });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin, listUsers, verifyAdmin, setupAdmin };
