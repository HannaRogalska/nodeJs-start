import { log } from "console";
import EventEmitter from "events";
import fs from "fs/promises";
const todoTxt = "./todo.txt";

const emitter = new EventEmitter();
emitter.on("checkTodo", (value) => {
  log(`Added your task: ${value}`);
}); 

export const todo = async () => {
  const task = process.argv[2];
  if (!task) {
    log("Please add task");
    process.exit(1);
  }
    try {
        await fs.access(todoTxt);
        await fs.appendFile(todoTxt, `\n${task}`);
    } catch (err) {
        if (err.code === "ENOENT") {
            await fs.writeFile(todoTxt, task);
        }
    }
 
  emitter.emit("checkTodo", task);
  const showAllTask = await fs.readFile("todo.txt", "utf-8");
  log(`Your currently task: \n${showAllTask}`);
};
