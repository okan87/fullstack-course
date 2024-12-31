"use strict";
/* -------------------------------------------------------
    * ROUTERS - ERRORS
------------------------------------------------------- */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ---------------------------------------------------- */
//? "Router" is a special app for URL control in expressJS


const router = express.Router()
app.get("/", (req, res) => {
  res.send({
    message: "Home Page",
  });
});
app.get("/about", (req, res) => {
  res.send({
    message: "About Page",
  });
});
app.get("/user/:userId", (req, res) => {
  res.send({
    message: "User Page",
  });
});

//* Route to app
app.use(router)

/* ---------------------------------------------------- */
app.listen(PORT, () => console.log(`Running: http://127.0.0.1:` + PORT));
