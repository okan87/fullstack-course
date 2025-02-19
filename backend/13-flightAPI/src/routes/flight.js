"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/flight:
const permissions = require('../middlewares/permissions')
const Flight = require('../controllers/flight')

// URL: /users
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