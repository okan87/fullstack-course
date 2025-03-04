"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/Car:
const permissions = require('../middlewares/permissions')
const Car = require('../controllers/car')

// URL: /Cars

router.route('/')
    .get(Car.list)
    .post(permissions.isAdmin, Car.create)

router.route('/:id')
    .get(Car.read)
    .put(permissions.isAdmin,Car.update)
    .patch(permissions.isAdmin,Car.update)
    .delete(permissions.isAdmin,Car.delete)

/* ------------------------------------------------------- */
module.exports = router