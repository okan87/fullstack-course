"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/passenger:

const {isStaffOrAdmin} = require('../middlewares/permissions')
const Passenger = require('../controllers/passenger')

// URL: /passengers

router.use(isStaffOrAdmin)
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