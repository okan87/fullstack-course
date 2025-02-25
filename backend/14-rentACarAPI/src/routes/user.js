"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:
const {isAdmin} = require('../middlewares/permissions')
const User = require('../controllers/user')


// URL: /users
router.use(isAdmin)
router.route('/')
    .get(User.list)
    .post(User.create)

router.route('/:id')
    .get(User.read)
    .put(User.update)
    .patch(User.update)
    .delete(User.delete)

/* ------------------------------------------------------- */
module.exports = router