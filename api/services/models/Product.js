const { bool, boolean } = require("joi");
const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      unique: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    amountAvailable: {
      type: Number,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
    toJSON: {
      transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

productSchema.plugin(uniqueValidator);
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
