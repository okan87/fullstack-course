"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
/*
    $ npm i express dotenv mongoose express-async-errors
    $ npm i cookie-session
    $ npm i jsonwebtoken
*/

const express = require("express");
const { dbConnection } = require("./src/configs/dbConnection");
const app = express();

/* ------------------------------------------------------- */
/! ------------------------------------------------------- */;
//!Required Modules:
//env:
require("dotenv").config();
const PORT = process.env.PORT || 8000;
//async errors:
require("express-async-errors");
//* Configurations:
//dbConnection:
require("./src/configs/dbConnection")();
dbConnection();
// middlewares:
// accept JSON:
app.use(express.json());
//session-cookie:
app.use(require("cookie-session")({ secret: process.env.SECRET_KEY }));
//res.getModelList:
app.use(require("./src/middlewares/findSearchSortPage"));
// Routes:
app.all("/", (req, res) =>
  res.send({ error: false, message: "Welcome to Personnel API!" })
);
/! ------------------------------------------------------- */;

// continue from here...

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()
