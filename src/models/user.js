const mongoose = require("mongoose");

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
        },

        password: {
            type: String,
            required: true,
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