"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG Project with Mongoose
------------------------------------------------------- */
/*
 * $ npm init -y
 * $ npm i express dotenv express-async-errors
 * $ npm i mongoose
 */

const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
//*SessionCookies:
// https://www.npmjs.com/package/cookie-session
// $ npm i cookie-session
const session = require("cookie-session");
app.use(
  session({
    secret: process.env.KEY || "secret_key_for_cookies",
  })
);

/* ------------------------------------------------------- */

app.use(express.json());

// DB Connection:
require("./src/dbConnection");

// SearchSortPage:
app.use(require("./src/middlewares/findsSearchSortPage"));

// HomePage:
app.all("/", (req, res) => {
  res.send("WELCOME TO BLOG APIIIIII");
});

//Routes:
app.use("/user", require("./src/routes/userRoute"));
app.use("/blog", require("./src/routes/blogRoute"));

/* ------------------------------------------------------- */

// synchoronize:
// require("./src/sync")();
// errorHandler:
app.use(require("./src/errorHandler"));

app.listen(PORT, () => console.log("Running: http://127.0.0.1:" + PORT));
