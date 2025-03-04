"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Auth Controller:

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const setToken = require("../helpers/setToken");
module.exports = {
  login: async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });

      if (!user) {
        res.errorStatusCode = 401;
        return next(new Error("Wrong username or password."));
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.errorStatusCode = 401;
        return next(new Error("Wrong username or password."));
      }

      const tokens = setToken(user);
      res.status(200).send({ error: false, ...tokens });
    } catch (err) {
      next(err);
    }
  },
  refresh: async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res.errorStatusCode = 401;
        return next(
          new Error("Authentication failed: No refresh token provided.")
        );
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_KEY,
        async (err, userData) => {
          if (err) {
            res.errorStatusCode = 401;
            return next(
              new Error("Authentication failed: Invalid refresh token.")
            );
          }

          const user = await User.findById(userData._id);
          if (!user) {
            res.errorStatusCode = 401;
            return next(new Error("Authentication failed: User not found."));
          }

          const tokens = setToken(user, true);
          res.status(200).send({ error: false, ...tokens });
        }
      );
    } catch (err) {
      next(err);
    }
  },
  logout: async (req, res, next) => {
    // Logout logic here
    res.status(200).send({ error: false, message: "Logout successful" });
  },
};
