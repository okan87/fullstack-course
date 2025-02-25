"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- *
{
    "username": "admin",
    "password": "Test*123456789",
    "email": "admin@site.com",
    "firstName": "admin",
    "lastName": "admin",
    "isActive": true,
    "isAdmin": true
}
{
    "username": "test",
    "password": "Test*123456789",
    "email": "test@site.com",
    "firstName": "test",
    "lastName": "test",
    "isActive": true,
    "isAdmin": false
}
/* ------------------------------------------------------- */
// User Model:

const passwordEncrypt = require("../helpers/passwordEncrypt");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      require: true,
    //   select:false,
      set: (password) => passwordEncrypt(password),
    },
    email: {
      type: String,
      trim: true,
      required: [true, "Email field must be required."],
      unique: [true, "There is this email. Email field must be unique."],
      validate: [
        (email) => {
          const emailRegexCheck =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegexCheck.test(email);
        },
        "Email type is not correct.",
      ],
    },
    firstName: {
      type: String,
      trim: true,
      require: true,
    },
    lastName: {
      type: String,
      trim: true,
      require: true,
    },
    isActive: {
      type: Boolean,
      require: true,
    },
    isAdmin: {
        type: Boolean,
        require: true,
    },
  },
  { collection: "users", timeStamp: true }
);
/* ------------------------------------------------------- */
module.exports = mongoose.model("User", UserSchema);
