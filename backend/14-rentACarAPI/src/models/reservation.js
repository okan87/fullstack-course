"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection');

/* ------------------------------------------------------- *
{
    "userId": "65343222b67e9681f937f001",
    "carId": "65352f518a9ea121b1ca5001",
    "startDate": "2023-10-10",
    "endDate": "2023-10-16"
}
{
    "userId": "65343222b67e9681f937f002",
    "carId": "65352f518a9ea121b1ca5002",
    "startDate": "2023-10-14",
    "endDate": "2023-10-20"
}
/* ------------------------------------------------------- */
// Reservation Model:

const ReservationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required.'],
    },
    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: [true, 'Car ID is required.'],
    },
    startDate: {
        type: Date,
        required: [true, 'Start date is required.'],
        validate: {
            validator: function (value) {
                return !isNaN(Date.parse(value));
            },
            message: 'Invalid start date format.'
        }
    },
    endDate: {
        type: Date,
        required: [true, 'End date is required.'],
        validate: {
            validator: function (value) {
                return !isNaN(Date.parse(value));
            },
            message: 'Invalid end date format.'
        }
    },
}, { collection: 'reservations', timestamps: true });
/* ------------------------------------------------------- */
const dateToLocaleString = require('../helpers/dateToLocaleString')

ReservationSchema.pre('init', function(document) {
    // https://www.w3schools.com/jsref/jsref_tolocalestring.asp
    // document.startDateStr = document.departureDate.toLocaleString('nl-nl', { dateStyle: 'full', timeStyle: 'medium' })
    // document.arrivalDateStr = document.arrivalDate.toLocaleString('nl-nl', { dateStyle: 'full', timeStyle: 'medium' })
    document.startDateStr = dateToLocaleString(document.startDate)
    document.endDateStr = dateToLocaleString(document.endDate)
    document.__v = undefined
})
/* ------------------------------------------------------- */
module.exports = mongoose.model('Reservation', ReservationSchema);