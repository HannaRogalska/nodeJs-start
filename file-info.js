import path from "path";
import fs from "fs/promises"
import { log } from "console";

const text = './text.txt'

export const info = async() => {
        const data = (await fs.readFile('text.txt', "utf-8")).slice(0, 100)
    console.log("Text 100:", data);

    const showPath = path.resolve(text);
    log("PATH", showPath);
    const file = await fs.stat(text);
    console.log("Size", file.size);
    const txt = path.extname(text);
    console.log("TXT", txt);
    
    
}