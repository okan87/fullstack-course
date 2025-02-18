"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/passenger:


const Passenger = require('../controllers/passenger')

// URL: /passengers


router.route('/')
    .get(Passenger.list)
    .post(Passenger.create)

router.route('/:id')
    .get(Passenger.read)
    .put(Passenger.update)
    .patch(Passenger.update)
    .delete(Passenger.delete)

/* ------------------------------------------------------- */
module.exports = router