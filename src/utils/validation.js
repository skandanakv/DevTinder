const validator=require("validator");

const validateSignup=(req)=>{
    const{firstName,lastName,email,password}=req.body;

    if(!firstName || !lastName){
        throw new Error("First name and last name are required");
    }else if(firstName.length<3 || firstName.length>30){
        throw new Error("First name must be between 3 and 30 characters");
    }else if(!email){
        throw new Error("Email is required");
    }else if(!validator.isEmail(email)){
        throw new Error("Invalid email address");
    }else if(!password){
        throw new Error("Password is required");
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough");
    }

}

const validateLogin=(req)=>{
    const{email,password}=req.body;

    if(!email){
        throw new Error("Email is required");
    }else if(!validator.isEmail(email)){
        throw new Error("Invalid email address");
    }else if(!password){
        throw new Error("Password is required");
    }
}

const validateEditProfileData=(req)=>{
    const AllowedEditFields=["firstName","lastName","age","gender","about","skills" ]; 

    const isEditAllowed = Object.keys(req.body).every(field=> 
    AllowedEditFields.includes(field));

    if(!isEditAllowed){
        throw new Error("Invalid edit fields");
    }
}




module.exports={
    validateSignup, validateLogin, validateEditProfileData
}