const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
    },
      toUserId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
    },
    status:{
        type:String,
        required:true, 
        enum:{
            values:["interested","accepted","rejected", "ignored"],
            message: '{VALUE} is incorrect status type',
        }
    
    }

}, {timestamps:true});

// Prevent duplicate A → B requests at database level
connectionRequestSchema.index(
    { fromUserId: 1, toUserId: 1 },
    { unique: true }
);

const ConnectionrequestModel=new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports=ConnectionrequestModel;