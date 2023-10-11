const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      default: "",
      unique: true,
    },
    password: {
      type: String,
      default: "",
    },
    tokens: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const User = model("allusers", userSchema);
module.exports = User;
