"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose');

const dbConnection = async function () {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('* DB Connected *');
    } catch (err) {
        console.error('* DB Not Connected *', err);
        process.exit(1); // Uygulamayı sonlandır
    }
};

/* ------------------------------------------------------- */
module.exports = {
    mongoose,
    dbConnection
};