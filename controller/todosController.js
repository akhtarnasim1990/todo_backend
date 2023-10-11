const Todos = require("../models/todos");
const User = require("../models/user");

const userValidation = async (id, token) => {
  const user = await User.findOne({ _id: id });
  if (user.tokens.includes(token)) {
    return true;
  } else {
    return false;
  }
};

module.exports.createTodo = async (req, res) => {
  try {
    const validation = await userValidation(req.user.id, req.headers["x-access-token"]);
    if (!validation) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const { todo } = req.body;

    if (todo === "" || !todo) {
      throw new Error("Invalid Todo");
    }
    const newTodo = new Todos({
      userID: req.user.id,
      todo,
    });
    newTodo
      .save()
      .then((result) => {
        if (result) {
          res.status(200).json({ message: "Todo created successfully", data: newTodo, success: true });
        } else {
          throw new Error("Server error");
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message, success: false });
  }
};

module.exports.getTodos = async (req, res) => {
  try {
    const validation = await userValidation(req.user.id, req.headers["x-access-token"]);
    if (!validation) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const todos = await Todos.find({ userID: req.user.id });
    res.status(200).json({ message: "Todos fetched successfully", data: todos, success: true });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message, success: false });
  }
};

module.exports.updateTodo = async (req, res) => {
  try {
    const validation = await userValidation(req.user.id, req.headers["x-access-token"]);
    if (!validation) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const { todo_id, todo } = req.body;
    if (!todo_id) {
      throw new Error("Invalid todo ID");
    }
    if (todo === "" || !todo) {
      throw new Error("Invalid Todo");
    }
    Todos.findByIdAndUpdate({ _id: todo_id }, { todo })
      .then((result) => {
        if (result) {
          res.status(200).json({ message: "Todo updated successfully", success: true });
        } else {
          throw new Error("Server error");
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message, success: false });
  }
};

module.exports.deleteTodo = async (req, res) => {
  try {
    const validation = await userValidation(req.user.id, req.headers["x-access-token"]);
    if (!validation) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const { todo_id } = req.body;
    if (!todo_id) {
      throw new Error("Invalid todo ID");
    }

    Todos.findByIdAndDelete({ _id: todo_id })
      .then((result) => {
        if (result) {
          res.status(200).json({ message: "Todo deleted successfully", success: true });
        } else {
          throw new Error("Server error");
        }
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message, success: false });
  }
};

module.exports.todoIsDone = async (req, res) => {
  try {
    const validation = await userValidation(req.user.id, req.headers["x-access-token"]);
    if (!validation) {
      let error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const { todo_id, isDone } = req.body;
    if (!todo_id) {
      throw new Error("Invalid todo ID");
    }
    if (isDone === undefined || isDone === null) {
      throw new Error("Invalid Todo");
    }
    Todos.findByIdAndUpdate({ _id: todo_id }, { isDone })
      .then((result) => {
        if (result) {
          res.status(200).json({ message: `Todo mark as ${isDone ? "done" : "undone"}.`, success: true });
        } else {
          throw new Error("Server error");
        }
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(error.status || 400).json({ message: error.message, success: false });
  }
};
