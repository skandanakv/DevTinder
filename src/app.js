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

//feed api to get all users
app.get("/feed", async (req,res)=>{
    try{
        const users=await User.find({}); //passing empty filter to get all users
        res.send(users);
    }catch(err){
        res.status(500).send("Error fetching feed: " + err.message);
    }
})

//delete user by id
app.delete("/user", async(req,res)=>{
    const userId=req.body._id;
    try{
        const user=await User.findByIdAndDelete(userId);
        if(!user){
            return res.status(404).send("User not found");
        }
        res.send("User deleted successfully");
    }catch(err){
        res.status(500).send("Error deleting user: " + err.message);
    }
})

//modify user by id - patch
app.patch("/user/:id", async(req, res)=>{
    const userId=req.params?.id;
    const data=req.body;

    const ALLOWED_UPDATES = [
    "about","skills", "photoUrl", "age", "gender"
    ]
    
    const isUpdateAllowed = Object.keys(data).every((k)=> ALLOWED_UPDATES.includes(k));
    if(!isUpdateAllowed){
        return res.status(400).send("Updates Not Allowed");
    }


    try{
        const user=await User.findByIdAndUpdate(userId, data, {
            returnDocument: "after", runValidators: true
        });
        if(!user){
            return res.status(404).send("User not found");
        }
        res.send(user);
    }catch(err){
        res.status(500).send("Error updating user: " + err.message);
    }
})

app.post("/signup", async (req, res) => {

    const data = req.body;

    const ALLOWED_FIELDS = [
        "firstName",
        "lastName",
        "email",
        "password",
        "age",
        "gender",
        "photoUrl",
        "about",
        "skills"
    ];

    const isAllowed = Object.keys(data).every((field) =>
        ALLOWED_FIELDS.includes(field)
    );

    if (!isAllowed) {
        return res.status(400).send("Invalid fields provided");
    }

    try {

        const user = new User(data);

        await user.save();

        res.send("User created successfully");

    } catch (err) {

        res.status(400).send("Error creating user: " + err.message);

    }

});


connectDb().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
}).catch((err)=>{
    console.log("Error connecting to database", err);
})
