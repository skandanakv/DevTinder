const mongoose=require("mongoose");

const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        required:true,
        type:Mongoose.Schema.Types.ObjectId,
    },
      toUserId:{
        required:true,
        type:Mongoose.Schema.Types.ObjectId,
    },
    status:{
        required:true, 
        enum:{
            values:["pending","accepted","rejected", "ignored"],
            message: '{VALUE} is incorrect status type',
        }
    
    }

    
}, {timestamps:true});

const connectionrequestModel=new mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports=connectionrequestModel;