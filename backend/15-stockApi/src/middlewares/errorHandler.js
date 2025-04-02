"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// app.use(errorHandler):

module.exports = (err, req, res, next) => {
    // Hata loglama
    console.error(`[${new Date().toISOString()}]`, err);

    // Hata yanıtı
    return res.status(res?.errorStatusCode || err.status || 500).send({
        error: true,
        message: err.message || "Internal Server Error",
        cause: err.cause || null,
        body: req.body || null,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined // Sadece geliştirme ortamında stack döndür
    });
};