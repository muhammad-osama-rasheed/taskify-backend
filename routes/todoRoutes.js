const express = require("express");
const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
} = require("../controllers/todosController");
const router = express.Router();

router.post("/", createTodo);

router.get("/", getTodos);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
