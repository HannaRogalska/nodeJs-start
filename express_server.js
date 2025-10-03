import express from "express";
import todosRouter from "./routes/router_node.js"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", todosRouter);
app.use("/todos", todosRouter);

app.use("/add", todosRouter);
app.use("/todos/:id", todosRouter);
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
