"use strict";

//catch and handle errors in async functions
require("express-async-errors");

const { count } = require("console");
const { BlogCategory, BlogPost } = require("../models/blogModel");

/* -------------------------------------------------------
  *BlogCategory
------------------------------------------------------- */
module.exports.BlogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find();
    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      result: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogCategory.findOne({ _id: req.params.categoryId });
    // const data = await BlogCategory.findById(req.params.categoryId);
    res.status(200).send({
      error: false,
      result: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
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
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    res.send.status;
    res.sendStatus(data.deletedCount > 0 ? 204 : 404);
  },
};

/* -------------------------------------------------------
  *BlogPost
------------------------------------------------------- */
module.exports.BlogPost = {
  list: async (req, res,next) => {
    //! Searching & Sorting & Pagination
    
    //* Searching: URL?search[key1]=value1&search[key2]=value2

    //? http://127.0.0.1:8000/blog/post?search[title]=123&search[content]=12312&sort[title]=1&sort[content]=-1&page=5&limit=20
    const search = req.query?.search || {};
    // console.log(search);
    // http://wwww.mongodb.com/docs/manual/reference/operator/query/regex/
    for (let key in search) {
      search[key] = { $regex: search[key], $options: "i" };
    }
    // console.log(search);


    //* Sorting: URL?sort[key1]=1&sort[key2]=-1
    const sort = {};
    if (req.query.sort) {
        for (let key in req.query.sort) {
            sort[key] = parseInt(req.query.sort[key]);
        }
    }
    // console.log(sort)


    //* Pagination: URL?page=5&limit=20
    const page = parseInt(req.query?.page) || 1;
    const limit = parseInt(req.query?.limit) || parseInt(process.env.PAGE_SIZE) || 20;  
    const skip = (page - 1) * limit; 


    try {
      const data = await BlogPost.find(search)
          .sort(sort)
          .skip(skip)
          .limit(limit);
      res.status(200).json(data);
  } catch (error) {
      // res.status(500).json({ error: error.message });
      next(error);
  }
















    // const data = await BlogPost.find(search);

    console.log(req.query);

    // const data = await BlogPost.find().populate("blogCategoryId");
    res.status(200).send({
      error: false,
      count: data.length,
      result: data,
    });
  },
  listByCategory: async (req, res) => {
    const data = await BlogPost.find({
      blogCategoryId: req.params.categoryId,
    }).populate("blogCategoryId");
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
