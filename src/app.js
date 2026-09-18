require("dotenv").config();
const express = require("express");
require("./config/database"); //require this file here 
const connectDb = require ('./config/database');
const cookieParser = require("cookie-parser");
const cors = require('cors'); 




const authRouter=require('./routes/auth');  //require routers here
const RequestRouter=require('./routes/request');
const profileRouter=require('./routes/profile');
const userRouter=require('./routes/userRouter');

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/', authRouter); //use routers here
app.use('/', RequestRouter);
app.use('/', profileRouter);
app.use('/', userRouter);


connectDb().then(()=>{
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
}).catch((err)=>{
    console.log("Error connecting to database", err);
})
