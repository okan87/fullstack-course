"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
/*
    $ mkdir logs
    $ cp .env-sample .env
    $ npm init -y
    $ npm i express dotenv mongoose express-async-errors
    $ npm i jsonwebtoken morgan
*/
const express = require('express')
const app = express()

/* ------------------------------------------------------- */
// Required Modules:

//! envVariables to process.env:
require('dotenv').config()
const PORT = process.env?.PORT || 8000

//! asyncErrors to errorHandler:
require('express-async-errors')

/* ------------------------------------------------------- */
//! Configrations:

// Connect to DB:
const { dbConnection } = require('./src/configs/dbConnection')
dbConnection()

/* ------------------------------------------------------- */
//! Middlewares:
// Accept JSON:
app.use(express.json())

// accessTokenControl

app.use(require('./src/middlewares/authentication'))
// RunLogger
app.use(require('./src/middlewares/logger'))


// res.getModelList()
app.use(require('./src/middlewares/findSearchSortPage'))



/* ------------------------------------------------------- */
//! Routes:
// HomePath
app.all('/', (req,res)=>{
    res.send({
        error:false,
        message:"Welcome to Pizza Api",
        isLogin:req.isLogin,
        user:req.user
    })
})
// auth
app.use('/auth', require('./src/routes/auth'))
// User
app.use('/users', require('./src/routes/user'))
// Pizza
app.use('/pizzas', require('./src/routes/pizza'))
// Toppings
app.use('/toppings', require('./src/routes/topping'))
// Orders
app.use('/orders', require('./src/routes/order'))



/* ------------------------------------------------------- */

//! errorHandler:
app.use(require('./src/middlewares/errorHandler'))

//! RUN SERVER:
app.listen(PORT, () => console.log('http://127.0.0.1:' + PORT))

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')()