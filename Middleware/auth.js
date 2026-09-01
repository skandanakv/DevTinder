 const adminAuth = (req, res, next) => {
    console.log("admin middleware");

    const token = "abc";
    const isAuthorised = token === "abc";

    if (isAuthorised) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}

//can write logic for user auth as well 
const userAuth = (req, res, next) => {
    console.log("user middleware");

    const token = "xyz";
    const isAuthorised = token === "xyz";

    if (isAuthorised) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}   

module.exports = { adminAuth, userAuth };