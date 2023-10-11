const { Schema, model } = require("mongoose");

const todosScema = new Schema(
  {
    userID: {
      type: String,
      index: true,
    },
    todo: {
      type: String,
      default: "",
    },
    isDone: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todos = model("todos", todosScema);
module.exports = Todos;
