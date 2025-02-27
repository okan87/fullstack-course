"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection');

/* ------------------------------------------------------- *
{
    "plateNumber": "34ABC123",
    "brand": "Ford",
    "model": "Focus",
    "year": 2020,
    "isAutomatic": true,
    "pricePerDay": 249.99,
    "isPublish":true,
    "createdId":"67c0d77b26eedee04c9654ef",
    "updatedId":"67c0d77b26eedee04c9654ef"
}
{
    "plateNumber": "34ABC234",
    "brand": "Renault",
    "model": "Megane",
    "year": 2022,
    "isAutomatic": false,
    "pricePerDay": 199.99,
    "isPublish":true,
    "createdId":"67c0d77b26eedee04c9654ef",
    "updatedId":"67c0d77b26eedee04c9654ef"
}
{
    "plateNumber": "34ABC345",
    "brand": "Opel",
    "model": "Astra",
    "year": 2021,
    "isAutomatic": false,
    "pricePerDay": 189.99,
    "isPublish": false,
    "createdId":"67c0d77b26eedee04c9654ef",
    "updatedId":"67c0d77b26eedee04c9654ef"
}
/* ------------------------------------------------------- */
// Car Model:

const CarSchema = new mongoose.Schema({
    plateNumber: {
        type: String,
        trim: true,
        required: [true, 'Plate number is required.'],
        unique: [true, 'Plate number must be unique.']
    },
    brand: {
        type: String,
        trim: true,
        required: [true, 'Brand is required.']
    },
    model: {
        type: String,
        trim: true,
        required: [true, 'Model is required.']
    },
    year: {
        type: Number,
        required: [true, 'Year is required.'],
        min: [2000, 'Year must be at least 2000.']
    },
    isAutomatic: {
        type: Boolean,
        default: false
    },
    pricePerDay: {
        type: Number,
        required: [true, 'Price per day is required.']
    },
    isPublish: {
        type: Boolean,
        default: true
    },
    createdId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Created ID is required.']
    },
    updatedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Updated ID is required.']
    }
}, { collection: 'cars', timestamps: true });

/* ------------------------------------------------------- */
module.exports = mongoose.model('Car', CarSchema);