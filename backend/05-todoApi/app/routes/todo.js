"use strict";
/* -------------------------------------------------------
    EXPRESSJS - TODO Project with Sequelize
------------------------------------------------------- */
const router = require('express').Router();

//? Call the TODO controller
const todoController = require('../controller/todo');

router.route('/')
    .get(todoController.listTodos)
    .post(todoController.createTodo);

router.route('/:id')
    .get(todoController.getTodo)
    .put(todoController.updateTodo)
    .delete(todoController.deleteTodo);

module.exports = router;