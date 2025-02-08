"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const Order = require("../controllers/order");
// URL: /order
router.route('/').get(Order.list).post(Order.create)
router.route('/:id').get(Order.read).put(Order.update).patch(Order.update).delete(Order.delete)

/* ------------------------------------------------------- */
module.exports = router;
