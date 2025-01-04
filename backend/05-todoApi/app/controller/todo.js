
"use strict"

require('express-async-errors');
const Todo = require('../models/todo'); 

module.exports = {
    // LIST
    listTodos: async (req, res, next) => {
        const data = await Todo.findAndCountAll();
        res.status(200).send({
            error: false,
            result: data
        });
    },

    // CREATE
    createTodo: async (req, res, next) => {
        const { title, description } = req.body;
        const newTodo = await Todo.create({ title, description });
        res.status(201).send({
            error: false,
            message: 'Todo created successfully',
            result: newTodo
        });
    },

    // READ
    getTodo: async (req, res, next) => {
        const todo = await Todo.findByPk(req.params.id);
        if (todo) {
            res.status(200).send({
                error: false,
                result: todo
            });
        } else {
            res.status(404).send({
                error: true,
                message: 'Todo not found'
            });
        }
    },

    // UPDATE
    updateTodo: async (req, res, next) => {
        const isUpdated = await Todo.update(req.body, { where: { id: req.params.id } });
        if (isUpdated[0]) {
            const updatedTodo = await Todo.findByPk(req.params.id);
            res.status(202).send({
                error: false,
                message: 'Todo updated successfully',
                result: updatedTodo
            });
        } else {
            res.status(404).send({
                error: true,
                message: 'Todo not found'
            });
        }
    },

    // DELETE
    deleteTodo: async (req, res, next) => {
        const isDeleted = await Todo.destroy({ where: { id: req.params.id } });
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.status(404).send({
                error: true,
                message: 'Todo not found'
            });
        }
    }
};