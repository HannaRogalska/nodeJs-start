import http from "http";
import fs from "fs/promises";
import { URL } from "url";

const server = http.createServer(async (req, res) => {
    const urlWith = new URL(`http://localhost:3000${req.url}`);
    const path = urlWith.pathname;
  switch (path) {
    case "/":
      res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
      res.end("Hello my friend");
      break;
    case "/todos":
      try {
        const todos = await fs.readFile("todo.txt", "utf-8");
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(todos);
      } catch (err) {
        if (err.code === "ENOENT") {
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("No todos yet!");
        } else {
          res.writeHead(500);
          res.end("Server error");
        }
      }
      break;
    case "/add":
      const getTodo = urlWith.searchParams.get("todo");
      await fs.appendFile("./todo.txt",`\n${getTodo}`);
      const allTodos = await fs.readFile("./todo.txt", "utf-8");
      res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
      res.end(allTodos);
      break;

    default:
      break;
  }
});
server.listen(3000, () => {
  console.log("Server is working on http://localhost:3000");
});
