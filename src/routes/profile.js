const express = require('express');

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


module.exports = profileRouter;