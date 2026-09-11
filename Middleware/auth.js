const jwt = require("jsonwebtoken");
const User = require("../src/models/user");

const userAuth = async (req, res, next) => {
    try{
    const cookies=req.cookies;
    const {token}=cookies;
    if(!token){
        throw new Error("Invalid Token");
    }

    const decodedObj=await jwt.verify(token, "Skandana@DevTinder");
    const {_id}=decodedObj;
   
    const user= await User.findById(_id);
    if(!user){
        throw new Error("User not found");
    }
    req.user=user;
    next();

} catch(err){
    res.status(500).send("Error getting profile: " + err.message);  
}
}   

module.exports = { userAuth };