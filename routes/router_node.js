import express from "express";
import { validate, validateTodo } from "../middleware/validate.js";
import Todo from "./../models/Todo.js";

const router = express.Router();

router.get("/", validate, (req, res) => {
  res.status(200).json({ message: `Welcome to Todo API` });
});
router.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  if (todos.length === 0) {
    return res.status(404).json({ message: "No todos found" });
  }
  res.status(200).json({ data: todos });
});
router.post("/add", validateTodo, async (req, res) => {
  const { text } = req.body;
  await Todo.create({ text: text });
  res.status(201).json({ message: "Todo added", text });
});
router.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ message: "Todo found", todo });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

export default router;
