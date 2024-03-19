// firstname,last name,email,phone number,password
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    leftCount: {
      type: Number,
      required: true,
    },
    warehouse: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

const ProductModel = mongoose.model("product", ProductSchema);
module.exports = ProductModel;
