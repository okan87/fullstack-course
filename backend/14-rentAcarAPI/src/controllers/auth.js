"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const setToken = require('../helpers/setToken');
const User = require("../models/user");

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;
    if (username && password) {
      const user = await User.findOne({ username });
      if (user && await bcrypt.compare(password, user.password)) {
        if (user.isActive) {
          res.send({
            error: false,
            token: setToken(user)
          });
        } else {
          res.statusCode = 401;
          throw new Error("This account is not active");
        }
      } else {
        res.statusCode = 401;
        throw new Error("Invalid username or password");
      }
    } else {
      res.statusCode = 401;
      throw new Error("Please enter username and password");
    }
  },
  refresh: async (req, res) => {
    const refreshToken = req.body?.token?.refresh;
    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_KEY, async function (err, userData) {
        if (err) {
          res.statusCode = 401;
          throw err;
        } else {
          const { _id, password } = userData;
          if (_id && password) {
            const user = await User.findOne({ _id });
            if (user && user.password == password) {
              if (user.isActive) {
                res.send({
                  error: false,
                  token: setToken(user, true)
                });
              } else {
                res.statusCode = 401;
                throw new Error('This account is not active');
              }
            } else {
              res.statusCode = 401;
              throw new Error('Invalid ID or password');
            }
          } else {
            res.statusCode = 401;
            throw new Error('Please enter ID and password');
          }
        }
      });
    } else {
      res.statusCode = 401;
      throw new Error('Please enter refresh token');
    }
  },
  logout: async (req, res) => {
    res.send({
      error: false,
      message: 'No need any doing for logout. You must delete Bearer Token from your browser.'
    });
  },
};