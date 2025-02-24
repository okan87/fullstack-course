"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// $ npm i jsonwebtoken
// app.use(authentication):

const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const auth = req.headers?.authorization;
  const accessToken = auth ? auth.split(" ")[1] : null;
  req.isLogin = false;
  req.user = null;
  if (!accessToken) {
    return res
      .status(401)
      .send({ error: true, message: "Access token is missing" });
  }
  jwt.verify(accessToken, process.env.ACCESS_KEY, function (err, userData) {
    if (err) {
      return res.status(401).send({ error: true, message: "Invalid token" });
    }
    if (userData && userData.isActive) {
      req.isLogin = true;
      req.user = userData;
    } else {
      return res
        .status(401)
        .send({ error: true, message: "User is not active" });
    }
    next();
  });
};
