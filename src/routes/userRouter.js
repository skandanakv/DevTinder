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

//get user connections 
userRouter.get("/user/connections", userAuth, async(req,res)=>{
    try{
        const loggedInUser=req.user;

        const connectionRequests=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id,
                status:"accepted"},
                {toUserId:loggedInUser._id,
                status:"accepted"}
            ]
            
        }).populate("fromUserId",["firstName","lastName","photoUrl","age", "gender", "about", "skills"])
        .populate("toUserId",["firstName","lastName","photoUrl","age", "gender", "about", "skills"]);

        // test bug - if toUserId is loggedInUser, then fromUserId is the connection and vice versa
        const data=connectionRequests.map((row)=> {
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
            }else{
                return row.fromUserId;
            }
            });

        res.json({message:"Connections", data});


    }catch(err){
        res.send(500).send("Error:  " + err.message);
    }
})



module.exports=userRouter;