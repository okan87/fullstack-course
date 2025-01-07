"use strict";

const mongoose = require("mongoose");
const passwordEncrypt = require("../helpers/passwordEncrypt");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
      validate: [
        (email) => {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
        },
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is required"],
      set: (password) => passwordEncrypt(password)
    },
    firstName: String,
    lastName: String,
  },
  {
    collection: "users",
    timestamps: true,
  }
);
module.exports = mongoose.model("User", UserSchema);
