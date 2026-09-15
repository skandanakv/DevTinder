const express=require("express");
const {userAuth}= require("../../Middleware/auth");
const {user}= require("../models/user");
const ConnectionRequest=require("../models/connectionRequest");


const userRouter=express.Router();

//get user pending requests for loggedIn user
userRouter.get("/user/requests", userAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;
       
        // loddedInuser=toUserId
        //status=interested, else it gives "ignored" as well
        const connectionrequests=await ConnectionRequest.find({  //must be a find(), not a findOne() - know the diff
             toUserId:loggedInUser._id,
             status:"interested"
        }).populate("fromUserId",["firstName","lastName","photoUrl","age", "gender", "about", "skills"]);

        res.json({message:"Pending requests", data:connectionrequests});

    }catch(err){
        res.status(500).send("Error getting profile: " + err.message);

    }
})



module.exports=userRouter;