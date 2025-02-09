"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
const permissions = require("../middlewares/permissions");
const User = require("../controllers/user");
// URL: /users
router.route("/").get(permissions.isAdmin, User.list).post(User.create);
router
  .route("/:id")
  .get(permissions.isLogin, User.read)
  .put(permissions.isLogin, User.update)
  .patch(permissions.isLogin, User.update)
  .delete(permissions.isAdmin, User.delete);

/* ------------------------------------------------------- */
module.exports = router;
