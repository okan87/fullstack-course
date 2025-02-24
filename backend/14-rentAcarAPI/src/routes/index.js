"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
const authentication = require('../middlewares/authentication')
/* ------------------------------------------------------- */
// routes/:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', authentication, require('./user'))
// car:
router.use('/cars', authentication, require('./car'))
// reservation:
router.use('/reservations', authentication, require('./reservation'))
// document:
router.use('/documents', authentication, require('./document'))

/* ------------------------------------------------------- */
module.exports = router