"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require('mongoose');

const dbConnection = async function () {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`[${new Date().toISOString()}] * DB Connected *`);
    } catch (err) {
        console.error(`[${new Date().toISOString()}] * DB Not Connected *`, err);

        // Hata yönetimi için errorHandler'a uygun bir hata nesnesi oluştur
        const error = new Error("Database connection failed");
        error.cause = err.message;
        error.stack = err.stack;
        error.status = 500;

        // Uygulamayı sonlandır
        throw error; // Hata, üst seviyede yakalanabilir
    }
};

/* ------------------------------------------------------- */
module.exports = {
    mongoose,
    dbConnection
};