import { log } from "console";
import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Todo API 🚀" });
});
app.get("todos", (req, res) => {
  const todoWithStream = fs.createReadStream("./todo.txt");
  todoWithStream.pipe(res);
});

