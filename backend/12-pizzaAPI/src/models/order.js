"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const { mongoose } = require("../configs/dbConnection");
/* ------------------------------------------------------- */
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    pizzaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Pizza',
      required:true
    },
    size: {
      type: String,
      required: true,
      enum:['small', 'medium', 'large', 'xlarge']
    },
    quantity: {
        //push,pull

        type: Number,
        default: 1
      },
    price: {
        type: Number,
        default:0
        // required: true
      },
    totalPrice: {
        type:Number
      },
    
  },
  { collection: "orders", timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
