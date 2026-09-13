const express = require('express');
const bcrypt = require('bcrypt');

const User=require('../models/user');
const {userAuth}= require("../../Middleware/auth"); 
const{validateEditProfileData}= require("../utils/validation");
const profileRouter=express.Router();

//view profile api
profileRouter.get("/profile/view",userAuth, async(req,res)=>{
    res.json(req.user);
})

//update profile api
profileRouter.patch("/profile/update", userAuth, async(req,res)=>{
    try{
     validateEditProfileData(req);

     const loggedInUser = req.user;

       const updatedUser = await User.findByIdAndUpdate(
            loggedInUser._id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        res.json({message:loggedInUser.firstName + " profile updated successfully", 
            data : updatedUser
        });
        
        
    }catch(err){
        res.status(400).send("Error updating profile: " + err.message);
    }

})

//update password
profileRouter.patch("/profile/password", userAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user; //req from user, not body - IMPP

        const{oldPassword,newPassword}=req.body;

        const isPasswordValid = await bcrypt.compare(
            oldPassword,
            loggedInUser.password
        ); //always old pass first - IMPP

        if (!isPasswordValid) {
            return res.status(400).send("Invalid old password");
        }

        const passwordHash = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(
            loggedInUser._id,
            {password:passwordHash},
            {
                returnDocument: "after",
                runValidators: true
            }
        );

        res.json({message:loggedInUser.firstName + " password updated successfully", 
            data : updatedUser
        });


    }catch(err){
        res.status(400).send("Error updating password: " + err.message);
    }
})


module.exports = profileRouter;