import express from "express";
import fs from "fs";
import fsp from "fs/promises";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Todo API 🚀" });
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

export default router;
