var express = require("express");
var todosRouter = express.Router();
const { validateToken } = require("../middlewares/auth");

const { createTodo, getTodos, updateTodo, deleteTodo, todoIsDone } = require("../controller/todosController");

todosRouter.post("/createTodo", validateToken, createTodo);
todosRouter.get("/getTodos", validateToken, getTodos);
todosRouter.post("/deleteTodo", validateToken, deleteTodo);
todosRouter.post("/updateTodo", validateToken, updateTodo);
todosRouter.post("/todoIsDone", validateToken, todoIsDone);

module.exports = todosRouter;
