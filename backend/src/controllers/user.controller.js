import { User } from "../models/user.model.js";
import uploadFiltToCloudinary from "../utils/cloudinary.js";
import { handleRespone } from "../utils/responseHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;

    if (!fullName || !email || !password || !phoneNumber || !role) {
      return handleRespone(res, 400, false, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    // check existing user
    if (existingUser) {
      return handleRespone(res, 400, false, "user already exists with email");
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    if (!req.file) {
      return handleRespone(res, 500, false, "Profile photo is required");
    }

    const cloudeResponse = await uploadFiltToCloudinary(req.file);

    if (!cloudeResponse) {
      return handleRespone(res, 500, false, "file upload failed");
    }

    await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      profile: {
        profilePhoto: cloudeResponse.url,
      },
    });

    return handleRespone(res, 201, true, "User created successfully");
  } catch (error) {
    return handleRespone(res, 500, false, "Error during registration");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return handleRespone(res, 400, false, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return handleRespone(res, 400, false, "Incorrect email or password");
    }

    const isPassowrdMatch = await bcryptjs.compare(
      password,
      existingUser.password
    );

    if (!isPassowrdMatch) {
      return handleRespone(res, 400, false, "Incorrect email or password");
    }

    if (role !== existingUser.role) {
      return handleRespone(res, 400, false, "Role does not match this account");
    }

    const tokenData = {userId: existingUser._id};
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn:"1d"});

    const user = {
      _id:existingUser._id,
      fullName:existingUser.fullName,
      email:existingUser.email,
      phoneNumber:existingUser.phoneNumber,
      role:existingUser.role,
      profile:existingUser.profile
    }

     return res.status(200).cookie("token", token, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly : true,
      simeSite:"strict"
     }).json({
      success:true,
      message : `welcome back ${existingUser.fullName}`,
      user
     })
  } catch (error) {
    return handleRespone(res, 500, false, "Error during login");
  }
};

export const logout = async(req,res) => {
  try {
    return res.status(200).cookie("token", "", {
      maxAge: 0,
      httpOnly : true,
      simeSite:"strict"
     }).json({
      success:true,
      message : "Logged  out successfully",
     })
  } catch (error) {
     return handleRespone(res, 500, false, "Error during logout");
  }
}

export const updateProfile = async(req,res) => {
  try {
    const {fullName, email, phoneNumber, bio, skills} = req.body;
    const userId = req.id;
  
    const user = await User.findById(userId);
  
    if(!user){
      return handleRespone(res,  404, false, "User not found");
    }
   
    let cloudResponse;
    if(req.file){
       cloudResponse = await uploadFiltToCloudinary(req.file);
    
      if(!cloudResponse){
        return handleRespone(res, 500, false, "file upload failed")
      }
    }

    if(fullName) user.fullName = fullName
    if(email) user.email = email
    if(phoneNumber) user.phoneNumber = phoneNumber
    if(bio) user.profile.bio = bio
    if(skills) user.profile.skills = skills.split(",").map((skill) => skill.trim());

    if(cloudResponse){
      user.profile.resume = cloudResponse.url,
      user.profile.resumeName = req.file.originalname;
    }

    
    await user.save();

    const updatedUser = {
      _id:user._id,
      fullName:user.fullName,
      email:user.email,
      phoneNumber:user.phoneNumber,
      profile:user.profile
    }
      
    return handleRespone(res, 200, true, "Profile updated successfully", updatedUser)
  } catch (error) {
    return handleRespone(res, 500, false, "Error during update profile");
  }
}

