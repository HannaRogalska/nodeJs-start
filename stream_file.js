import { log } from "console"
import fs from "fs"


 const readFileStr = fs.createReadStream("./todo.txt", "utf-8");
export const chunk = () => {
    readFileStr.on("data", (todos) => {
        log(todos.length)
    })
     readFileStr.on("end", () => {
       log("✅ Finished reading file");
     });
    readFileStr.on("error", (err) => {
      log("❌ Error:", err.message);
    });
}