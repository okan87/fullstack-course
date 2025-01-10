"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
const Department = require("../models/department.model");
module.exports = {
  //! List Departments:
  list: async (req, res) => {
    const data = await res.getModelList(Department);
    res.status(200).send({
      error: false,
      data,
    });
  },
  //!Create Department:
  create: async (req, res) => {
    const data = await Department(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },
  //! Read Department:
  read: async (req, res) => {
    const data = await Department.findOne({ _id: req.params.id });
    res.status(200).send({
      error: false,
      data,
    });
  },
  //! Update Department:
  update: async (req, res) => {
    const data = await Department.updateOne({ _id: req.params.id }, req.body);
    res.status(202).send({
      error: false,
      data,
      new: await Department.findOne({ _id: req.params.id }),
    });
  },
  //! Delete Department:
  delete: async (req, res) => {
    const data = await Department.deleteOne({ _id: req.params.id });
    // const isDeleted = data.deletedCount > 0 ? true : false;
    res.status(data.deletedCount ? 204 : 404).send({
      error: data.deletedCount,
      data,
    });
  },
};
