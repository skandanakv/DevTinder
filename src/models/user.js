const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 30,
            trim: true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid email address");
                }

            }
        },

        password: {
            type: String,
            required: true,
            validate(value) {
                if (!validator.isStrongPassword(value)) {
                    throw new Error("Password is not strong enough");
                
                }
            },
        },

        age: {
            type: Number,
            min: 18,
            max: 100,
        },

        gender: {
            type: String,

            validate(value) {
                if (
                    value &&
                    !["male", "female", "other"].includes(
                        value.toLowerCase()
                    )
                ) {
                    throw new Error(
                        "Gender must be either male, female or other"
                    );
                }
            },
        },

        photoUrl: {
            type: String,
            default:
                "https://sc-auetal.de/wp-content/uploads/2018/04/personal-dummy.png",
                validate(value) {
                    if (value && !validator.isURL(value)) {
                        throw new Error("Invalid URL for photo");
                    }
                }
        },

        about: {
            type: String,
            default: "This is a default about me section.",
            trim: true,
        },

        skills: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;