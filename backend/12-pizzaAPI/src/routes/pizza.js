"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const Pizza = require("../controllers/pizza");
// URL: /pizzas
router.route('/').get(Pizza.list).post(Pizza.create)
router.route('/:id').get(Pizza.read).put(Pizza.update).patch(Pizza.update).delete(Pizza.delete)

/* ------------------------------------------------------- */
module.exports = router;
