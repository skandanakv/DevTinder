const express = require('express');

const User=require('../models/user');
const {userAuth}= require("../../Middleware/auth"); 

const profileRouter=express.Router();

profileRouter.get("/profile",userAuth, async(req,res)=>{
    res.json(req.user);

})

module.exports = profileRouter;