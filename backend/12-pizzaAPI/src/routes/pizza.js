"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const permissions = require("../middlewares/permissions");
const Pizza = require("../controllers/pizza");
// URL: /pizzas
router.route("/").get(Pizza.list).post(permissions.isAdmin, Pizza.create);
router
  .route("/:id")
  .get(Pizza.read)
  .put(permissions.isAdmin, Pizza.update)
  .patch(permissions.isAdmin, Pizza.update)
  .delete(permissions.isAdmin, Pizza.delete);


router.put('/:id/pushToppings', permissions.isAdmin, Pizza.pushToppings)
router.put('/:id/pullToppings', permissions.isAdmin, Pizza.pullToppings)
/* ------------------------------------------------------- */
module.exports = router;
