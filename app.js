import { add } from "./math.js";
import fs from "fs/promises";

add(2, 2);

await fs.writeFile("text.txt", "Fs worked");
const data = await fs.readFile("text.txt", "utf-8");
console.log(data);

import os from "os";

console.log("Платформа:", os.platform());
console.log("Архитектура:", os.arch());
console.log("Кол-во CPU:", os.cpus().length);
console.log("Свободная память (MB):", os.freemem() / 1024 / 1024);
