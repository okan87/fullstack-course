"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/Car:

const Car = require('../controllers/car')

// URL: /Cars

router.route('/')
    .get(Car.list)
    .post(Car.create)

router.route('/:id')
    .get(Car.read)
    .put(Car.update)
    .patch(Car.update)
    .delete(Car.delete)

/* ------------------------------------------------------- */
module.exports = router