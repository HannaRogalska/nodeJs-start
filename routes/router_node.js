import express from "express";
import fs from "fs";
import fsp from "fs/promises";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.get("/", validate, (req, res) => {
  res.status(200).json({ message: `Welcome to Todo API` });
});
router.get("/todos", (req, res) => {
    let allTodosFromTxt = ""
    
    const todoWithStream = fs.createReadStream("./todo.txt");
    todoWithStream.on("data", (chunk) => {
        allTodosFromTxt += chunk
    })
    todoWithStream.on("end", () => {
        const todosIn = allTodosFromTxt.split('\n')
        res.status(200).json({ "data": todosIn})
    })
  todoWithStream.on("error", (err) => {
    res.status(500).json({ message: "No todos yet!" });
    console.log(err);
  });
});
router.post("/add", async (req, res) => {
  const { data } = req.body;
  if (!data) return res.status(400).json({ message: "Todo is required" });
  await fsp.appendFile("./todo.txt", data + "\n");
  res.status(201).json({ message: "Todo added", data });
});
router.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);
  let allTodosFromTxt = "";

  const todoWithStream = fs.createReadStream("./todo.txt");
  todoWithStream.on("data", (chunk) => {
    allTodosFromTxt += chunk;
  });
  todoWithStream.on("error", (err) => {
    res.status(500).json({ message: "No todos yet!" });
    console.log(err);
  });
  todoWithStream.on("end", () => {
    const todosIn = allTodosFromTxt.split("\n");
    if (todosIn[numberId] !== undefined) {
      res.status(200).json({ data: todosIn[numberId] });
    }
  });
});

export default router;
