"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- *
{
    "flightNumber": "IS-AN-001",
    "airline": "THY",
    "departure": "ISTANBUL",
    "departureDate": "2020-10-01 10:00:00",
    "arrival": "ANKARA",
    "arrivalDate": "2020-10-01 12:00:00",
    "createdId": "652ceaa1bae9cde5e8a97522"
}
{
  "flightNumber": "IS-AN-002",
  "airline": "THY",
  "departure": "ISTANBUL",
  "departureDate": "2020-10-01 23:00:00",
  "arrival": "ANTALYA",
  "arrivalDate": "2020-10-02 03:00:00",
  "createdId": "65317b1c29b1267920ddf30d"
}
/* ------------------------------------------------------- */
// Flight Model:
const FlightSchema = new mongoose.Schema({
    flightNumber:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    airline:{
        type:String,
        trim:true,
        required:true
    },
    departure:{
        type:String,
        trim:true,
        required:true
    },
    departureDate:{
        type:Date,        
        required:true
    },
    arrival:{
        type:String,
        trim:true,
        required:true
    },
    arrivalDate:{
        type:Date,        
        required:true
    },
    createdId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }

},
{ collection: 'flights', timestamps: true })

/* --------------------------------------------------------- */
// Mongoose Schema Middleware:
// https://mongoose.com/docs/midlleware.html
const dateToLocaleString = require('../helpers/dateToLocaleString')
FlightSchema.pre('init', function(document){
    // data.departureDateStr = data.departureDate.toLocaleString('nl-nl', {dateStyle:'full', timeStyle:'medium'})
    // data.arrivalDateStr = data.arrivalDate.toLocaleString('nl-nl', {dateStyle:'full', timeStyle:'medium'})
    document.departureDateStr = dateToLocaleString(document.departureDate)     
    document.arrivalDateStr = dateToLocaleString(document.arrivalDate) 
    document.__v = undefined    
})

/* --------------------------------------------------------- */
module.exports = mongoose.model('Flight', FlightSchema)