"use strict";

/* ExpressJS Start */
const express = require("express"); // Assing expressFramework to express variable.
const app = express(); // run application on express.

/* ENV */
require("dotenv").config();
const PORT = process.env.PORT || 8000;

/* ---------------------------------------------------- */

app.get("/user/:id", (req, res) => {
  const id = req.params.id ?? 0;

  if (isNaN(id)) {
    res.statusCode = 400;
    throw new Error("ID is Not A Number", { cause: "params.id=" + id });
  } else {
    res.send({
      id: id,
    });
  }
  //   try {
  //     const id = req.params.id ?? 0;
  //     if (isNaN(id)) {
  //       throw new Error("ID is Not A Number", { cause: "params.id=" + id });
  //     } else {
  //       res.send({
  //         error: false,
  //         id: id,
  //       });
  //     }
  //   } catch (err) {
  //     res.send({ error: true, message: err.message, cause: err.cause });
  //   }
});

/* ---------------------------------------------------- */
//? if you method has 4parameter, and then first parameter is errorSect
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ?? 500;
  console.log("errorHandler runned");
  res.status(statusCode).send({
    error: true,
    message: err.message,
    cause: err.cause,
    // stack:err.stack
  });
};
app.use(errorHandler);
/* ---------------------------------------------------- */

app.listen(PORT, () => console.log(`Running: http://127.0.0.1:` + PORT));
