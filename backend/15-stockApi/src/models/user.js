"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection');
const passwordEncrypt = require('../helpers/passwordEncrypt');

/* ------------------------------------------------------- *
{
    "username": "admin",
    "password": "aA*123456",
    "email": "admin@site.com",
    "first_name": "admin",
    "last_name": "admin",
    "is_active": true,
    "is_staff": true,
    "is_superadmin": true
}
{
    "username": "staff",
    "password": "aA*123456",
    "email": "staff@site.com",
    "first_name": "staff",
    "last_name": "staff",
    "is_active": true,
    "is_staff": true,
    "is_superadmin": false
}
{
    "username": "test",
    "password": "aA*123456",
    "email": "test@site.com",
    "first_name": "test",
    "last_name": "test",
    "is_active": true,
    "is_staff": false,
    "is_superadmin": false
}
/* ------------------------------------------------------- */
// User Model:

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
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'Email field must be required.'],
        unique: [true, 'There is this email. Email field must be unique.'],
        validate: [
            (email) => {
                const emailRegexCheck = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return emailRegexCheck.test(email);
            },
            'Email type is not correct.'
        ]
    },
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isStaff: {
        type: Boolean,
        default: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
}, { collection: 'users', timestamps: true });

/* ------------------------------------------------------- */
// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            this.password = await passwordEncrypt(this.password);
            next();
        } catch (err) {
            next(err);
        }
    } else {
        next();
    }
});

/* ------------------------------------------------------- */
// Check if email is unique before saving the user
UserSchema.pre('save', async function (next) {
    if (this.isModified('email') || this.isNew) {
        try {
            const existingUser = await mongoose.models.User.findOne({ email: this.email });
            if (existingUser) {
                const error = new Error('Email already exists');
                error.status = 400;
                return next(error);
            }
        } catch (err) {
            return next(err);
        }
    }
    next();
});

/* ------------------------------------------------------- */
module.exports = mongoose.model('User', UserSchema);