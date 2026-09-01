const express = require("express");

const app = express();

const {adminAuth, userAuth}= require("../Middleware/auth"); 

app.use("/admin", adminAuth);

app.get("/user",userAuth, (req, res) => {
    res.send("User data is here");
});

app.get("/admin/getAllData", adminAuth, (req, res) => {
    res.send("All data is here");
});

app.get("/admin/deleteData",adminAuth, (req, res) => {
    res.send("Data deleted successfully");
});

app.post("user/login", (req, res) => {       //no auth required
    res.send("User logged in");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});