"use strict";
/* -------------------------------------------------------
    EXPRESSJS
------------------------------------------------------- */
/*
 * npm init -y
 * npm i express dotenv
 */

/* ExpressJS Start */
const express = require("express"); // Assing expressFramework to express variable.
const app = express(); // run application on express.

/* ENV */
require("dotenv").config();
const HOST = process.env.HOST || "127.0.0.1";
const PORT = process.env.PORT || 8000;

/* ------------------------------------------------------- */
//? HTTP_Methods & URLs
// app.get("/", (req, res) => {
//   res.send("Welcome to ExpressJS");
//   res.send({ message: "called in 'get' method." });
// });
// app.post("/", (req, res) => res.send({ message: "called in 'post' method." }));
// app.put("/", (req, res) => res.send({ message: "called in 'put' method." }));
// app.delete("/", (req, res) =>
//   res.send({ message: "called in 'delete' method." })
// );
// app.all("/", (req, res) => res.send({ message: "'all' option allows to all methods." }));

//?app.route('url'):
// app.route("/route")
//   .get((req, res) => res.send("get"))
//   .post((req, res) => res.send("post"))
//   .put((req, res) => res.send("put"))
//   .delete((req, res) => res.send("delete"));

//? URL (path) options:
// app.get("/", (req, res) => res.send(`in 'root'`));
// app.get("/path", (req, res) => res.send(`in 'path'`));
//! express=urls supported JokerChar:
// app.get("/abc(x?)123", (req, res) => res.send(`in 'abc123' or 'abcx123'`));
// app.get("/abc*123", (req, res) => res.send(`in 'abc...123'`));

//? express-url supported regex
// app.get(/xyz/, (req, res) => res.send(`regex 'xyz'`))
// app.get(/^\/xyz/, (req, res) => res.send(`regex 'xyz.....'`));
// app.get(/xyz$/, (req, res) => res.send(`regex '...xyz'`));

//? URL Parameters (req.params)
// http://localhost:8000/user/40/config/delete/?key=value
// http://localhost:8000/user/40/config/dfg/asd/sdf/sdf/sdf/sdf/sdf/sdfsdf
// app.get("/user/:userId/config/:configParam/*", (req, res) => {
//   res.send({
//     userId: req.params.userId,
//     configParam: req.params.configParam,
//     url: {
//       protocol: req.protocol,
//       subdomains: req.subdomains,
//       hostname: req.hostname,
//       baseUrl: req.baseUrl,
//       params: req.params,
//       query: req.query,
//       path: req.path,
//       originalUrls: req.originalUrl,
//     }
//   });
// });

//? '\d' means only-digit-chars in regexp:
//? "[a-zA-Z]+" means only-chars in regexp:
// app.get('/user/:userId([0-9]+)', (req, res) => {
// app.get('/user/:userId(\\d+)', (req, res) => {
// app.get('/user/:userId([a-zA-Z]+)', (req, res) => {
//     res.send({
//         params: req.params
//     })
// })
// app.get('/command/:userId-:profileId', (req, res) => {
//     res.send({
//         params: req.params
//     })
// })

//? Response Methods

//? SendStatus:
// app.get('/', (req, res) => res.sendStatus(404))
//? Status:
// app.get('/', (req, res) => res.status(200).send({ message: 'OK' }))
// app.post('/', (req, res) => res.status(201).send({ message: 'Created' }))
// app.put('/', (req, res) => res.status(202).send({ message: 'Accepted' }))
// app.delete('/', (req, res) => res.status(204).send({ message: 'No Content' }))
//? JSON (.send() method already does this converting.)
// app.get('/', (req, res) => res.json([{ key: 'value' }]))
//? Download File (Download at browser):
// app.get('/download', (req, res) => res.download('./app.js', 'changedName.js'))
//? SendFile Content:
// console.log( __dirname )
// app.get('/file', (req, res) => res.sendFile(__dirname + '/app.js')) // FilePath must be realPath
//? Redirect:
// app.get('/google', (req, res) => res.redirect(301, 'https://www.google.com')) // 301 or 302
app.get("/redirect", (req, res) => res.redirect(302, "/thisPath")); // 301 or 302

/* ------------------------------------------------------- */
app.listen(PORT, HOST, () => console.log(`Running on http://${HOST}:${8000}`));
