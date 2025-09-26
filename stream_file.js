import { log } from "console";
import fs from "fs";

const readFileStr = fs.createReadStream("./todo.txt", "utf-8");
const writeFileStr = fs.createWriteStream("./copy_todo.txt");
export const chunk = () => {
  readFileStr.on("data", (todos) => {
     log(todos)
  });
  readFileStr.on("end", () => {
    writeFileStr.write("Add new todo");
    writeFileStr.end();
    writeFileStr.on("finish", () => {
      console.log("New todo created ✅");
    });
  });
  readFileStr.on("error", (err) => {
    log("❌ Error:", err.message);
  });
   readFileStr.pipe(writeFileStr, {end: false});
    
};
