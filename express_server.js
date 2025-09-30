import express from "express";
import fs from "fs";
import fsp from "fs/promises";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Todo API 🚀" });
});
app.get("/todos", (req, res) => {
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

app.post("/add", async (req, res) => {
    const { todo } = req.body;
    if(!todo) res.status(400).json({ message: "Todo is required" });
  await fsp.appendFile("./todo.txt", todo);
  res.status(201).json({ message: "Todo added", todo });
});
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
