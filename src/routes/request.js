const express=require("express");

const {userAuth}= require("../../Middleware/auth"); //require the userAuth middleware

//send connectionRequest api

const RequestRouter=express.Router();

RequestRouter.post("/sendConnectionRequest",userAuth, async(req,res)=>{
    const user=req.user;
    console.log("sending a connection request from user:", user.email);
    res.send("connection request sent from user: " + user.email);
})

module.exports = RequestRouter;