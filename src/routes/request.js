const express=require("express");

const {userAuth}= require("../../Middleware/auth"); //require the userAuth middleware
const ConnectionRequest=require("../models/connectionRequest");
const User=require("../models/user");

const RequestRouter=express.Router();

// send - interested or ignored connection request
RequestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{
    try{

        const fromUserId=req.user._id; //see, after userAuth middleware, we get data from the sender 
        const toUserId=req.params.toUserId; //we get from params
        const status=req.params.status;

        //status check
        const allowedStatus=["interested","ignored"];
        if(!allowedStatus.includes(status)){
            throw new Error(" Invalid status - " + status);
        }

        //self check
                if (fromUserId.toString() === toUserId) {
    throw new Error(" You cannot send a connection request to yourself");
            }

        //check toUserId must exist in db to make connection
        const toUser=await User.findById(toUserId);
        if(!toUser){
            throw new Error("User not found");
        }

        //check already existing connection
        const existingConnection=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,
                toUserId},
                {fromUserId:toUserId,
                toUserId:fromUserId}
            ]
            
        });

        if(existingConnection){
            throw new Error(" Already connected ");
        }

        const connectionRequest=new ConnectionRequest({ //create a new instance of ConnectionRequest model
            fromUserId,
            toUserId,
            status
        });
        const data = await connectionRequest.save(); //save the instance of ConnectionRequest model to the DB

        res.json({fromUser: req.user.firstName + " is " + status + " to " + toUser.firstName, data    });
    

    }catch(err){
        res.status(400).send("Error" + err.message);
    }
})

// send - accepted or rejected 
RequestRouter.post("/request/review/:status/:id", userAuth, async (req,res) => {
try{
    const loggedInUser=req.user;

    const AllowedStatus=["accepted","rejected"];
     const status=req.params.status;
     const requestId=req.params.id;

    //validate the :status
    if(!AllowedStatus.includes(status)){
        throw new Error("Invalid status - " + status);
    }
    // validate the requestId
    //if A-> B, check if B is actually the loggedIn User, only toUserId person can accept/reject
    // acceptance shld only happen when status is interested 
    const connectionRequest=await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id,
        status:"interested"
    });
    if(!connectionRequest){
        throw new Error("Invalid request");
    }

    connectionRequest.status=status;
    const data=await connectionRequest.save();
    res.json({
    message: loggedInUser.firstName + " " + status + " the connection request",
    data
});

    //if ignored, no need to check


}catch(err){
    res.status(400).send("ERROR " + err.message);
}

})
module.exports = RequestRouter;