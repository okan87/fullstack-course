"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const Topping = require("../controllers/topping");
// URL: /toppings
router.route('/').get(Topping.list).post(Topping.create)
router.route('/:id').get(Topping.read).put(Topping.update).patch(Topping.update).delete(Topping.delete)

/* ------------------------------------------------------- */
module.exports = router;
