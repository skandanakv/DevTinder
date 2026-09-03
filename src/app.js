require("dotenv").config();
const express = require("express");
require("./config/database"); //require this file here 
const connectDb = require ('./config/database');
const User=require('./models/user');
const app = express();

app.use(express.json());


//get user by email
app.get("/user", async(req,res)=>{
    const userEmail=req.body.email;
    try{
        const user=await User.findOne({email:userEmail});
        if(!user){
            return res.status(404).send("User not found");
        }
        res.send(user);
    }catch(err){
        res.status(500).send("Error fetching user: " + err.message);
    }
})


app.post("/signup", async (req,res)=>{
    const user = new User(req.body);

    try{
await user.save();
   res.send("User created successfully");
    }catch(err){
        res.status(400).send("Error creating user: " + err.message);
    }
   
})


connectDb().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
}).catch((err)=>{
    console.log("Error connecting to database", err);
})
