require("dotenv").config();
const express = require("express");
require("./config/database"); //require this file here 
const connectDb = require ('./config/database');
const User=require('./models/user');
const app = express();


app.post("/signup", async (req,res)=>{
    const user = new User({
        firstName: "prajwal",
        lastName: "kv",
        email: "p@gmail.com",
        password: "heheheh",   
        age: 25,
        gender: "male"
    });

   await user.save();
   res.send("User created successfully");
})






connectDb().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
}).catch((err)=>{
    console.log("Error connecting to database", err);
})
