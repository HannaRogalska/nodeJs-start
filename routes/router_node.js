import express from "express";
import fs from "fs";
import fsp from "fs/promises";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Todo API 🚀" });
});
router.get("/todos", (req, res) => {
    let allTodosFromTxt = ""
    
    const todoWithStream = fs.createReadStream("../todo.txt");
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
  await fsp.appendFile("../todo.txt", data);
  res.status(201).json({ message: "Todo added", data });
});

export default router;
