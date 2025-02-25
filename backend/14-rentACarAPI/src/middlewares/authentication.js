"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i jsonwebtoken
// app.use(authentication):

const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {

    const auth = req.headers?.authorization || null
    const accessToken = auth ? auth.split(' ')[1] : null

    jwt.verify(accessToken, process.env.ACCESS_KEY, (err, userData) => {
        if (err) {
            res.status(401).send({ error: true, message: 'Invalid or expired token' });
        } else {
            req.user = userData;
            // Add createdID for all req.body:
            req.body.createdId = req.user?._id
            req.body.updatedId = req.user?._id
            next();
        }
    });
}