"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
// JWT
// npm i jsonwebtoken

const jwt = require("jsonwebtoken");
const Personnel = require("../models/personnel.model");
const checkUserAndSetToken = require("../helpers/checkUserAndSetToken");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags=['Authhentication']
            #swagger.summary = 'JWT:Login'
            #swagger.description = 'Login with username and password'
            _swagger.depricated= true
            _swagger.ignore= true
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                    username:'test',
                    password:'1234'
                }
             
            }
        */

    const checkUser = await checkUserAndSetToken(req.body);
    if (checkUser.error) {
      res.errorStatusCode = 401;
      throw new Error(checkUser.message);
    } else {
      res.send(checkUser);
    }
  },

  refresh: async (req, res) => {
    /*
            #swagger.tags=['Authhentication']
            #swagger.summary = 'JWT:Refresh'
            #swagger.description = 'Refresh accessToken with refreshToken'
            #swagger.parameters['body'] = {
                in:'body',
                required:true,
                schema:{
                   token:{
                    refresh: '...refreshToken...'
                   }
                }
             
            }
            */

    const refreshToken = req.body?.token?.refresh || null;

    if (refreshToken) {
      const jwtData = jwt.verify(refreshToken, process.env.REFRESH_KEY);

      if (jwtData) {
        const checkUser = await checkUserAndSetToken(jwtData, false);
        if (checkUser.error) {
          res.errorStatusCode = 401;
          throw new Error(checkUser.message);
        } else {
          res.send(checkUser);
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wroong JWT Token");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please entry token.refresh");
    }
  },

  logout: async (req, res) => {
    /*
            #swagger.tags=['Authhentication']
            #swagger.summary = 'JWT:Logout'
            #swagger.description = 'No need any doing for logout, you must deleted Bearer Token from your browser.'
        */
    res.send({
      error: false,
      message:
        "No need any doing for logout. You must deleted Bearer Token from your browser.",
    });
  },
};
