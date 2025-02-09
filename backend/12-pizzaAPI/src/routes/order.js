"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const permissions = require("../middlewares/permissions");
const Order = require("../controllers/order");
// URL: /order
router.use(permissions.isLogin);
router.route("/").get(Order.list).post(Order.create);
router
  .route("/:id")
  .get(Order.read)
  .put(Order.update)
  .patch(Order.update)
  .delete(permissions.isAdmin, Order.delete);

/* ------------------------------------------------------- */
module.exports = router;
