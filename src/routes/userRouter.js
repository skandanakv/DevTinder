const express=require("express");
const {userAuth}= require("../../Middleware/auth");
const {user}= require("../models/user");
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");


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

//get user feed
userRouter.get("/feed", userAuth, async(req,res)=>{
    try{
        // 0. not his own card
        // 1. not his connections
        // 2. not ignored ppl
        // 3. not rejected ppl
        // 4. interested ppl - already sent connection request to 

        const loggedInUser=req.user;

        //get all sent+received and remove them
        const Connectionrequest=await ConnectionRequest.find({
            $or:[
                {fromUserId:loggedInUser._id},
                {toUserId:loggedInUser._id}
            ]
        }).select("toUserId fromUserId");

        //creating set ds
        const hideUserFromFeed=new Set();

        Connectionrequest.forEach((req)=>{
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());
    });  //here u get the ids of ppl who we want to hide from feed

    const users=await User.find({
        $and:[
            {_id:{$nin:[...hideUserFromFeed]}}, //id not in hidden set
            {_id:{$ne:loggedInUser._id}}  // id not equal to loggedInUser
        ],
    }).select("firstName lastName photoUrl age gender about skills");
    

        res.send(users);

    }catch(err){
        res.status(500).send("Error:  " + err.message);
    }
})



module.exports=userRouter;