const express= require('express');
const app=express();



app.use("/test",(req,res)=>{
    res.send("hello from server");
})

app.use("/hello/2",(req,res)=>{
    res.send("hello 2");
})

app.use("/hello",(req,res)=>{
    res.send("hello hello hello");
})

app.use("/",(req,res)=>{
    res.send("first route");
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});