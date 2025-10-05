import express from "express";
import todosRouter from "./routes/router_node.js"
import {connectDB} from "./db/db.js"

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/", todosRouter);

app.listen(PORT, () => {
  connectDB()
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
