import http from "http";
import { URL } from "url";
import fs from "fs";
import fsp from "fs/promises";

const server = http.createServer((req, res) => {
  const url = new URL(`http://localhost:3000${req.url}`);

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ message: "Welcome to Todo API 🚀" }));
  } else if (req.method === "GET" && url.pathname === "/todos") {
    const readFileWithStream = fs.createReadStream("./todo.txt", "utf-8");
    let value = "";
    readFileWithStream.on("data", (chunk) => {
      value += chunk;
    });
    readFileWithStream.on("end", () => {
      res.writeHead(200, {
        "content-type": "application/json; charset=utf-8",
      });
      const todos = value.split("\n");

      res.end(JSON.stringify({ data: todos }));
    });
    readFileWithStream.on("error", (err) => {
      if (err.code === "ENOENT")
        res.end(JSON.stringify({ message: "No todos yet!" }));
      else res.end(JSON.stringify({ message: "Server error" }));
    });
  } else if (req.method === "POST" && url.pathname === "/add") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", async () => {
      try {
        const todo = JSON.parse(body);

        if (!todo.data) {
          res.writeHead(400, {
            "content-type": "application/json; charset=utf-8",
          });
          return res.end(JSON.stringify({ message: "Todo is required" }));
        }
        await fsp.appendFile("./todo.txt", `\n${todo.data}`);

        res.writeHead(201, {
          "content-type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify({ message: "Todo added", todo: todo.data }));
      } catch (err) {
        res.writeHead(400, {
          "content-type": "application/json; charset=utf-8",
        });
        res.end(JSON.stringify({ message: "Invalid JSON" }));
      }
    });
  }
});

server.listen(3000, () => {
  console.log("Server is working on http://localhost:3000");
});
