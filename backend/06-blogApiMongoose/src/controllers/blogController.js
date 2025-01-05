"use strict";

//catch and handle errors in async functions
require("express-async-errors");

const { count } = require("console");
const { BlogPost } = require("../models/blogModel");

module.exports.BlogPost = {
  list: async (req, res) => {
    const data = await BlogPost.find();
    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogPost.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogPost.findOne({ _id: req.params.postId });
    // const data = await BlogPost.findById(req.params.postId);
    res.status(200).send({
      error: false,
      result: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogPost.updateOne(
      { _id: req.params.postId },
      req.body,
      { new: true }
    );
    res.status(202).send({
      error: false,
      body: req.body,
      result: data,
    });
  },
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId });
    res.send.status;
    res.sendStatus(data.deletedCount > 0 ? 204 : 404);
  },
};
