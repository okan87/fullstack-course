"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// User Controller:

const User = require("../models/user");

module.exports = {
  list: async (req, res, next) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "List Users"
            #swagger.description = `
                You can send query with endpoint for search[], sort[], page and limit.
                <ul> Examples:
                    <li>URL/?<b>search[field1]=value1&search[field2]=value2</b></li>
                    <li>URL/?<b>sort[field1]=1&sort[field2]=-1</b></li>
                    <li>URL/?<b>page=2&limit=1</b></li>
                </ul>
            `
        */
    try {
      const data = await res.getModelList(User);
      res.status(200).send({
        error: false,
        details: await res.getModelListDetails(User),
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  create: async (req, res, next) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Create User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "Test*123456789",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */
    try {
      // Disallow set admin:
      req.body.isAdmin = false;
      const data = await User.create(req.body);
      res.status(201).send({
        error: false,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  read: async (req, res, next) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Get Single User"
        */
    try {
      let filters = {};
      if (!req.user?.isAdmin) filters = { _id: req.user._id };
      const data = await User.findOne({ _id: req.params.id, ...filters });
      res.status(200).send({
        error: false,
        data,
      });
    } catch (err) {
      next(err);
    }
  },

  update: async (req, res, next) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Update User"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "username": "test",
                    "password": "Test*123456789",
                    "email": "test@site.com",
                    "isActive": true,
                    "isStaff": false,
                    "isAdmin": false,
                }
            }
        */
    try {
      let filters = {};
      if (!req.user?.isAdmin) {
        filters = { _id: req.user._id };
        req.body.isAdmin = false;
      }
      const data = await User.updateOne({ _id: req.params.id }, req.body, {
        runValidators: true,
      });
      res.status(202).send({
        error: false,
        data,
        new: await User.findOne({ _id: req.params.id }),
      });
    } catch (err) {
      next(err);
    }
  },

  delete: async (req, res, next) => {
    /*
            #swagger.tags = ["Users"]
            #swagger.summary = "Delete User"
        */
    try {
      const data = await User.deleteOne({ _id: req.params.id });
      res.status(data.deletedCount ? 204 : 404).send({
        error: !data.deletedCount,
        data,
      });
    } catch (err) {
      next(err);
    }
  },
};
