"use strict";
/* -------------------------------------------------------
 !   EXPRESSJS -- MIDDLEWARES
------------------------------------------------------- */

/* ExpressJS Start */
const express = require("express"); // Assing expressFramework to express variable.
const app = express(); // run application on express.

/* ENV */
require("dotenv").config();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
//? Middleware functions hast must be minimum three parameters.
//? Last parameter is for next()
/* ------------------------------------------------------- */
//* next() for next function
/* ------------------------------------------------------- */
// app.get("/", (req, res, next) => {
//   //! I can send parameter with next() method
//   req.customData = "Custom Data";
//   res.customDataWithResponse = "Custom Data With Response";
// //!   the purpose of next() method is jumping to the next function
// next();
// res.send({
//     message: "Middleware running",
// });
// });

// app.get("/", (req, res) => {
//   res.send({
//     customData: [req.customData, res.customDataWithResponse],
//     message: "Welcome",
//   });
// });

/* ------------------------------------------------------- */
//* next() for next CallBackFunction
/* ------------------------------------------------------- */

// const middlewareFunction1 = (req, res, next) => {
  
//   req.customData = "Custom Data";
//   res.customDataWithResponse = "Custom Data With Response";
//   next();
// };
// const middlewareFunction2 = (req, res, next) => {
//   // next()
//   res.send({
//     customData: [req.customData, res.customDataWithResponse],
//     message: "Here is func2, first next() runned, nut second not",
//   });
// };

// // app.get("/", middlewareFunction1, middlewareFunction2, (req, res) => {
// //! Best practice is array using
// app.get("/", [middlewareFunction1, middlewareFunction2], (req, res) => {
//   res.send({
//     customData: [req.customData, res.customDataWithResponse],
//     message: "Welcome to Home",
//   });
// });

/* ------------------------------------------------------- */
//* The next using for go to the next GET route
/* ------------------------------------------------------- */

// const middlewareFunction1 = (req, res, next) => {
//   const skip = req.query.skip ?? false;
//   req.customData = "Custom Data";
//   res.customDataWithResponse = "Custom Data With Response";
//   skip ? next("route") : next();
// };
// const middlewareFunction2 = (req, res, next) => {
//   res.send({
//     customData: [req.customData, res.customDataWithResponse],
//     message: "Here is func2, first next() runned, nut second not",
//   });
// };

// app.get("/", [middlewareFunction1, middlewareFunction2], (req, res) => {
//   res.send({
//     customData: [req.customData, res.customDataWithResponse],
//     message: "Welcome to Home",
//   });
// });

// app.get("/", (req, res) => {
//   res.send({
//     message: "next route",
//   });
// });

/* ------------------------------------------------------- */
//* Middlewares and USE
/* ------------------------------------------------------- */
// const middlewareFunction1 = (req, res, next) => {
//   const skip = req.query.skip ?? false;
//   req.customData = "Custom Data";
//   res.customDataWithResponse = "Custom Data With Response";
//   skip ? (console.log("next-route worked"), next("route")) : (console.log('next worked'), next());
// };

// // app.use(middlewareFunction1) // default url = *
// app.use('/', middlewareFunction1)
// app.get("/", (req, res) => {
//   res.send({
//     message: "first route",
//   });
// });


/* ------------------------------------------------------- */
//* Calling middlewares from file
/* ------------------------------------------------------- */

// const [middlewareFunction1, middlewareFunction2] = require('./middlewares/index.js')
// const [middlewareFunction1, middlewareFunction2] = require('./middlewares/index')
// const [middlewareFunction1, middlewareFunction2] = require('./middlewares/')
// app.use(middlewareFunction1,middlewareFunction2)

// const middleFunctions = (require('./middlewares/'))
// app.use(middleFunctions)

// app.use(require('./middlewares/'))

// app.get("/", (req, res) => {
//   res.send({
//         message: "Welcome to Home",
//   });
// });




/* ------------------------------------------------------- */
app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${8000}`));
