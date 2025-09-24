import { log } from "console";
import fs from "fs/promises";
import os from "os";

const text = "./text.txt";

export const moduleFs = async () => {
  // const dataText = await fs.readFile(text, 'utf-8');
  // await fs.writeFile("./copy/copy.txt", dataText.slice(0, 10));
  const nameHost = os.hostname().toUpperCase().slice(0, 17);
  const arc = os.arch();
  const plat = os.platform();
    const data = new Date();
    const month = data.getMonth() + 1;
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  await fs.writeFile(
    "./copy/copy.txt",
    `${nameHost} ${"\n"} ${arc} - ${plat} ${"\n"} ${
      os.cpus().length
    } ${"\n"} Day: ${daysOfWeek[data.getDay()]} ${"\n"} Month: ${month} ${"\n"} Year: ${data.getFullYear()} ${"\n"} Time: ${data.getHours()}:${data.getMinutes()}`
  );
};
