import http from "http";
import fsp from "fs/promises";
import fs from "fs";
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
        const todos = fs.createReadStream("todo.txt", "utf-8");
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        todos.on("error", (err) => {
          if (err.code === "ENOENT") res.end("No todos yet!");
          else res.end("Server error");
        })
        todos.pipe(res);
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
      await fsp.appendFile("./todo.txt", `\n${getTodo}`);
      const allTodos = fs.createReadStream("./todo.txt", "utf-8");
      res.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
      allTodos.pipe(res)
      break;

    default:
      break;
  }
});
server.listen(3000, () => {
  console.log("Server is working on http://localhost:3000");
});
