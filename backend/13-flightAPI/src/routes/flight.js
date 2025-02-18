"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const Flight = require('../controllers/flight')

// URL: /users

router.route('/')
.get(Flight.list)
.post(Flight.create)

router.route('/:id')
.get(Flight.read)
.put(Flight.update)
.patch(Flight.update)
.delete(Flight.delete)

/* ------------------------------------------------------- */
module.exports = router