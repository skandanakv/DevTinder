const express = require("express");
require("./config/database"); //require this file here 
const connectDb = require ('./config/database');
const app = express();


connectDb().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
}).catch((err)=>{
    console.log("Error connecting to database", err);
})
