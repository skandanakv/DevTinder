const express = require("express");

const app = express();

app.get("/getUserData", (req,res)=>{
    try{
 throw new Error("ffgsgjkjhvcxdsfghnb");
    res.send("User data");
    }
    catch(err){
        res.status(500).send("Internal Server Error contact support team");
    }
   
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});