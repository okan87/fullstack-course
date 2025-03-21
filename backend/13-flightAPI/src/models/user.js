"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
  "username": "test",
  "password": "test",
  "email": "test@test.com",
  "isActive": true,
  "isStaff": false,
  "isAdmin": false
}
{
  "username": "staff",
  "password": "test",
  "email": "staff@test.com",
  "isActive": true,
  "isStaff": true,
  "isAdmin": false
}
{
  "username": "admin",
  "password": "test",
  "email": "admin@test.com",
  "isActive": true,
  "isStaff": true,
  "isAdmin": true
}
/* ------------------------------------------------------- */
// User Model:

const passwordEncrypt = require('../helpers/passwordEncrypt')

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },

    password: {
        type: String,
        trim: true,
        required: true,
        // select: false,
        set: (password) => passwordEncrypt(password),
    },

    email: {
        type: String,
        trim: true,
        required: [true, 'Email field must be required.'],
        unique: [true, 'There is this email. Email field must be unique.'],
        validate: [
            (email) =>  {
                const emailRegexCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                return emailRegexCheck.test(email)
            },
            'Email type is not correct.'
        ]
    },

    isActive: {
        type: Boolean,
        default: true
    },

    isStaff: {
        type: Boolean,
        default: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

}, { collection: 'users', timestamps: true })

/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema)