"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
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
        required: true,
    },

    carId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true,
    },

    startDate: {
        type: Date,
        required: true,
    },

    endDate: {
        type: Date,
        required: true,
    },

}, { collection: 'reservations', timestamps: true })
const dateToLocaleString = require('../helpers/dateToLocaleString')

ReservationSchema.pre('init', function(document) {
    // https://www.w3schools.com/jsref/jsref_tolocalestring.asp
    // document.departureDateStr = document.departureDate.toLocaleString('tr-tr', { dateStyle: 'full', timeStyle: 'medium' })
    // document.arrivalDateStr = document.arrivalDate.toLocaleString('tr-tr', { dateStyle: 'full', timeStyle: 'medium' })
    document.startDateStr = dateToLocaleString(document.startDate)
    document.endDateStr = dateToLocaleString(document.endDate)
    document.__v = undefined
    
})

/* ------------------------------------------------------- */
module.exports = mongoose.model('Reservation', ReservationSchema)