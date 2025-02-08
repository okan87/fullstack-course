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
      enum:['Small', 'Medium', 'Large', 'Xlarge']
    },
    quantity: {
        //push,pull
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topping'
      },
    price: {
        type: Number,
        required: true
      },
    totalPrice: {
        type:Number
      },
    
  },
  { collection: "orders", timestamps: true }
);
module.exports = mongoose.model("Order", OrderSchema);
