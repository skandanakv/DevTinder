const express = require("express");

const { validateSignup, validateLogin } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();


// signup
authRouter.post("/signup", async (req, res) => {

    try {

        validateSignup(req);

        const { firstName, lastName, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);

        const user = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        });

        await user.save();

        res.send("User created successfully");

    } catch (err) {

        res.status(400).send("Error creating user: " + err.message);

    }
});


// login
authRouter.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        validateLogin(req);

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send("Invalid email or password");
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(400).send("Invalid email or password");
        }

        const token = jwt.sign(
            { _id: user._id },
            "Skandana@DevTinder",
            { expiresIn: "1d" }
        );

        res.cookie("token", token, {
            expires: new Date(Date.now() + 8 * 3600000)
        });

        res.send("Login successful");

    } catch (err) {

        res.status(500).send("Error logging in: " + err.message);

    }
});


module.exports = authRouter;