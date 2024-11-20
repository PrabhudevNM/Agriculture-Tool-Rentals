import User from "../Models/user-model.js";
import {validationResult} from "express-validator"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../../utils/dataUri.js"
import { v2 as cloudinary } from "cloudinary";

const usersCltr={}

usersCltr.register=async (req,res)=> {
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }
    const body = req.body;
        // Process the file and upload to Cloudinary if it exists
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const result = await cloudinary.uploader.upload(fileUri.content, {
                folder: "Profiles",
            });
            body.file = result.secure_url; // Add file URL to the body
        }

    try {
        const userCount=await User.countDocuments()
        const user=new User(body)
        const salt=await bcryptjs.genSalt()
        const hash=await bcryptjs.hash(user.password,salt)
        user.password=hash
        if(userCount===0){
            user.role='admin'
        }
        await user.save()
        res.status(201).json(user)
        } catch (error) {
        console.log(error)
        res.status(500).json({error:'something went wrong'})
    }
}


usersCltr.login=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email,password}=req.body
    try {
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({errors:'invalid email or password '})
        }
        const isVerified=await bcryptjs.compare(password,user.password)
        if(!isVerified){
            return res.status(404).json({errors:'invalid email or password'})
        }
        const tokenData={userId:user._id,role:user.role}
        const token=jwt.sign(tokenData,process.env.JWT_SECRET,{expiresIn:'2y'})
        res.json({token:token})
    } catch (error) {
        console.log(error)
        res.status(500).json({errors:'something went wrong'})
    }
}

usersCltr.account=async(req,res)=>{
    try {
        const user=await User.findById(req.userId)
        res.json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"something went wrong"})
    }
}

//listing all users
usersCltr.listUsers=async(req,res)=>{
    try{
        const users=await User.find()
        res.json(users)
    }catch(error){
        res.status(500).json({error:"something went wrong"})
    }   
}

//deleting a user by admin
usersCltr.destroy=async(req,res)=>{
    const id=req.params.id
    try {
        const users=await User.findByIdAndDelete(id)
        res.status(200).json(users)
    } catch (error) {
        // console.log(error)
        res.status(500).json({error:"something went wrong"})
    }
}

//for create photo
usersCltr.create = async (req, res) => {
   const body=req.body
    const file=req.file
    const fileUri = getDataUri(file); // or  getDataUri(file)
            const result = await cloudinary.uploader.upload(fileUri.content, {
                folder: "Profile",
            });
            body.file = result.secure_url;

    try {
        const profile = new User(body);
        profile.user = req.userId; // Ensure req.userId is set correctly
        await profile.save();
        res.status(201).json({
            message: "Profile created successfully",
            profile,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to create profile" }); 
    }
};

//for show photo
usersCltr.show=async (req,res)=>{
    try{
        const profile=await User.findOne({ _id:req.userId})
        if(!profile){
            return res.status(404).json({})
        }
        res.status(200).json(profile)
    }catch(err) {
    res.json(err)
    }
}

//for update photo
usersCltr.update = async (req, res) => {
    try {
        const body = req.body;
        const userId = req.userId
        
        const file=req.file
        const fileUri = getDataUri(file); // or  getDataUri(file)
                const result = await cloudinary.uploader.upload(fileUri.content, {
                    folder: "Profile",
                });
                body.file = result.secure_url;

        const profile = await User.findOneAndUpdate({ _id: userId },body,{ new: true });
        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }
        return res.status(200).json({
            message: "Profile updated successfully",
            profile
        });

    } catch (err) {
        console.error("Error updating profile:", err);
        return res.status(500).json({ error: "Failed to update profile" });
    }
};

//for remove photo
usersCltr.removePhoto = async (req, res) => {
    try {
        const updatedProfile = await User.findOneAndUpdate({ _id: req.userId },{ file: null },{ new: true });

        if (!updatedProfile) {
            return res.status(404).json({ error: "Profile not found" });
        }
        
        return res.status(200).json({
            message: "Profile photo removed successfully",
            profile: updatedProfile 
        });

    } catch (err) {
        console.error("Error removing profile photo:", err);
        return res.status(500).json({ error: "Failed to remove profile photo" });
    }
};

//By admin change role
usersCltr.changeRole=async(req,res)=>{
    try {
        const id=req.params.id
        const body=req.body
        if(id==req.userId){
            return res.status(400).json({error:'You cannot change role of your own account'})
        }
        const user=await User.findByIdAndUpdate(id,body,{new:true})
        res.json(user)
    } catch (error) {
        console.log(err)
        res.status(500).json({errors:'Something went wrong'})
    }
}


export default usersCltr