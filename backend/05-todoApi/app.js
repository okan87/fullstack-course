"use strict";
/* ---------------------------------------------------------
*    EXPRESSJS - TODO Project with Sequelize
---------------------------------------------------------- */
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
//? Accept json data & convert to object:
app.use(express.json());

//? Router:
app.use(require("./app/routes/todo"));

//? errorHandler (catcherrors):
app.use(require("./app/errorHandler"));

/* ------------------------------------------------------- */
app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
