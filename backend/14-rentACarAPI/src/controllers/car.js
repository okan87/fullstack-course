"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Car Controller:

const Reservation = require('../models/reservation');
const Car = require('../models/car');

module.exports = {

    list: async (req, res, next) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "List Cars"
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
            // Filters:
        let filters = {}

        // Show only isPublish=true cars. Except Admin.
        // if (!req.user?.isAdmin) filters = { isPublish: true }
        if (!req.user?.isAdmin) filters.isPublish = true

        // List with date filter:
        // http://127.0.0.1:8000/cars?start=2023-10-13&end=2023-10-18
        const { start: getStartDate, end: getEndDate } = req.query

        if (getStartDate && getEndDate) {

            const reservedCars = await Reservation.find({
                $nor: [
                    { startDate: { $gt: getEndDate } },
                    { endDate: { $lt: getStartDate } }
                ]
            }, { _id: 0, carId: 1 }).distinct('carId')
            /*
            distinct() convert from:
            [
                { carId: new ObjectId("65352f518a9ea121b1ca5001") },
                { carId: new ObjectId("65352f518a9ea121b1ca5002") }
            ]
            to:
            [
                new ObjectId("65352f518a9ea121b1ca5001"),
                new ObjectId("65352f518a9ea121b1ca5002")
            ]
            */
            if (reservedCars.length) {
                filters._id = { $nin: reservedCars }
            }
            console.log(filters)
        }
            const data = await res.getModelList(Car,filters);
            res.status(200).send({
                error: false,
                details: await res.getModelListDetails(Car,filters),
                data
            });
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Create Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "plateNumber": "34ABC123",
                    "brand": "Ford",
                    "model": "Focus",
                    "year": 2020,
                    "isAutomatic": true,
                    "pricePerDay": 249.99
                }
            }
        */
        try {
            if(req?.user){
                req.body.createdId = req.user._id;
                req.body.updatedId = req.user._id;
            }
            const data = await Car.create(req.body);
            res.status(201).send({
                error: false,
                data
            });
        } catch (err) {
            next(err);
        }
    },

    read: async (req, res, next) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Get Single Car"
        */
        try {
            const data = await Car.findOne({ _id: req.params.id });
            res.status(200).send({
                error: false,
                data
            });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Update Car"
            #swagger.parameters['body'] = {
                in: 'body',
                required: true,
                schema: {
                    "plateNumber": "34ABC123",
                    "brand": "Ford",
                    "model": "Focus",
                    "year": 2020,
                    "isAutomatic": true,
                    "pricePerDay": 249.99
                }
            }
        */
        try {
            if(req?.user){
                req.body.createdId = req.user._id;
                req.body.updatedId = req.user._id;
            }
            const data = await Car.updateOne({ _id: req.params.id }, req.body, { runValidators: true });
            res.status(200).send({
                error: false,
                data,
                new: await Car.findOne({ _id: req.params.id })
            });
        } catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        /*
            #swagger.tags = ["Cars"]
            #swagger.summary = "Delete Car"
        */
        try {
            const data = await Car.deleteOne({ _id: req.params.id });
            res.status(data.deletedCount ? 204 : 404).send({
                error: !data.deletedCount,
                data
            });
        } catch (err) {
            next(err);
        }
    }
}