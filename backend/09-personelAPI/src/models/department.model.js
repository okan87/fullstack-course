"use strict"
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const { mongoose } = require('../configs/dbConnection')
/* ------------------------------------------------------- */

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
    
}, {collection: 'departments', timestamps: true})

module.exports = mongoose.model('Department', DepartmentSchema)
/* ------------------------------------------------------- */