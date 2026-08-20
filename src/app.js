const express= require('express');
const app=express();



app.use("/test",(req,res)=>{
    res.send("hello from server");
})

app.use("/user",(req,res)=>{        
    res.send("hahah");
})

//only handles get calls from /user
app.get("/user",(req,res)=>{
    res.send({firstName:"skandana",lastName:"kv"});
})

app.post("/user",(req,res)=>{
    //saving data to db
    res.send("user data saved successfully");
})

app.delete("/user",(req,res)=>{
    //deleting data from db
    res.send("user data deleted successfully");
})

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});