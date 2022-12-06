const { bool, boolean } = require("joi");
const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  deposit: {
    type: Number,
    default : 0
  },
  role: {
    type: String,
    enum: ["BUYER", "SELLER"],
  },
});

userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);
module.exports = User;
