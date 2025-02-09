"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const permissions = require('../middlewares/permissions')
const Topping = require("../controllers/topping");
// URL: /toppings

router.use(permissions.isAdmin)
//hepsin isAdmin ekleyerek yapmaktansa bu yontem hepsini admin yapti
router.route("/").get(Topping.list).post(Topping.create);
router
  .route("/:id")
  .get(Topping.read)
  .put(Topping.update)
  .patch(Topping.update)
  .delete(Topping.delete);

/* ------------------------------------------------------- */
module.exports = router;
