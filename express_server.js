import express from "express";
import fs from "fs";
import fsp from "fs/promises";
import todosRouter from "./routes/router_node.js"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", todosRouter);
app.use("/todos", todosRouter);

app.post("/add", async (req, res) => {
    const { todo } = req.body;
    if(!todo) res.status(400).json({ message: "Todo is required" });
  await fsp.appendFile("./todo.txt", todo);
  res.status(201).json({ message: "Todo added", todo });
});
app.get("/todos/:id", (req, res) => {
    const { id } = req.params
    const numberId = Number(id)
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
   
})
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
