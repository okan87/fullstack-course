"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/flight:

const permissions = require('../middlewares/permissions')
const Flight = require('../controllers/flight')

// URL: /flights

// router.route('/')
//     .get(permissions.isStaffOrAdmin, flight.list)
//     .post(permissions.isStaffOrAdmin, flight.create)

// router.route('/:id')
//     .get(permissions.isStaffOrAdmin, flight.read)
//     .put(permissions.isStaffOrAdmin, flight.update)
//     .patch(permissions.isStaffOrAdmin, flight.update)
//     .delete(permissions.isAdmin, flight.delete)

router.use(permissions.isStaffOrAdmin)

router.route('/')
    .get(Flight.list)
    .post(Flight.create)

router.route('/:id')
    .get(Flight.read)
    .put(Flight.update)
    .patch(Flight.update)
    .delete(permissions.isAdmin, Flight.delete)

/* ------------------------------------------------------- */
module.exports = router