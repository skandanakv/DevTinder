const express= require('express');
const app=express();



app.use("/test",(req,res)=>{
    res.send("hello from server");
})


app.get("/user/:userId/:country",(req,res)=>{
    console.log(req.params);
    res.send({firstName:"skandana",lastName:"kv"});
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});